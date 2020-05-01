'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationUnitSchema extends Schema {
  up () {
    this.alter('solicitation_unit', (table) => {
      table
        .string('created_by').notNullable()
    })
  }

  down () {
    this.table('solicitation_unit', (table) => {
      table.dropColumn('created_by')
    })
  }
}

module.exports = SolicitationUnitSchema
