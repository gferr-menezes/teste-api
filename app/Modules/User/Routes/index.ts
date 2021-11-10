import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/user/logged', 'UsersController.getUserLogged')
  }).namespace('App/Modules/User/Controllers')
})
  .middleware(['auth'])
  .prefix('v1')
