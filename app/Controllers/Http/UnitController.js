'use strict'

const Unit = use('App/Models/Unit')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with units
 */
class UnitController {
  /**
   * Show a list of all units.
   * GET units
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const units = await Unit.all()
    return units
  }

  /**
   * Create/save a new unit.
   * POST units
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const data = request.only(["name", "phone", "room"])
    const unit = await Unit.create(data)

    return unit
  }

  /**
   * Display a single unit.
   * GET units/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const unit = await Unit.query().where('id', '=', params.id).with('users').fetch()

    return unit
  }

  /**
   * Update unit details.
   * PUT or PATCH units/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const unit = await Unit.find(params.id)
    const data = await request.only(["name", "phone", "room"])

    unit.merge(data)
    await unit.save()

    return unit
  }

  /**
   * Delete a unit with id.
   * DELETE units/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const unit = await Unit.find(params.id)
    await unit.delete()

    return unit
  }
}

module.exports = UnitController
