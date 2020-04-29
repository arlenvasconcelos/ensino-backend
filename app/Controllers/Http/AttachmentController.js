'use strict'

const Attachment = use('App/Models/Attachment')
const Document = use('App/Models/Document')
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with attachments
 */
class AttachmentController {

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async store ({ params, request, response }) {

    const document = await Document.findOrFail(params.id)


    const attachments = request.file('attachments', {
      types: ['image', 'pdf'],
      size: '2mb'
    })

    await attachments.moveAll(Helpers.tmpPath('uploads'), (file, i) => {
      return {
        name: `${Date.now()}-doc${document.id}_${i}.${file.extname}`
      }
    })

    if (!attachments.movedAll()) {
      return attachments.errors()
    }

    await Promise.all(
      attachments
        .movedList()
        .map(attachment =>
          document.attachments().create({ path: attachment.fileName }))
    )
  }

}

module.exports = AttachmentController
