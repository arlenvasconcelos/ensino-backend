'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Unit extends Model {

  users () {
    return this.hasMany('App/Models/User')
  }

  solicitations () {
    return this
      .belongsToMany('App/Models/Solicitation')
      .pivotModel('App/Models/SolicitationUnit')
      // .withPivot(['status', 'user_id', 'created_at', 'updated_at'])

  }
}

module.exports = Unit
