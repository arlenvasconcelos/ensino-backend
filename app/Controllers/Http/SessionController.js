'use strict'

const User = use("App/Models/User")

class SessionController {
  async store ({ request, response, auth }) {
    const { username, password } = request.all()

    const user = await User.query().where('username', username).first()

    //if the user loggin in other device, atumatic loggoff others.
    //revoke tokens saved in DB
    await auth
      .authenticator('jwt')
      .revokeTokensForUser(user)

    const token = await auth.withRefreshToken().attempt(username, password)

    response.header('access-token', token.token)
    response.header('type-token', token.type)
    response.header('refresh-token', token.refreshToken)
    return response.ok(user)
  }

  async delete ({ auth, response }) {

    try  {
      await auth
        .authenticator('jwt')
        .revokeTokens()
      return response.ok({message: "Logout realizado com sucesso!"})
    }catch (error){
      return response.badRequest({message: 'Missing or invalid jwt token'})
    }
  }

  async validateToken ({ auth, response }) {
    const user = await User.findOrFail(auth.user.id)

    try {
      await auth.check()
      return response.ok(user)
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

  async refreshToken ({ auth, response, request }) {
    const refreshToken = request.header('refresh-token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    response.header('access-token', token.token)
    response.header('type-token', token.type)
    response.header('refresh-token', token.refreshToken)
    return response.ok()
  }



}

module.exports = SessionController
