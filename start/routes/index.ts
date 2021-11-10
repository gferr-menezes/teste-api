import Route from '@ioc:Adonis/Core/Route'
import fs from 'fs'

Route.get('/', async () => {
  return { message: 'api v1 online' }
})

Route.get('v1/delete-file', async ({ request }) => {
  const { file_and_path } = request.all()

  fs.unlink(file_and_path, function (err) {
    if (err) throw err
  })
}).middleware('auth')

require('./auth')
require('./cadastro')
require('../../app/Modules/User/Routes')
