'use strict'

const Solicitation = use('App/Models/Solicitation')

class FindSolicitation {

  async handle ({ response, params: { id } }, next) {
    const solicitation = await Solicitation.find(id)

    if (!solicitation) {
      return response.notFound({
        message: 'Solicitação não encontrada.',
        id
      })
    }
    await next()
  }
}

module.exports = FindSolicitation
