'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments()
      table.string('identify_number', 254).notNullable().unique()
      table.string('status', 60).notNullable()
      table.string('type', 60).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 254)
      table
        .integer('unit_id')
        .unsigned()
        .references('id')
        .inTable('units')
        .onDelete('SET NULL')
      table
        .string('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
