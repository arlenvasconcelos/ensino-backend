'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Attachment extends Model {
  document () {
    return this.belongsTo('App/Models/Document')
  }

  static get computed () {
    return ['url']
  }

  getUrl ({ path }) {
    return `${Env.get('APP_URL')}/tmp/uploads/${path}`
  }
}

module.exports = Attachment
