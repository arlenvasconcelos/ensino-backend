'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationUnitSchema extends Schema {
  up () {
    this.create('solicitation_unit', (table) => {
      table
        .integer('unit_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('units')
        .onDelete('CASCADE')
      table
        .integer('solicitation_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('solicitations')
        .onDelete('CASCADE')
      table.string('status').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('solicitation_unit')
  }
}

module.exports = SolicitationUnitSchema
