'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('identify_number', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 254)
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
    this.drop('students')
  }
}

module.exports = StudentSchema