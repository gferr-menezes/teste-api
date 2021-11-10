import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('cadastro', 'CadastrosController').apiOnly()
})
  .namespace('App/Modules/Cadastro/Controllers')
  .prefix('v1')
  .middleware(['auth'])
