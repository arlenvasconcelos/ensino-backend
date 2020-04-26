'use strict'

const User = use("App/Models/User")

class StudentController {

  async index () {

    // const users = await User.query().with('unit').orderBy('name', 'asc').fetch();
    const students = await Student.all()
    return students;
  }

  async show ({params}) {

    const student = await Student.query().where('id', '=', params.id).with('course').fetch()

    return student
  }

  async store ({ request }) {
    const data = request.only(["name", "identify_number", "status", "phone", "email", "password", "course_id"])
    const student = await Student.create(data)

    return student
  }

  async update ({ params, request}) {

    const student = await Student.findBy('id', params.id)
    //dont get password
    const data = request.only(["name", "identify_number", "status", "phone", "email", "course_id"])

    student.merge(data)
    await student.save();

    return student
  }

  async destroy ({ params }) {

    const student = await Student.findBy('id', params.id)

    await student.delete();

    return student
  }
}

module.exports = StudentController
