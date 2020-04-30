'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UnitSchema extends Schema {
  up () {
    this.create('units', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('phone')
      table.string('room')
      table.timestamps()
    })

    this.alter('users', (table) => {
      table
        .integer('unit_id')
        .unsigned()
        .references('id')
        .inTable('units')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.drop('units')
    this.table('users', (table) => {
      table.dropColumn('unit_id')
    })
  }
}

module.exports = UnitSchema
