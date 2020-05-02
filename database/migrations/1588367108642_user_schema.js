'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 60).notNullable().unique()
      table.string('password', 254).notNullable()
      table.string('status', 60).notNullable()
      table.string('name', 254).notNullable()
      table.string('identify_number', 60).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 254)
      table
        .integer('unit_id')
        .unsigned()
        .references('id')
        .inTable('units')
        .onDelete('SET NULL')
      table.timestamps()
    })

  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
