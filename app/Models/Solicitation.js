'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitation extends Model {

  documents () {
    return this.hasMany('App/Models/Document')
  }

  units () {
    return this.belongsToMany('App/Models/Unit').pivotModel('App/Models/SolicitationUnit')
  }
}

module.exports = Solicitation
