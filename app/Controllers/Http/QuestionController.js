'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Question = use('App/Models/Question')
const Document = use('App/Models/Document')

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   */
  async index ({ request, response, view }) {
    const questions = await Question.all();
    return questions
  }


  /**
   * Create/save a new question.
   * POST questions
   *
   */
  async store ({ request, response }) {
    const data = await request.only(['document_id','label','answer'])
    const question = await Question.create(data)

    return question
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   */
  async show ({ params, request, response, view }) {
    const question = await Question.query().where('id', '=', params.id).with('document').fetch()
    return question;
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   */
  async update ({ params, request, response }) {
    const data = await request.only(['label','answer'])
    // const document = Document.find(data.document_id)
    // if (document.status === 'Editing')
    const question = await Question.find(params.id)

    question.merge(data)
    await question.save()

    return question
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   */
  async destroy ({ params, request, response }) {
    const question = await Question.find(params.id)
    await question.delete()

    return question
  }
}

module.exports = QuestionController
