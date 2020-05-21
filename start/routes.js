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

//Authentication
Route.group(()=>{
  Route.post('/api/auth', 'SessionController.store')
})

//User
Route.group(()=>{
  Route.get('/api/users', 'UserController.index')
  Route.get('/api/users/:id', 'UserController.show').middleware(['findUser'])
  Route.post('/api/users', 'UserController.store')
  Route.patch('/api/users/:id', 'UserController.update').middleware(['findUser', ])
  Route.delete('/api/users/:id', 'EmployeeController.destroy').middleware(['findEmployee'])
})


//Units
Route.group(()=>{
  Route.get('/api/units', 'UnitController.index')
  Route.get('/api/units/:id', 'UnitController.show').middleware([ 'findUnit'])
  Route.post('/api/units', 'UnitController.store')
  Route.put('/api/units/:id', 'UnitController.update').middleware(['findUnit'])
  Route.delete('/api/units/:id', 'UnitController.destroy').middleware(['findUnit'])
})

//Courses
Route.group(()=>{
  Route.get('/api/courses', 'CourseController.index')
  Route.get('/api/courses/:id', 'CourseController.show').middleware([ 'findCourse'])
  Route.post('/api/courses', 'CourseController.store')
  Route.put('/api/courses/:id', 'CourseController.update').middleware(['findCourse'])
  Route.delete('/api/courses/:id', 'CourseController.destroy').middleware(['findCourse'])
})

//Students
Route.group(()=>{
  Route.get('/api/students', 'StudentController.index')
  Route.get('/api/students/:id', 'StudentController.show').middleware([ 'findStudent'])
  Route.post('/api/students', 'StudentController.store')
  Route.patch('/api/students/:id', 'StudentController.update').middleware(['findStudent'])
  Route.delete('/api/students/:id', 'StudentController.destroy').middleware(['findStudent'])
})

//Solicitations
Route.group(()=>{
  Route
    .get('/api/solicitations', 'SolicitationController.index')
  Route
    .get('/api/solicitations/:id', 'SolicitationController.show')
    .middleware(['findSolicitation'])
  Route
    .post('/api/solicitations', 'SolicitationController.store')
  // Route
  //   .delete('/api/solicitations/:id', 'SolicitationController.destroy')
  //   .middleware(['findSolicitation'])
  Route
    .post('/api/solicitations/:id/documents', 'SolicitationController.addDocument')//add document to Solicitation
    .middleware(['findSolicitation'])
  Route
    .post('/api/solicitations/:id/unit/:unit_id', 'SolicitationUnitController.store')//Send solicitation to unit
    .middleware(['findSolicitation'])
})

//Documents
Route.group(()=>{
  Route
    .get('/api/documents', 'DocumentController.index')
  Route
    .get('/api/documents/:id', 'DocumentController.show')
    .middleware(['findDocument'])
  Route
    .patch('/api/documents/:id', 'DocumentController.update')
    .middleware(['findDocument'])
  Route
    .delete('/api/documents/:id', 'DocumentController.destroy')
    .middleware(['findDocument'])
  Route
    .post('/api/documents/:id/attachments', 'AttachmentController.store')//Add attachment to document
    .middleware(['findDocument'])
})

//Attachments
Route.group(()=>{
  Route.get('/tmp/uploads/:path', 'AttachmentController.show')
})
