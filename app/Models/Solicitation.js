'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Solicitation extends Model {

  interested () {
    return this.belongsTo('App/Models/User','interested_id', 'id')
  }

  created_by () {
    return this.belongsTo('App/Models/User','created_by_id', 'id')
  }

  documents () {
    return this.hasMany('App/Models/Document')
  }

  units () {
    return this.belongsToMany('App/Models/Unit').withPivot(['status', 'user_id'])
  }
}

module.exports = Solicitation
