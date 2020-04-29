'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitation extends Model {
  student () {
    return this.belongsTo('App/Models/Student')
  }

  documents () {
    return this.hasMany('App/Models/Document')
  }

  units () {
    return this
      .belongsToMany(
        'App/Models/Unit',
        // 'solicitation_id',
        // 'unit_id'
      ).pivotModel('App/Models/SolicitationUnit')
  }
}

module.exports = Solicitation
