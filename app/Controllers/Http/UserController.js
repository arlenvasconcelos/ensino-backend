'use strict'

const User = use("App/Models/User")
const Unit = use("App/Models/Unit")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class UserController {

  async index ({response}) {

    const users = await User.all()
    return response.ok({
      message: "Usuários encontrados com sucesso.",
      data: users
    })
  }

  async show ({params, response}) {

    const user = await User.query().where('id', '=', params.id).with('unit').fetch()

    return response.ok({
      message: "Usuário encontrado com sucesso.",
      data: user
    })
  }

  async store ({ request, response}) {
    const data = request.only(["name", "identify_number", "phone", "email", "password", "unit_id"])

    const user = await User.create({...data, type: "user",})

    return response.created({
      message: "Usuário criado com sucesso.",
      data: user
    })
  }

  async update ({ params, response, request}) {

    const user = await User.findOrFail(params.id)
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

    user.merge(data)
    await user.save();

    return response.ok({
      message: "Usuário atualizado com sucesso.",
      data: user
    })
  }

  async destroy ({ params, response }) {

    const user = await User.findBy('id', params.id)

    await user.delete();

    return response.ok({
      message: "Usuário excluído com sucesso.",
      deleted: true
    })
  }
}

module.exports = UserController
