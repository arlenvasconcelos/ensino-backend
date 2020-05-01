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

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Solicitation = use('App/Models/Solicitation')
const Unit = use('App/Models/Unit')
/**
 * Resourceful controller for interacting with solicitations
 */
class SolicitationController {
  /**
   * Show a list of all solicitations.
   * GET solicitations
   *
   */
  async index ({ response }) {
    const solicitations = await Solicitation.all()

    return response.ok({
      message: "Todas as solicitações",
      data: solicitations
    })
  }


  /**
   * Create/save a new solicitation.
   * POST solicitations
   *
   */
  async store ({ request, response, auth }) {
    const data = request.only(['type', 'created_by'])
    console.log(auth.user.id)
    const solicitation = await Solicitation.create({...data, student_id: auth.user.id , status: STATUS_SOLICITATION.CREATED})

    return response.created({
      message: "Solicitação criada com sucesso.",
      data: solicitation
    })
  }

  /**
   * Display a single solicitation.
   * GET solicitations/:id
   *
   */
  async show ({ params, response }) {

      const solicitation = await Solicitation
        .query()
        .where('id', '=', params.id)
        .with('student')
        .with('documents')
        .fetch()
      return response.ok({
        message: "Solicitação encontrada com sucesso",
        data: solicitation
      })

  }

  // /**
  //  * Update solicitation details.
  //  * PUT or PATCH solicitations/:id
  //  *
  //  */
  // async update ({ params, request, response }) {
  //   const data = request.only(['type'])
  //   const solicitation = await Solicitation.findOrFail(params.id)

  //   if (solicitation.status === STATUS_SOLICITATION.CREATED){
  //     solicitation.merge(data)
  //     await solicitation.save()
  //     return response.ok({
  //       message: "Solicitação atualizada com sucesso",
  //       data: solicitation
  //     })
  //   }

  //   return response.badRequest({message: "Solicitação não pode ser editada"})
  // }

  /**
   * Delete a solicitation with id.
   * DELETE solicitations/:id
   *
   */
  async destroy ({ params, response }) {
    const solicitation = await Solicitation.findOrFail(params.id)
    if (solicitation.status === STATUS_SOLICITATION.CREATED){
      await solicitation.delete()
      return response.ok({
        message: 'Solicitação excluída com sucesso',
        deleted: true
      })
    }
    return response.badRequest({message: "Solicitação não pode ser excluída"})
  }

  async addDocument({params, request, response}){
    const solicitation = await Solicitation.findOrFail(params.id)
    const data = await request.only(['name','type','created_by'])//Pegar posteriormente o created_by pelo auth
    const {questions} = await request.only(['questions']);
    //Verifying if there are questions on Document
    if (questions.length){
      const document = await solicitation.documents().create({...data, status: STATUS_DOC.CREATED})
      document.questions().createMany(questions)
      return response.created({
        message: "Documento criado com sucesso",
        data: document
      })
    }

    return response.badRequest({message: "Documento não foi preenchido"})
  }


  async send ({params, request, response}){
    const solicitation = await Solicitation.findOrFail(params.id)
    const unit = await Unit.findOrFail(params.unit_id)

    const countDocs = await solicitation.documents().getCount()

    if (countDocs > 0){
      await solicitation.documents()
        .where('solicitation_id', params.id)
        .update({ status: STATUS_DOC.SENT })
    }
    else {
      return response.badRequest({message: "Solicitação não possui documentos"})
    }

    await solicitation.units().attach(params.unit_id);

    solicitation.merge({status: STATUS_SOLICITATION.SENT})
    await solicitation.save()

    solicitation.load('units')

    return response.ok({
      message: 'Solicitação enviada com sucesso',
      data: solicitation
    })
  }
}

module.exports = SolicitationController
