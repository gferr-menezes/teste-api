import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('codigo_usuario_id').unsigned().references('codigo_usuario').inTable('teste_logins').onDelete('CASCADE')
      table.string('token', 64).notNullable().unique()
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.timestamp('expires_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
