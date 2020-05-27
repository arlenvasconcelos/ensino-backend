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
/**
 * Resourceful controller for interacting with solicitations
 */
class SolicitationController {
  /**
   * Show a list of all solicitations.
   * GET solicitations
   *
   */
  async index ({ response, auth }) {

    if (auth.user.type === 'Admin' || auth.user.type === 'Servidor'){
      const solicitations = await Solicitation.all();
      return response.ok({
        message: "Todas as solicitações",
        data: solicitations
      });
    }
    else if (auth.user.type === 'Aluno'){
      const solicitations = await Solicitation
        .query()
        .where('interested_id', auth.user.id)
        .orWhere('created_by_id', auth.user.id)
        .fetch()
      return response.ok({
        message: `As solicitações do aluno ${auth.user.id}`,
        data: solicitations
      })
    }

    return response.badRequest({
      message: "Tipo de usuário não reconhecido",
    })

  }


  /**
   * Create/save a new solicitation.
   * POST solicitations
   *
   */
  async store ({ request, response, auth }) {
    const { type, interested_id, name } = request.all(['type', 'interested_id', 'name'])

    //Student_id will use only, if solicitation have created by user
    const solicitation = await Solicitation
      .create({
        type,
        name,
        interested_id: interested_id ? interested_id : auth.user.id,
        status: STATUS_SOLICITATION.CREATED,
        created_by_id: auth.user.id
      })

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
  async show ({ params, response, auth}) {

    const solicitation = await Solicitation
      .query()
      .where('id', '=', params.id)
      .with('interested')
      .with('units')
      .with('created_by')
      .with('documents')
      .first()

    if (auth.user.type === 'Admin' || auth.user.type === 'Servidor'){
      return response.ok({
        message: "Solicitação encontrada com sucesso",
        data: solicitation
      })
    }
    if (auth.user.type === 'Aluno'){
      if (auth.user.id === solicitation['interested_id'] || auth.user.id === solicitation['created_by_id']){
        return response.ok({
          message: "Solicitação encontrada com sucesso",
          data: solicitation
        })
      }
      else {
        return response.forbidden({
          message: "Usuário não tem permissão.",
        })
      }
    }

    return response.badRequest({
      message: "Tipo de usuário não reconhecido",
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
   * A solicitation can be deleted if status is 'created'.
   */
  async destroy ({ params, response, auth }) {
    const solicitation = await Solicitation.findOrFail(params.id)
    if (solicitation.status === STATUS_SOLICITATION.CREATED){
      if (auth.user.id === solicitation.created_by_id){
        await solicitation.delete()
        return response.ok({
          message: 'Solicitação excluída com sucesso',
          deleted: true
        })
      }
      else {
        return response.forbidden({
          message: "Usuário não tem perimissão para excluir a solicitação",
        })
      }
    }
    return response.badRequest({message: "Solicitação não pode ser excluída"})
  }

  async addDocument({params, request, response, auth}){

    const solicitation = await Solicitation.findOrFail(params.id)
    const data = await request.only(['name','type'])
    if (auth.user.type === 'Aluno' && solicitation.status === STATUS_SOLICITATION.SENT){
      return response.forbidden({
        message: "O Aluno não tem permissão para adicionar documentos nessa solicitação."
      })
    }
    else if(auth.user.type === 'Servidor'){

      //get acitve solicitation_unit
      let unitActive = await solicitation.units()
        .wherePivot('status', STATUS_SOLICITATION_UNIT.ACTIVE)
        .first()

      if (unitActive && auth.user.unit_id !== unitActive.id){
        return response.forbidden({
          message: "A solicitação não se encontra na unidade do usuário."
        });
      }
    }
    const {questions} = await request.only(['questions']);
    //Verifying if there are questions on Document
    if (questions.length){
      const document = await solicitation
        .documents()
        .create({
          ...data,
          status: STATUS_DOC.CREATED,
          user_id: auth.user.id
        })
      document.questions().createMany(questions)
      return response.created({
        message: "Documento criado com sucesso",
        data: document
      })
    }

    return response.badRequest({message: "Documento não foi preenchido"})
  }
}

module.exports = SolicitationController
