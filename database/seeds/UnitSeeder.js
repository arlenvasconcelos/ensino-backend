'use strict'

/*
|--------------------------------------------------------------------------
| UnitSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UnitSeeder {
  async run () {
    const unit = await Factory.model('App/Models/Unit').create()
    const user = await Factory.model('App/Models/User').make()

    await unit.users().save(user)
    await unit.users().create({
      name: 'admin',
      identify_number: 'admin',
      type: 'admin',
      email: 'admin@admin.com',
      phone: '123456789',
      password: '123456'
    })

  }
}

module.exports = UnitSeeder
