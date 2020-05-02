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
    const {unit_id, type, ...data} = request.only(["username", "name", "identify_number", "phone", "email", "password", "unit_id", "type"])

    if (type === 'Servidor') {
      const user = await User.create({
        ...data,
        unit_id,
        type,
        status: "ativo"
      })

      return response.created({
        message: "Usuário criado com sucesso.",
        data: user
      })
    }
    else if (type === 'Aluno'){
      const user = await User.create({
        ...data,
        type,
        status: "ativo"
      })

      return response.created({
        message: "Usuário criado com sucesso.",
        data: user
      })
    }
    else if(type === 'Admin'){
      return response.badRequest({
        message: "Não há permissão para criar usuário 'Admin'",
      })
    }

    return response.badRequest({
      message: `Tipo '${type}' não existe`,
    })

  }

  async update ({ params, response, request}) {

    const user = await User.findOrFail(params.id)

    //It will be updated
    const {unit_id, data} = request.only(["name", "identify_number", "phone", "unit_id", "email", 'status'])

    if (unit_id){
      const unit = await Unit.find(unit_id)
      if (!unit){
        return response.notFound({
          message: "Unidade não encontrada",
          id: unit_id
        })
      }
    }

    user.merge({...data, unit_id: user.type === 'Servidor' ? unit_id :  null})
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
