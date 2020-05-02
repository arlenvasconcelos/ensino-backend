'use strict'

/*
|--------------------------------------------------------------------------
| IniatlSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class IntialSeeder {
  async run () {
    // const course = await Factory.model('App/Models/Course').create()
    // const student = await Factory.model('App/Models/Student').make()

    // await course.students().save(student)
    await User.create({
      username: 'admin',
      password: '123456',
      status: 'ativo',
      type: 'admin'
    })
  }
}

module.exports = IntialSeeder
