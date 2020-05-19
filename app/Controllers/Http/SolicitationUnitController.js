'use strict'

const STATUS_DOC = {
  'CREATED': 'created',
  'SENT': 'sent',
}

const STATUS_SOLICITATION = {
  'CREATED': 'created',
  'SENT': 'sent',
  'FINISHED': 'finished',
}
const STATUS_SOLICITATION_UNIT = {
  'ACTIVE': 'active',
  'INACTIVE': 'inactive',
}

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const SolicitationUnit = use('App/Models/SolicitationUnit')
const Solicitation = use('App/Models/Solicitation')
const Unit = use('App/Models/Unit')
const Database = use('Database')
/**
 * Resourceful controller for interacting with solicitations
 */
class SolicitationController {

  /**
   * Send solicitation if user is owner and solicitation.status is CREATED
   * or if user.i
   */

  async store ({params, response, auth}){

    const solicitation = await Solicitation.findOrFail(params.id);
    const unitDestination = await Unit.findOrFail(params.unit_id);

    const countUnits = await solicitation.units().getCount()
    let unitActive = {};

    //Verify if is the first solicitation sending or not
    if (countUnits){
      if (auth.user.type === 'Aluno'){
        return response.forbidden({message: "Usuário não tem permissão"})
      }
      else if(auth.user.type === 'Servidor'){

        //get acitve solicitation_unit
        unitActive = await solicitation.units()
          .wherePivot('status', STATUS_SOLICITATION_UNIT.ACTIVE)
          .first()

        if (unitActive && auth.user.unit_id !== unitActive.id){
          return response.forbidden({
            message: "A solicitação não se encontra na unidade do usuário."
          });
        }
        else if(unitActive && unitDestination.id === unitActive.id){
          return response.badRequest({
            message: "A solicitação já se encontra na unidade de destino."
          })
        }
      }
      else {
        return response.forbidden({
          message: "Usuário não é do tipo 'Aluno' ou 'Servidor'."
        });
      }
    }
    //if is the first time the solicitation is been sent
    else {
      if (auth.user.id !== solicitation.created_by_id){
        return response.forbidden({
          message: "A solicitação só pode ser enviada pelo usuário que a criou."
        })
      }
    }

    const countDocs = await solicitation.documents().getCount()

    //Verify if the solicitation has documents
    if (countDocs > 0){
      await solicitation.documents()
        .where('solicitation_id', params.id)
        .andWhere('status', STATUS_DOC.CREATED)
        .update({ status: STATUS_DOC.SENT })
    }
    else {
      return response.badRequest({
        message: "A solicitação não possui documentos."
      })
    }

    //update active solicitation_unit to inactive, if exists
    if (unitActive){
      await Database.table('solicitation_unit')
      .where('solicitation_id', solicitation.id)
      .andWhere('status', STATUS_SOLICITATION_UNIT.ACTIVE)
      .update({'status': STATUS_SOLICITATION_UNIT.INACTIVE})
      //Error on Adonis, it will fix on new release
      // await solicitation
      // .units()
      // .pivotQuery()
      // .where('status', STATUS_SOLICITATION_UNIT.ACTIVE)
      // .update({'status': STATUS_SOLICITATION_UNIT.INACTIVE})
    }

    const solicitationUnit = await SolicitationUnit.create({
      unit_id: unitDestination.id,
      solicitation_id: solicitation.id,
      status: STATUS_SOLICITATION_UNIT.ACTIVE,
      user_id: auth.user.id
    })
    return response.ok({
      message: 'Solicitação enviada com sucesso.',
      data: solicitationUnit
    })
  }
}

module.exports = SolicitationController
