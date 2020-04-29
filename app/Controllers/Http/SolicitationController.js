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
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const solicitations = await Solicitation.all()

    return solicitations
  }


  /**
   * Create/save a new solicitation.
   * POST solicitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['type', 'student_id', 'created_by'])
    const solicitation = await Solicitation.create({...data, status: STATUS_SOLICITATION.CREATED})

    return solicitation
  }

  /**
   * Display a single solicitation.
   * GET solicitations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

      const solicitation = await Solicitation
        .query()
        .where('id', '=', params.id)
        .with('student')
        .with('documents')
        .fetch()
      return solicitation

  }

  /**
   * Update solicitation details.
   * PUT or PATCH solicitations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['type'])
    const solicitation = await Solicitation.findOrFail(params.id)

    if (solicitation.status === STATUS_SOLICITATION.CREATED){
      solicitation.merge(data)
      await solicitation.save()
      return response.ok(solicitation)
    }

    return response.badRequest({message: "Solicitação não pode ser editada"})
  }

  /**
   * Delete a solicitation with id.
   * DELETE solicitations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const solicitation = await Solicitation.findOrFail(params.id)
    if (solicitation.status === STATUS_SOLICITATION.CREATED){
      await solicitation.delete()
      return response.ok()
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
      return response.ok(document)
    }

    return response.badRequest({message: "Documento não foi preenchido"})
  }


  async send ({params, request, response}){
    const solicitation = await Solicitation.findOrFail(params.solicitation_id)
    const unit = await Unit.findOrFail(params.unit_id)

    const countDocs = await solicitation.documents().getCount()

    if (countDocs > 0){
      await solicitation.documents()
        .where('solicitation_id', params.solicitation_id)
        .update({ status: STATUS_DOC.SENT })
    }
    else {
      return response.badRequest({message: "Solicitação não possui documentos"})
    }

    await solicitation.units().attach(params.unit_id);

    solicitation.merge({status: STATUS_SOLICITATION.SENT})
    await solicitation.save()

    solicitation.units = await solicitation.units().fetch()

    return response.ok()
  }
}

module.exports = SolicitationController
