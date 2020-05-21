'use strict'

const Student = use("App/Models/Student")
const User = use("App/Models/User")
const Course = use("App/Models/Course")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class StudentController {

  async index ({response}) {

    const students = await Student.all()
    return response.ok({
      message: "Todos os alunos encontrados com sucesso.",
      data: students
    })
  }

  async show ({params, response}) {

    const student = await Student.findOrFail(params.id)

    student.course_id ? await student.load('course') : null
    student.user_id ? await student.load('user') : null

    return response.ok({
      message: "Aluno encontrado com sucesso.",
      data: student
    })
  }

  async store ({ request, response }) {
    const {username, password, ...data} = request.only(["name", "identify_number", "phone", "email", "password", "course_id", 'username'])

    //Test request body
    const message = await this.verifyData(data, username)
    if (message) return response.badRequest(message)

    const newUser = await User.create({
      username,
      password,
      type: 'Aluno',
      status: 'ativo'
    })

    try{
      const student = await Student.create({
        ...data,
        user_id: newUser.id
      })
      return response.created({
        message: "Aluno criado com sucesso.",
        data:student
      })
    } catch (err) {
      await newUser.delete();
      return err
    }
  }

  async update ({ params, response, request}) {

    const student = await Student.findOrFail(params.id)
    const {type, ...data} = request.only(["name", "identify_number", "phone", "email", "course_id"])

    //Test request body
    const message = await this.verifyData(data)
    if (message) return response.badRequest(message)

    student.merge(data)
    await student.save();

    return response.ok({
      message: "Aluno atualizado com sucesso.",
      data: student
    })
  }

  async destroy ({ params, response }) {

    const student = await Student.findBy('id', params.id)
    const user = await User.findOrFail(student.user_id)

    await student.delete();
    await user.delete();

    return response.ok({
      message: "Aluno excluído com sucesso.",
      deleted: true
    })
  }

  async verifyData (data, username = null){

    if (data.identify_number
      && await Student.query().where('identify_number', data.identify_number).first()){

        return  {message: 'Matricula já cadastrada.'}
    }

    if (data.email
      && await Student.query().where('email', data.email).first()){

        return {message: 'Email já cadastrado.'}
    }

    //Test if course already exists
    const course = data.course_id ? await Course.find(data.course_id) : true
    if (!course) {
      return {message: 'Curso não existe.'}
    }

    //Test if username already exists
    const user = username ? await User.query().where('username', username).first() : null
    if (user) {
      return {message: 'Username já cadastrado'}
    }

    return null;
  }
}

module.exports = StudentController
