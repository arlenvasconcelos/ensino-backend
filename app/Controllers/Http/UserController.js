'use strict'

const User = use("App/Models/User")

class UserController {

  async index () {

    const users = await User.all();

    return users
  }

  async show ({params}) {

    const user = await User.findBy('id', params.id);
    return user
  }

  async store ({ request }) {
    const data = request.only(["name", "identify_number", "type", "phone", "email", "password"])

    const user = await User.create(data)

    return user
  }

  async update ({ params }) {

    const user = await User.findBy('id', params.id)
    //dont get password
    const data = request.only(["name", "identify_number", "type", "phone", "email"])

    user.merge(data)

    await user.save();

    return user
  }

  async destroy ({ params }) {

    const user = await User.findBy('id', params.id)

    await user.delete();

    return user
  }
}

module.exports = UserController
