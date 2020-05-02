'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentSchema extends Schema {
  up () {
    this.create('attachments', (table) => {
      table.increments()
      table.string('path').notNullable()
      table
        .integer('document_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('documents')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('attachments')
  }
}

module.exports = AttachmentSchema
