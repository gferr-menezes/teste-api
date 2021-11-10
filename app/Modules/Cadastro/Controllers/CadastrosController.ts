import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import String from 'App/Helpers/String'
import { CadastroInterface } from '../Contracts/Cadastro'
import Cadastro from '../Models/Cadastro'
import CadastroService from '../Services/CadastroService'
import CadastroValidator from '../Validators/CadatroValidator'

export default class CadastrosController {
  private service: CadastroService

  constructor() {
    this.service = new CadastroService()
  }

  /**
   * GET /cadastro
   * @param param0
   * @returns
   */
  public async index({}: HttpContextContract) {
    return await Cadastro.query().orderBy('nomeCliente', 'asc')
  }

  /**
   * POST /cadastro
   * @param param0
   * @returns
   */
  public async store({ request, auth, response }: HttpContextContract) {
    try {
      await request.validate(CadastroValidator)
      const dados = request.all()
      const codigoUsuarioId = auth.user.id

      const cadastroData = <CadastroInterface>String.toLowerCaseObj({
        codigoUsuarioId: codigoUsuarioId,
        dataNascimento: dados.dataNascimento,
        nomeCliente: dados.nomeCliente,
        sexoCliente: dados.sexoCliente,
        valorSaldo: dados.valorSaldo,
      })

      await this.service.store(cadastroData)
    } catch (error) {
      if (error.status === 422) {
        return response.status(422).send(error.messages)
      }

      return response.status(500).send('erro interno')
    }
  }

  /**
   * GET /cadastro/:id
   * @param param0
   * @returns
   */
  public async show({ params }: HttpContextContract) {
    const id = params.id
    return Cadastro.query().where({ id }).first()
  }

  /**
   * PUT /cadastro/:id
   * @param param0
   * @returns
   */
  public async update({ params, request, auth, response }: HttpContextContract) {
    try {
      await request.validate(CadastroValidator)

      const id = params.id
      const dados = request.all()
      const codigoUsuarioId = auth.user.id

      const cadastroData = <CadastroInterface>String.toLowerCaseObj({
        codigoUsuarioId: codigoUsuarioId,
        dataNascimento: dados.dataNascimento,
        nomeCliente: dados.nomeCliente,
        sexoCliente: dados.sexoCliente,
        valorSaldo: dados.valorSaldo,
      })

      await this.service.update(id, cadastroData)
    } catch (error) {
      console.log(error)
      if (error.status === 422) {
        return response.status(422).send(error.messages)
      }

      return response.status(500).send('erro interno')
    }
  }

  /**
   * DELETE /cadastro/:id
   * @param param0
   * @returns
   */
  public async destroy({ params, auth, response }: HttpContextContract) {
    try {
      const id = params.id
      const codigoUsuarioId = auth.user.id

      await this.service.destroy(id, codigoUsuarioId)
    } catch (error) {
      if (error.status === 422) {
        return response.status(422).send(error.messages)
      }

      return response.status(500).send('erro interno')
    }
  }
}
