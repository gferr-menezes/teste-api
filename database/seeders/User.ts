import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

//import User from 'App/Modules/User/Models/TesteLogin'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await UserFactory.createMany(10)

    /*
    await User.create({
      loginUsuario: 'gferr.menezes@gmail.com',
      password: 'Gui392533',
      nome: 'guilherme ferreira',
    })
    */
  }
}
