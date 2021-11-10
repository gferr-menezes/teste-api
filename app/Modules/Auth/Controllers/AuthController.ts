import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { get_error_message } from 'App/Helpers/Errors'
import Log from 'App/Helpers/Log'
import LoginValidator from 'App/Modules/Auth/Validators/LoginValidator'

export default class AuthController {
  /**
   *
   * POST auth/login
   *
   * @param param0
   * @returns
   */
  public async login({ request, auth, response }: HttpContextContract) {
    try {
      await request.validate(LoginValidator)

      const { loginUsuario, password } = request.all()

      console.log(loginUsuario, password)

      const token = await auth.use('api').attempt(loginUsuario, password)

      return token.toJSON()
    } catch (error) {
      console.log(error)

      if (error.status === 422) {
        Log.info('Validation error', error.messages)
        return response.status(422).send(error.messages)
      }

      if (error.status === 400) {
        return response.status(400).send(get_error_message('Usuário ou senha inválida'))
      }

      Log.error('System error', error.message)

      return response.status(500).send(get_error_message('error'))
    }
  }

  /**
   * GET auth/logout
   * @param param0
   */
  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').logout()
  }
}
