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
  Route.post('/api/auth/sign_in', 'SessionController.store')
  Route.delete('/api/auth/sign_out', 'SessionController.delete').middleware(['auth'])
  Route.get('/api/auth/validate_token', 'SessionController.validateToken').middleware(['auth'])
  Route.get('/api/auth/refresh_token', 'SessionController.refreshToken')
})

//User
Route.group(()=>{
  Route.get('/api/users', 'UserController.index').middleware(['auth'])
  Route.get('/api/users/:id', 'UserController.show').middleware(['auth','findUser'])
  Route.post('/api/users', 'UserController.store').middleware(['auth', 'adminCustom'])
  Route.patch('/api/users/:id', 'UserController.update').middleware(['auth', 'adminCustom', 'findUser', ])
  Route.delete('/api/users/:id', 'EmployeeController.destroy').middleware(['auth', 'adminCustom', 'findEmployee', ])
})


//Units
Route.group(()=>{
  Route.get('/api/units', 'UnitController.index').middleware(['auth'])
  Route.get('/api/units/:id', 'UnitController.show').middleware(['auth', 'findUnit'])
  Route.post('/api/units', 'UnitController.store').middleware(['auth', 'adminCustom'])
  Route.put('/api/units/:id', 'UnitController.update').middleware(['auth', 'adminCustom', 'findUnit'])
  Route.delete('/api/units/:id', 'UnitController.destroy').middleware(['auth', 'adminCustom', 'findUnit'])
})

//Courses
Route.group(()=>{
  Route.get('/api/courses', 'CourseController.index').middleware(['auth'])
  Route.get('/api/courses/:id', 'CourseController.show').middleware(['auth', 'findCourse'])
  Route.post('/api/courses', 'CourseController.store').middleware(['auth', 'adminCustom'])
  Route.put('/api/courses/:id', 'CourseController.update').middleware(['auth', 'adminCustom', 'findCourse'])
  Route.delete('/api/courses/:id', 'CourseController.destroy').middleware(['auth', 'adminCustom', 'findCourse'])
})

//Students
Route.group(()=>{
  Route.get('/api/students', 'StudentController.index').middleware(['auth'])
  Route.get('/api/students/:id', 'StudentController.show').middleware(['auth', 'findStudent'])
  Route.post('/api/students', 'StudentController.store').middleware(['auth', 'adminCustom'])
  Route.patch('/api/students/:id', 'StudentController.update').middleware(['auth', 'adminCustom', 'findStudent'])
  Route.delete('/api/students/:id', 'StudentController.destroy').middleware(['auth', 'adminCustom', 'findStudent'])
})

//Solicitations
Route.group(()=>{
  Route
    .get('/api/solicitations', 'SolicitationController.index')
    .middleware(['auth'])
  Route
    .get('/api/solicitations/:id', 'SolicitationController.show')
    .middleware(['auth','findSolicitation'])
  Route
    .post('/api/solicitations', 'SolicitationController.store')
    .middleware(['auth'])
  Route
    .delete('/api/solicitations/:id', 'SolicitationController.destroy')
    .middleware(['auth','findSolicitation'])
  Route
    .post('/api/solicitations/:id/documents', 'SolicitationController.addDocument')//add document to Solicitation
    .middleware(['auth','findSolicitation'])
  Route
    .post('/api/solicitations/:id/unit/:unit_id', 'SolicitationUnitController.store')//Send solicitation to unit
    .middleware(['auth','findSolicitation'])
})

//Documents
Route.group(()=>{
  Route
    .get('/api/documents', 'DocumentController.index')
    .middleware(['auth'])
  Route
    .get('/api/documents/:id', 'DocumentController.show')
    .middleware(['auth','findDocument'])
  Route
    .patch('/api/documents/:id', 'DocumentController.update')
    .middleware(['auth','findDocument'])
  Route
    .delete('/api/documents/:id', 'DocumentController.destroy')
    .middleware(['auth','findDocument'])
  Route
    .post('/api/documents/:id/attachments', 'AttachmentController.store')//Add attachment to document
    .middleware(['auth','findDocument'])
})

//Attachments
Route.group(()=>{
  Route.get('/tmp/uploads/:path', 'AttachmentController.show')
})
