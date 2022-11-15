import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_card: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public fcm_token: string

  @column()
  public is_social: number

  @column()
  public is_reset: number

  @column()
  public last_login: DateTime

  @column()
  public status: bigint

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column()
  public created_by: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public updated_by: number

  @column()
  public deleted_at: DateTime

  @column()
  public deleted_by: bigint
  
}
