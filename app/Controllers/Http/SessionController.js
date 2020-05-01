'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { identify_number, password } = request.all()

    const token = await auth.attempt(identify_number, password)

    return response.ok(token)
  }
}

module.exports = SessionController
