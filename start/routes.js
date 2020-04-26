'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/api', () => {
  return { greeting: 'API is working' }
})

//User
Route.group(()=>{
  Route.get('/api/users', 'UserController.index')
  Route.get('/api/users/:id', 'UserController.show')
  Route.post('/api/users', 'UserController.store')
  Route.put('/api/users/:id', 'UserController.update')
  Route.delete('/api/users/:id', 'UserController.destroy')
})

//Sessions
Route.group(()=>{
  Route.post('/api/sessions', 'SessionController.store')
})

//Units
Route.group(()=>{
  Route.get('/api/units', 'UnitController.index')
  Route.get('/api/units/:id', 'UnitController.show')
  Route.post('/api/units', 'UnitController.store')
  Route.put('/api/units/:id', 'UnitController.update')
  Route.delete('/api/units/:id', 'UnitController.destroy')
})

//Courses
Route.group(()=>{
  Route.get('/api/courses', 'CourseController.index')
  Route.get('/api/courses/:id', 'CourseController.show')
  Route.post('/api/courses', 'CourseController.store')
  Route.put('/api/courses/:id', 'CourseController.update')
  Route.delete('/api/courses/:id', 'CourseController.destroy')
})

//Students
Route.group(()=>{
  Route.get('/api/students', 'StudentController.index')
  Route.get('/api/students/:id', 'StudentController.show')
  Route.post('/api/students', 'StudentController.store')
  Route.put('/api/students/:id', 'StudentController.update')
  Route.delete('/api/students/:id', 'StudentController.destroy')
})

