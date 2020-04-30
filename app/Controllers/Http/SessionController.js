'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { identify_number, password } = request.all()

    const token = await auth.attempt(identify_number, password)

    return response.ok({
      message: "Login realizado com sucesso",
      token,
      logged: true
    })
  }
}

module.exports = SessionController
