'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SolicitationUnit extends Model {

  static get table () {
    return 'solicitation_unit'
  }

  getStatus (status) {
    return status
  }

  static boot () {
    console.log('passou no bot')
    super.boot()
    this.addHook('beforeCreate', (solicitationUnit) => {
      solicitationUnit.status = "active"
    })

    // this.addHook('beforeUpdate', (solicitationUnit) => {
    //   solicitationUnit.status = "inactive"
    // })
  }

  solicitations () {
    return this.hasMany('App/Models/Solicitation')
  }

  units () {
    return this.hasMany('App/Models/Unit')
  }

}

module.exports = SolicitationUnit
