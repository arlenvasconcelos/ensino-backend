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
    super.boot()
    this.addHook('beforeCreate', (solicitationUnit) => {
      solicitationUnit.status = "created"
    })

    this.addHook('beforeUpdate', (solicitationUnit) => {
      solicitationUnit.status = "sent"
    })
  }
}

module.exports = SolicitationUnit
