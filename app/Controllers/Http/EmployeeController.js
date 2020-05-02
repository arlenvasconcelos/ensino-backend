'use strict'

const Employee = use("App/Models/Employee")
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

    const Employee = await Employee.query().where('id', '=', params.id).with('unit').fetch()

    return response.ok({
      message: "Usuário encontrado com sucesso.",
      data: Employee
    })
  }

  async store ({ request, response}) {
    const data = request.only(["name", "identify_number", "phone", "email", "password", "unit_id"])

    const Employee = await Employee.create({...data, type: "Employee",})

    return response.created({
      message: "Usuário criado com sucesso.",
      data: Employee
    })
  }

  async update ({ params, response, request}) {

    const Employee = await Employee.findOrFail(params.id)
    //dont get password
    const data = request.only(["name", "identify_number", "phone", "email", "unit_id"])

    if (data.unit_id){
      const unit = await Unit.find(data.unit_id)
      if (!unit){
        return response.notFound({
          message: "Unidade não encontrada",
          id: data.unit_id
        })
      }
    }

    Employee.merge(data)
    await Employee.save();

    return response.ok({
      message: "Usuário atualizado com sucesso.",
      data: Employee
    })
  }

  async destroy ({ params, response }) {

    const Employee = await Employee.findBy('id', params.id)

    await Employee.delete();

    return response.ok({
      message: "Usuário excluído com sucesso.",
      deleted: true
    })
  }
}

module.exports = EmployeeController
