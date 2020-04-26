'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('identify_number', 254).notNullable().unique()
      table.string('type', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 254)
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
