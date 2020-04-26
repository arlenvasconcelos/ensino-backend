'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {
  document () {
    return this.belongsTo('App/Models/Document')
  }
}

module.exports = Question
