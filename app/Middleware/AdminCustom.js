'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class AdminCustom {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, response }, next) {
    // call next to advance the request
    if (auth.user.type === 'admin'){
      await next();
    }
    else {
      response.forbidden({
        message: "Usuário não é admin."
      })
    }
    await next()
  }
}

module.exports = AdminCustom
