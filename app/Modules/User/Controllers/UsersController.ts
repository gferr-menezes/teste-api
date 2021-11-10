import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Modules/User/Models/TesteLogin'

export default class UsersController {
  /**
   * GET /user/logged
   * @param param0
   */
  public async getUserLogged({ auth }: HttpContextContract) {
    const userId = auth.user?.id
    const user = await User.query().where({ id: userId }).select('codigo_usuario', 'login_usuario', 'nome').first()
    return user
  }
}
