'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return response.ok({
      message: "Login realizado com sucesso",
      token,
      logged: true
    })
  }
}

module.exports = SessionController
