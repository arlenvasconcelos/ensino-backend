'use strict'

const Student = use('App/Models/Student')

class FindStudent {

  async handle ({ response, params: {id} }, next) {
    const student = await Student.find(id)

    if (!student){
      return response.notFound({
        message: 'Aluno não encontrado.',
        id
      })
    }
    await next()
  }
}

module.exports = FindStudent
