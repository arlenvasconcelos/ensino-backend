'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentTokenSchema extends Schema {
  up () {
    this.create('student_tokens', (table) => {
      table.increments()
      table.integer('student_id').unsigned().references('id').inTable('students')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('student_tokens')
  }
}

module.exports = StudentTokenSchema
