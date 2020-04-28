'use strict'

const STATUS_DOC = {
  'CREATED': 'created',
  'SEND': 'send',
}

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Solicitation = use('App/Models/Solicitation')
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
    const data = request.only(['type', 'student_id', 'status', 'created_by'])
    const solicitation = await Solicitation.create(data)

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

      const solicitation = await Solicitation.query().where('id', '=', params.id).with('student').with('documents').fetch()
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
    const data = request.only(['type', 'student_id', 'status', 'created_by'])
    const solicitation = await Solicitation.find(params.id)

    solicitation.merge(data)
    await solicitation.save()

    return solicitation
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
    await solicitation.delete()

    return solicitation
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

    return response.badRequest({message: "O documento não foi preenchido"})

  }
}

module.exports = SolicitationController
