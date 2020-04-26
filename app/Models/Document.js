'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Document extends Model {
  solicitation () {
    return this.belongsTo('App/Models/Solicitation')
  }

  questions () {
    return this.hasMany('App/Models/Question')
  }
}

module.exports = Document
