'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class StudentCustom {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response }, next) {
    // call next to advance the request
    if (auth.student){
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
