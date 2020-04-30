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
  Route.get('/api/users', 'UserController.index').middleware(['auth:jwt,auth:student'])
  Route.get('/api/users/:id', 'UserController.show').middleware(['auth:jwt,auth:student','findUser'])
  Route.post('/api/users', 'UserController.store').middleware(['auth:jwt', 'adminCustom'])
  Route.patch('/api/users/:id', 'UserController.update').middleware(['auth:jwt','findUser', 'adminCustom'])
  Route.delete('/api/users/:id', 'UserController.destroy').middleware(['auth:jwt','findUser', 'adminCustom'])
})

//User Sessions
Route.group(()=>{
  Route.post('/api/users/sessions', 'SessionController.store')
})

//Units
Route.group(()=>{
  Route.get('/api/units', 'UnitController.index').middleware(['auth:jwt,auth:student'])
  Route.get('/api/units/:id', 'UnitController.show').middleware(['auth:jwt,auth:student', 'findUnit'])
  Route.post('/api/units', 'UnitController.store').middleware(['auth:jwt', 'adminCustom'])
  Route.put('/api/units/:id', 'UnitController.update').middleware(['auth:jwt', 'findUnit','adminCustom'])
  Route.delete('/api/units/:id', 'UnitController.destroy').middleware(['auth:jwt', 'findUnit', 'adminCustom'])
})

//Courses
Route.group(()=>{
  Route.get('/api/courses', 'CourseController.index').middleware(['auth:jwt,auth:student'])
  Route.get('/api/courses/:id', 'CourseController.show').middleware(['auth:jwt,auth:student', 'findCourse'])
  Route.post('/api/courses', 'CourseController.store').middleware(['auth:jwt', 'adminCustom'])
  Route.put('/api/courses/:id', 'CourseController.update').middleware(['auth:jwt', 'findCourse', 'adminCustom'])
  Route.delete('/api/courses/:id', 'CourseController.destroy').middleware(['auth:jwt', 'findCourse', 'adminCustom'])
})

//Students
Route.group(()=>{
  Route.get('/api/students', 'StudentController.index').middleware(['auth:jwt'])
  Route.get('/api/students/:id', 'StudentController.show').middleware(['auth:jwt', 'findStudent'])
  Route.post('/api/students', 'StudentController.store').middleware(['auth:jwt', 'adminCustom'])
  Route.patch('/api/students/:id', 'StudentController.update').middleware(['auth:jwt', 'findStudent', 'adminCustom'])
  Route.delete('/api/students/:id', 'StudentController.destroy').middleware(['auth:jwt', 'findStudent', 'adminCustom'])
})

//Student Sessions
Route.group(()=>{
  Route.post('/api/students/sessions', 'StudentSessionController.store')
})

//Solicitations
Route.group(()=>{
  Route
    .get('/api/solicitations', 'SolicitationController.index')
    .middleware(['auth:jwt', 'adminCustom'])
  Route
    .get('/api/solicitations/:id', 'SolicitationController.show')
    .middleware(['auth:jwt,auth:student','findSolicitation'])
  Route
    .post('/api/solicitations', 'SolicitationController.store')
    .middleware(['auth:jwt,auth:student'])
  Route
    .delete('/api/solicitations/:id', 'SolicitationController.destroy')
    .middleware(['auth:jwt,auth:student','findSolicitation'])
  Route
    .post('/api/solicitations/:id/documents', 'SolicitationController.addDocument')//add document to Solicitation
    .middleware(['auth:jwt,auth:student','findSolicitation'])
  Route
    .post('/api/solicitations/:id/send/:unit_id', 'SolicitationController.send')//Send solicitation
    .middleware(['auth:jwt,auth:student','findSolicitation'])
})

//Documents
Route.group(()=>{
  Route
    .get('/api/documents', 'DocumentController.index')
    .middleware(['auth:jwt'])
  Route
    .get('/api/documents/:id', 'DocumentController.show')
    .middleware(['auth:jwt,auth:student','findDocument'])
  Route
    .patch('/api/documents/:id', 'DocumentController.update')
    .middleware(['auth:jwt,auth:student','findDocument'])
  Route
    .delete('/api/documents/:id', 'DocumentController.destroy')
    .middleware(['auth:jwt,auth:student','findDocument'])
  Route
    .post('/api/documents/:id/attachments', 'AttachmentController.store')//Add attachment to document
    .middleware(['auth:jwt,auth:student','findDocument'])
})

//Attachments
Route.group(()=>{
  Route.get('/tmp/uploads/:path', 'AttachmentController.show')
})
