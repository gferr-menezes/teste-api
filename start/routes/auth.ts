import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout').middleware('auth')
})
  .namespace('App/Modules/Auth/Controllers')
  .prefix('v1/auth')
