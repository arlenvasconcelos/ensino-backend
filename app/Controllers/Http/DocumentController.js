'use strict'

const STATUS = {
  'CREATED': 'created',
  'SEND': 'send',
}

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Document = use('App/Models/Document')
const Solicitation = use('App/Models/Solicitation')
const Question = use('App/Models/Question')

/**
 * Resourceful controller for interacting with documents
 */
class DocumentController {
  /**
   * Show a list of all documents.
   * GET documents
   *
   */
  async index ({ request, response, view }) {
    const documents = await Document.all();
    return documents;
  }



  /**
   * Display a single document.
   * GET documents/:id
   *
   */
  async show ({ params, request, response, view }) {
    const document = await Document.findOrFail(params.id)
    await document.load('attachments')
    await document.load('questions')

    return document
  }


  /**
   * Update document details.
   * PUT or PATCH documents/:id
   *
   */
  async update ({ params, request, response }) {

    const document = await Document.findOrFail(params.id)
    const {name, questions} = await request.all()

    if (document.status === STATUS.CREATED){
      //Updating questions
      await Promise.all(
        questions.map(qstns => {
          if (!qstns.id) {
            return document.questions().create(qstns)
          }
          return Question.query()
            .where(function () {
              this
                .where('id', qstns.id)
                .andWhere('document_id', params.id)
            })
            .first()
            .then(existingQuestion => {
              delete qstns.id
              if (existingQuestion) {
                existingQuestion.merge(qstns)
                return existingQuestion.save()
              } else {
                return document.questions().create(qstns)
              }
            })
        })
      )
      // Updating document
      document.merge({name: name})
      await document.save()

      return response.ok(document)
    }

    return response.forbidden({message: "O documento já foi enviado e não pode ser atualizado"})
  }

  /**
   * Delete a document with id.
   * DELETE documents/:id
   *
   */
  async destroy ({ params, request, response }) {
    const document = await Document.findOrFail(params.id)

    if (document.status === STATUS.CREATED){
      await document.delete();
      return response.ok(document)
    }

    return response.forbidden({message: "O documento já foi enviado e não pode ser excluído"})
  }
}

module.exports = DocumentController
