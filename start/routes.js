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
