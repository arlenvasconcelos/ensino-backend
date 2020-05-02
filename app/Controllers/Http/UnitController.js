'use strict'

const Unit = use('App/Models/Unit')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/**
 * Resourceful controller for interacting with units
 */
class UnitController {
  /**
   * Show a list of all units.
   * GET units
   *
   */
  async index ({ response }) {
    const units = await Unit.all()
    return response.ok({
      message: "Todas as unidades",
      data: units
    })
  }

  /**
   * Create/save a new unit.
   * POST units
   *
   */
  async store ({ request, response }) {

    const data = request.only(["name", "phone", "room"])
    const unit = await Unit.create(data)

    return response.created({
      message: "Unidade criada com sucesso.",
      data: unit
    })
  }

  /**
   * Display a single unit.
   * GET units/:id
   *
   */
  async show ({ params, request, response }) {

    const unit = await Unit
      .query()
      .where('id', '=', params.id)
      .with('employees')
      .with('solicitations')
      .fetch()

    return response.ok({
      message: "Unidade encontrada com sucesso.",
      data: unit
    })
  }

  /**
   * Update unit details.
   * PUT or PATCH units/:id
   *
   */
  async update ({ params, request, response }) {

    const unit = await Unit.find(params.id)
    const data = await request.only(["name", "phone", "room"])

    unit.merge(data)
    await unit.save()

    return response.ok({
      message: "Unidade atualizada com sucesso.",
      data: unit
    })
  }

  /**
   * Delete a unit with id.
   * DELETE units/:id
   *
   */
  async destroy ({ params, request, response }) {

    const unit = await Unit.find(params.id)
    await unit.delete()

    return response.ok({
      message: "Unidade excluída com sucesso",
      deleted: true
    })
  }
}

module.exports = UnitController
