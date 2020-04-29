'use strict'

const Unit = use('App/Models/Unit')

class FindUnit {

  async handle ({response, params: {id} }, next) {
    // call next to advance the request
    const unit = await Unit.find(id)
    if (!unit){
      return response.notFound({
        message: "Unit not found.",
        id
      })
    }
    await next()
  }
}

module.exports = FindUnit
