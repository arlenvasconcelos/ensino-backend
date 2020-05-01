'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationSchema extends Schema {
  up () {
    this.create('solicitations', (table) => {
      table.increments()
      table.string('type')
      table.string('status')
      table.string('created_by')
      table
        .integer('student_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitations')
  }
}

module.exports = SolicitationSchema
