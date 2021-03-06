'use strict'

const Document = use('App/Models/Document')

class FindDocument {

  async handle ({response, params: {id} }, next) {
    // call next to advance the request
    const document = await Document.find(id)
    if (!document){
      return response.notFound({
        message: "Documento não encontrado.",
        id
      })
    }
    await next()
  }
}

module.exports = FindDocument
