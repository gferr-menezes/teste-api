import { get_validator_message } from 'App/Helpers/Errors'
import { DateTime, Duration } from 'luxon'
import { CadastroInterface } from '../Contracts/Cadastro'
import Cadastro from '../Models/Cadastro'

export default class CadastroService {
  /**
   * Store
   * @param cadastroData
   */
  public async store(cadastroData: CadastroInterface) {
    this.validaIdade(cadastroData.dataNascimento)
    await Cadastro.create(cadastroData)
  }

  public async update(id: number, cadastroData: CadastroInterface) {
    this.validaIdade(cadastroData.dataNascimento)

    const cadastro = await Cadastro.query().where({ id }).first()

    await this.verificaPermissao(cadastroData.codigoUsuarioId, cadastroData.codigoUsuarioId)

    await cadastro?.merge(cadastroData).save()
  }

  public async destroy(id: number, codigoUsuarioId: number) {
    const cadastro = await Cadastro.find(id)
    await this.verificaPermissao(codigoUsuarioId, cadastro?.codigoUsuarioId)
    await Cadastro.query().where({ id }).delete()
  }

  private validaIdade(data: string) {
    const agora = DateTime.now()
    const dataNascimento = DateTime.fromFormat(data, 'dd/MM/yyyy')

    let idade: Duration | number = agora.diff(dataNascimento, ['years'])
    idade = parseInt(idade.years.toString())

    if (idade <= 21) {
      throw {
        messages: get_validator_message('Idade do cliente tem que ser maior do que 21 anos'),
        status: 422,
      }
    }
  }

  private verificaPermissao(idUsuarioAcao, idUsuarioCadastro) {
    if (idUsuarioAcao !== idUsuarioCadastro) {
      throw {
        messages: get_validator_message('Seu usuário não tem permissão para esta operacão'),
        status: 422,
      }
    }
  }
}
