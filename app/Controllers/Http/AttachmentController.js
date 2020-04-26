'use strict'

const Attachment = use('App/Models/Attachment')
const Document = use('App/Models/Document')
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with attachments
 */
class AttachmentController {
  /**
   * Show a list of all attachments.
   * GET attachments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

  }


  /**
   * Create/save a new Attachment.
   * POST attachments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request, response }) {
    const document = await Document.findOrFail(params.id)

    const attachments = request.file('attachment', {
      types: ['image', 'pdf'],
      size: '2mb'
    })

    // await attachments.moveAll(Helpers.tmpPath('uploads'), file => ({
    //   name: `${Date.now()}- document${file.clientName}`
    // }))

    //Apenas se for mais de uma imagem, tem que ver a solução para apenas uma
    await attachments.moveAll(Helpers.tmpPath('uploads'), (file) => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if (!attachments.movedAll()) {
      return attachments.errors()
    }

    await Promise.all(
      attachments
        .movedList()
        .map(attachment => document.attachments().create({ path: attachment.fileName }))
    )
  }

  /**
   * Display a single Attachment.
   * GET attachments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    //Fazer condição caso não tenha estudantes cadastrados
  }

  /**
   * Update attachment details.
   * PUT or PATCH attachments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // async update ({ params, request, response }) {
  //   const data = request.only(["name", "type"])
  //   const attachment = await Attachment.find(params.id)

  //   Attachment.merge(data)
  //   await Attachment.save()

  //   return attachment
  // }

}

module.exports = AttachmentController
