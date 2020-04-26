'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Document extends Model {
  solicitation () {
    return this.belongsTo('App/Models/Solicitation')
  }
}

module.exports = Document
