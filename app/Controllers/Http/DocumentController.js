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
   * Create/save a new document.
   * POST documents
   *
   */
  // async store ({ request, response }) {
  //   const data = await request.only(['name','type','solicitation_id','created_by'])
  //   const {questions} = await request.only(['questions']);
  //   //Verifying if there are questions on Document
  //   if (questions.length){
  //     const document = await Document.create({...data, status: STATUS.CREATED})
  //     document.questions().createMany(questions)
  //     return response.ok(document)
  //   }

  //   return response.badRequest({message: "O documento não foi preenchido"})
  // }

  /**
   * Display a single document.
   * GET documents/:id
   *
   */
  async show ({ params, request, response, view }) {
    const document = await Document.findOrFail(params.id)

    // await document.load('solicitation')
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

    if (document.status === STATUS.CREATED){
      const {name, questions} = await request.all()
      document.merge({name: name})
      await document.save()

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
              console.log('okokoko')
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
      return response.ok(document)
    }

    return response.forbidden({message: "O documento já foi enviado e não pode ser excluído"})
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
