'use strict'

const Student = use("App/Models/Student")

class StudentController {

  async index ({response}) {

    const students = await Student.all()
    return response.ok({
      message: "Alunos encontrados com sucesso.",
      students
    })
  }

  async show ({params, response}) {

    const student = await Student.query().where('id', '=', params.id).with('course').fetch()

    return response.ok({
      message: "Aluno encontrado com sucesso",
      data: student
    })
  }

  async store ({ request, response }) {
    const data = request.only(["name", "identify_number", "status", "phone", "email", "password", "course_id"])
    const student = await Student.create(data)

    return response.created({
      message: "Aluno criado com sucesso",
      data: student
    })
  }

  async update ({ params, request, response}) {

    const student = await Student.findBy('id', params.id)
    //dont get password
    const data = request.only(["name", "identify_number", "status", "phone", "email", "course_id"])

    student.merge(data)
    await student.save();

    return response.ok({
      message: "Aluno atualizado com sucesso.",
      student
    })
  }

  async destroy ({ params, response }) {

    const student = await Student.findBy('id', params.id)

    await student.delete();

    return response.ok({
      message: "Aluno excluído com sucesso",
      daleted: true
    })
  }
}

module.exports = StudentController
