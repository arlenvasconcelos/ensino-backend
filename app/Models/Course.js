'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Course extends Model {

  students () {
    return this.hasMany('App/Models/Students')
  }
}


module.exports = Course
