import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CadastroValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    dataNascimento: schema.string({}),
    nomeCliente: schema.string({}),
    sexoCliente: schema.string({}),
  })

  public messages = {
    'dataNascimento.required': 'Informe a data de nascimento',
    'nomeCliente.required': 'Informe o nome do cliente',
    'sexoCliente.required': 'Informe o sexo do cliente',
  }
}
