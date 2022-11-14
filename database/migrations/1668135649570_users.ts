import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('id_card').unique().nullable()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('phone').unique().nullable()
      table.text('address').nullable()
      table.string('fcm_token').nullable()
      table.integer('is_social').defaultTo(0)
      table.integer('is_reset').defaultTo(0)
      table.timestamp('last_login', { useTz: true })
      table.integer('status').defaultTo(0)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.integer('created_by').nullable()
      table.timestamp('updated_at', { useTz: true })
      table.integer('updated_by').nullable()
      table.timestamp('deleted_at', { useTz: true })
      table.integer('deleted_by').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
