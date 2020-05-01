'use strict'

class StudentSessionController {
  async store ({ request, response, auth }) {
    const { identify_number, password } = request.all()

    const token = await auth.authenticator('student').attempt(identify_number, password)

    return response.ok(token)
  }
}

module.exports = StudentSessionController
