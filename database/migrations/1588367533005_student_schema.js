'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('course_user', (table) => {
      table
        .integer('user_id')
        .primary()
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('course_id')
        .unsigned()
        .references('id')
        .inTable('courses')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('course_user')
  }
}

module.exports = StudentSchema
