'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {
  user () {
    this.belongsTo('App/Models/User')
  }

  unit () {
    this.belongsTo('App/Models/Unit')
  }
}

module.exports = Employee
