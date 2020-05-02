'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unit extends Model {

  employees () {
    return this.hasMany('App/Models/Employee')
  }

  solicitations () {
    return this
      .belongsToMany('App/Models/Solicitation')
      .pivotModel('App/Models/SolicitationUnit')
  }
}

module.exports = Unit
