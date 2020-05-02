'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('identify_number', 60).notNullable().unique()
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
        .integer('user_id')
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
