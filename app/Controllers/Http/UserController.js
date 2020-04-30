'use strict'

const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
class UserController {

  async index ({response}) {

    const users = await User.all()
    return response.ok({
      message: "Todos os usuários.",
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

  async store ({ request, reponse}) {
    const data = request.only(["name", "identify_number", "type", "phone", "email", "password", "unit_id"])

    const user = await User.create(data)

    return response.created({
      message: "Usuário criado com sucesso.",
      data: user
    })
  }

  async update ({ params, reponse, request}) {

    const user = await User.findBy('id', params.id)
    //dont get password
    const data = request.only(["name", "identify_number", "type", "phone", "email", "unit_id"])

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
      message: "Usuário encontrado com sucesso.",
      deleted: true
    })
  }
}

module.exports = UserController
