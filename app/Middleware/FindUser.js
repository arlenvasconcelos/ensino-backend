'use strict'

const User = use('App/Models/User')

class FindUser {

  async handle ({response, params: {id} }, next) {
    // call next to advance the request
    const user = await User.find(id)
    if (!user){
      return response.notFound({
        message: "User not found.",
        id
      })
    }
    await next()
  }
}

module.exports = FindUser
