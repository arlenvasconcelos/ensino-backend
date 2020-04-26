'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Document = use('App/Models/Document')
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
  async store ({ request, response }) {
    const data = await request.only(['name','type','status','solicitation_id','created_by'])
    const document = await Document.create(data)

    return document;
  }

  /**
   * Display a single document.
   * GET documents/:id
   *
   */
  async show ({ params, request, response, view }) {
    const document = await Document.findOrFail(params.id)

    await document.load('solicitation')
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
    //Some params dont be chenged
    const data = await request.only(['name','status'])
    const document = await Document.find(params.index)

    document.merge(data)
    await document.save()

    return document;
  }

  /**
   * Delete a document with id.
   * DELETE documents/:id
   *
   */
  async destroy ({ params, request, response }) {
    const document = await Document.find(params.index)
    await document.delete();

    return document
  }
}

module.exports = DocumentController
