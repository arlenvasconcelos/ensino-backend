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

    return response.ok({...token, user})
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
    try {
      await auth.check()
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
  }

  async refreshToken ({ auth, response, request }) {
    const refreshToken = request.header('refresh_token')
    const token = await auth.generateForRefreshToken(refreshToken, true)
    return response.ok({token:token.token})
  }



}

module.exports = SessionController
