'use strict'

class StudentSessionController {
  async store ({ request, response, auth }) {
    const { identify_number, password } = request.all()

    console.log(identify_number, password)
    const token = await auth.authenticator('student').attempt(identify_number, password)

    return response.ok({
      message: "Login realizado com sucesso",
      token,
      logged: true
    })
  }
}

module.exports = StudentSessionController
