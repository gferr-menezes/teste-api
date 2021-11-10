import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    dbClientId: this.ctx.dbClientId,
    id: this.ctx.params.id ?? null,
  })

  public schema = schema.create({
    user: schema.object().members({
      email: schema.string({}, [
        rules.unique({
          table: 'users',
          column: 'email',
          where: { db_client_id: this.refs.dbClientId },
          whereNot: { id: this.refs.id },
        }),
      ]),
      typeUser: schema.string(),
      active: schema.boolean(),
      password: schema.string({}, [rules.confirmed()]),
      password_confirmation: schema.string(),
    }),

    profile: schema.object().members({
      name: schema.string(),
      lastName: schema.string(),
    }),
  })

  public messages = {
    'user.email.required': 'Informe o email',
    'user.email.unique': 'Email já cadastrado',
    'user.typeUser.required': 'Informe o tipo de usuário',
    'user.active.required': 'Informe o status do usuário',
    'user.password.required': 'Informe a senha',
    'user.password_confirmation.required': 'Confirme a senha',
    'user.password_confirmation.confirmed': 'Senhas não coincidem',
    'profile.required': 'Informe os dados do perfil',
    'profile.name.required': 'Informe o nome',
    'profile.lastName.required': 'Informe o sobrenome',
  }
}
