import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeUpdate, column } from '@ioc:Adonis/Lucid/Orm'
import Date from 'App/Helpers/Date'
import String from 'App/Helpers/String'

export default class Cadastro extends BaseModel {
  static get table() {
    return 'teste_cadastros'
  }

  @column({ isPrimary: true, columnName: 'codigo_cliente' })
  public id: number

  @column({ serializeAs: 'nomeCliente' })
  public nomeCliente: string

  @column({ serializeAs: 'sexoCliente' })
  public sexoCliente: string

  @column({ serializeAs: 'dataNascimento' })
  public dataNascimento: string

  @column({ serializeAs: 'valorSaldo' })
  public valorSaldo?: number | null

  @column({ serializeAs: 'codigoUsuarioId' })
  public codigoUsuarioId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  static beforeCreate(modelo: Cadastro) {
    modelo.dataNascimento = Date.convertDate(modelo.dataNascimento, 'dd/MM/yyyy', 'yyyy-MM-dd')
    const saldo = modelo.valorSaldo ? String.formatMoney(modelo.valorSaldo.toString()) : null
    modelo.valorSaldo = saldo === 0 ? null : saldo
  }

  @beforeUpdate()
  static beforeUpdate(modelo: Cadastro) {
    modelo.dataNascimento = Date.convertDate(modelo.dataNascimento, 'dd/MM/yyyy', 'yyyy-MM-dd')
    const saldo = modelo.valorSaldo ? String.formatMoney(modelo.valorSaldo.toString()) : null
    modelo.valorSaldo = saldo === 0 ? null : saldo
  }
}
