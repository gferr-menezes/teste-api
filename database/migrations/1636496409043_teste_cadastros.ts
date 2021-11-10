import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TesteCadastros extends BaseSchema {
  protected tableName = 'teste_cadastros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('codigo_cliente')
      table.string('nome_cliente', 50).notNullable()
      table.string('sexo_cliente', 1).notNullable()
      table.date('data_nascimento').notNullable()
      table.decimal('valor_saldo', 15, 2)
      table.integer('codigo_usuario_id').unsigned().notNullable().references('codigo_usuario').inTable('teste_logins').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
