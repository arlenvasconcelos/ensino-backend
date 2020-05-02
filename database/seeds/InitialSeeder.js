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
const Database = use('Database')
const User = use('App/Models/User')

class IntialSeeder {
  async run () {
    // await Database.table('user_types').insert({
    //   type: 'Admin'
    // })
    // await Database.table('user_types').insert({
    //   type: 'Servidor'
    // })
    // await Database.table('user_types').insert({
    //   type: 'Aluno'
    // })

    await User.create({
      username: 'admin',
      password: '123456',
      status: 'ativo',
      name:'Admin',
      type:'Admin',
      identify_number:'000000',
      email:'admin@admin.com',
    })
  }
}

module.exports = IntialSeeder
