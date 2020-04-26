'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentSchema extends Schema {
  up () {
    this.create('attachments', (table) => {
      table.increments()
      table
        .integer('document_id')
        .unsigned()
        .references('id')
        .inTable('documents')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('path').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('attachments')
  }
}

module.exports = AttachmentSchema
