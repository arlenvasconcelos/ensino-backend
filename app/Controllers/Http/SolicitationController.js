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
const Student = use('App/Models/Student')
const Employee = use('App/Models/Employee')
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

    if (auth.user.type === 'admin'){
      const solicitations = await Solicitation.all()
      return response.ok({
        message: "Todas as solicitações",
        data: solicitations
      })
    }
    else if (auth.user.type === 'Aluno'){
      console.log(auth.user.id)
      const solicitations = await Solicitation
        .query()
        .where('interested_id', auth.user.id)
        .orWhere('created_by_id', auth.user.id)
        .fetch()
      return response.ok({
        message: `As solicitações do usuário ${auth.user.id}`,
        data: solicitations
      })
    }
    else if (auth.user.type === 'Servidor'){

      return

      console.log(employee.unit_id, employee.name)
      return {ok: 'ok'}
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
    const { type, interested_id } = request.all(['type', 'interested_id'])

    //Student_id will use only, if solicitation have created by user
    const solicitation = await Solicitation
      .create({
        type,
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

  async addDocument({params, request, response, auth}){
    const solicitation = await Solicitation.findOrFail(params.id)
    const data = await request.only(['name','type'])
    const {questions} = await request.only(['questions']);
    //Verifying if there are questions on Document
    if (questions.length){
      const document = await solicitation
        .documents()
        .create({
          ...data,
          status: STATUS_DOC.CREATED,
          created_by: auth.user.identify_number
        })
      document.questions().createMany(questions)
      return response.created({
        message: "Documento criado com sucesso",
        data: document
      })
    }

    return response.badRequest({message: "Documento não foi preenchido"})
  }


  async send ({params, response, auth}){
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

    solicitation.merge({
      status: STATUS_SOLICITATION.SENT,
      created_by: auth.user.identify_number
    })
    await solicitation.save()

    solicitation.load('units')

    return response.ok({
      message: 'Solicitação enviada com sucesso',
      data: solicitation
    })
  }

  // async filterSolicitations(solicitations)

  // }
}

module.exports = SolicitationController
