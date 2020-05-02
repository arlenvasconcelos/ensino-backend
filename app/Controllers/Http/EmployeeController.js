'use strict'

const Employee = use("App/Models/Employee")
const User = use("App/Models/User")
const Unit = use("App/Models/Unit")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class EmployeeController {

  async index ({response}) {

    const employees = await Employee.all()
    return response.ok({
      message: "Servidores cadastrados encontrados com sucesso.",
      data: employees
    })
  }

  async show ({params, response}) {

    const employee = await Employee.findOrFail(params.id)

    employee.unit_id ? await employee.load('unit') : null

    return response.ok({
      message: "Servidor encontrado com sucesso.",
      data: employee
    })
  }

  async store ({ request, response }) {
    const {username, password, ...data} = request.only(["name", "identify_number", "phone", "email", "password", "unit_id", 'username'])

    //Test request body
    const message = await this.verifyData(data, username)
    if (message) return response.badRequest(message)

    const newUser = await User.create({
      username,
      password,
      type: 'Servidor',
      status: 'ativo'
    })

    try{
      const employee = await Employee.create({
        ...data,
        user_id: newUser.id
      })
      return response.created({
        message: "Servidor criado com sucesso.",
        data:employee
      })
    } catch (err) {
      await newUser.delete();
      return err
    }

  }

  async update ({ params, response, request}) {

    const employee = await Employee.findOrFail(params.id)
    const {type, ...data} = request.only(["name", "identify_number", "phone", "email", "unit_id"])

    //Test request body
    const message = await this.verifyData(data)
    if (message) return response.badRequest(message)

    employee.merge(data)
    await employee.save();

    return response.ok({
      message: "Servidor atualizado com sucesso.",
      data: employee
    })
  }

  async destroy ({ params, response }) {

    const employee = await Employee.findBy('id', params.id)
    const user = await User.findOrFail(employee.user_id)

    await employee.delete();
    await user.delete();

    return response.ok({
      message: "Servidor excluído com sucesso.",
      deleted: true
    })
  }

  async verifyData (data, username = null){

    if (data.identify_number
      && await Employee.query().where('identify_number', data.identify_number).first()){

        return  {message: 'Matricula já cadastrada.'}
    }

    if (data.email
      && await Employee.query().where('email', data.email).first()){

        return {message: 'Email já cadastrado.'}
    }

    //Test if unit already exists
    const unit = data.unit_id ? await Unit.find(data.unit_id) : true
    if (!unit) {
      return {message: 'Unidade não existe.'}
    }

    //Test if username already exists
    const user = username ? await User.query().where('username', username).first() : null
    if (user) {
      return {message: 'Username já cadastrado'}
    }

    return null;
  }
}

module.exports = EmployeeController
