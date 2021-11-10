import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    loginUsuario: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6), rules.regex(/^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/)]),
  })

  public messages = {
    'loginUsuario.required': 'Informe o email',
    'password.required': 'Informe a senha',
    'password.regex': 'Senha formato inválido',
  }
}
