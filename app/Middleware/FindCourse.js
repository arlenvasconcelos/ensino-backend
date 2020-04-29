'use strict'

const Course = use('App/Models/Course')

class FindCourse {

  async handle ({response, params: {id} }, next) {
    // call next to advance the request
    const course = await Course.find(id)
    if (!course){
      return response.notFound({
        message: "Course not found.",
        id
      })
    }
    await next()
  }
}

module.exports = FindCourse
