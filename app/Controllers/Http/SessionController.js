'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { username, password } = request.all()

    const token = await auth.attempt(username, password)

    return response.ok(token)
  }
}

module.exports = SessionController
