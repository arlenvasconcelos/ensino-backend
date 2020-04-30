'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


const Course = use('App/Models/Course')
/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   *
   */
  async index ({response}) {
    const courses = await Course.all()
    return response.ok({
      message: "All Courses.",
      data: courses
    })
  }


  /**
   * Create/save a new course.
   * POST courses
   *
   */
  async store ({ request, response }) {
    const data = request.only(["name", "type"])
    const course = await Course.create(data)

    return response.created({
      message: "Curso criado com sucesso.",
      data: course
    })
  }

  /**
   * Display a single course.
   * GET courses/:id
   *
   */
  async show ({ params, response,  }) {

    //Fazer condição caso não tenha estudantes cadastrados
    const course = await Course.query().where('id', '=', params.id).with('students').fetch()
    return response.ok({
      message: "Curso encontrado com sucesso.",
      data: course
    })
  }

  /**
   * Update course details.
   * PUT or PATCH courses/:id
   *
   */
  async update ({ params, request, response }) {
    const data = request.only(["name", "type"])
    const course = await Course.find(params.id)

    course.merge(data)
    await course.save()

    return response.ok({
      message: "Curso atualizado com sucesso.",
      data: course
    })
  }

  /**
   * Delete a course with id.
   * DELETE courses/:id
   *
   */
  async destroy ({ params, response }) {
    const course = await Course.find(params.id)
    await course.delete()

    return response.ok({
      message: "Curso deletado com sucesso.",
      deleted: true
    })
  }
}

module.exports = CourseController
