import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TesteLogins extends BaseSchema {
  protected tableName = 'teste_logins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('codigo_usuario')
      table.string('login_usuario').unique().notNullable()
      table.string('nome').notNullable()
      table.string('senha_acesso').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
