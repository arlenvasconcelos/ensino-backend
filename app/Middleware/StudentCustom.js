'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Student = use('App/Models/Student')
class StudentCustom {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response }, next) {
    // call next to advance the request

    if (auth.user instanceof Student){
      await next();
    }
    else {
      return response.forbidden({
        message: "Usuário não é aluno."
      })
    }
  }
}

module.exports = StudentCustom
