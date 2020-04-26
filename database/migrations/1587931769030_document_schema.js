'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentSchema extends Schema {
  up () {
    this.create('documents', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('status').notNullable()
      table.string('created_by').notNullable()
      table
        .integer('solicitation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('solicitations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('documents')
  }
}

module.exports = DocumentSchema
