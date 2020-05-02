'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationSchema extends Schema {
  up () {
    this.create('solicitations', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('status').notNullable()
      table.string('interested').notNullable()
      table.string('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitations')
  }
}

module.exports = SolicitationSchema
