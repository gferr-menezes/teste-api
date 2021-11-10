import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class TesteLogin extends BaseModel {
  static get table() {
    return 'teste_logins'
  }

  @column({ isPrimary: true, columnName: 'codigo_usuario' })
  public id: number

  @column()
  public loginUsuario: string

  @column({ serializeAs: null, columnName: 'senha_acesso' })
  public password: string

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: TesteLogin) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
