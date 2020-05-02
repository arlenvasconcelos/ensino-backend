'use strict'

const Employee = use('App/Models/Employee')

class FindEmployee {

  async handle ({response, params: {id} }, next) {
    // call next to advance the request
    const employee = await Employee.find(id)
    if (!employee){
      return response.notFound({
        message: "Servidor não encontrado",
        id
      })
    }
    await next()
  }
}

module.exports = FindEmployee
