'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTypeSchema extends Schema {
  up () {
    this.create('user_types', (table) => {
      table.string('type').notNullable().unique().primary()
    })

    this.alter('users', (table) => {
      table.string('type')
        .notNullable()
        .references('type')
        .inTable('user_types')
    })
  }

  down () {
    this.drop('user_types')
    this.alter('users', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = UserTypeSchema
