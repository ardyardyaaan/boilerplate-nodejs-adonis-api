import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
        id: this.ctx.params.id
  })
  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    id: schema.number([
        rules.exists({ table: 'users', column: 'id'})
    ]),
    id_card: schema.string.nullable({}, [
      rules.unique({ table: 'users', column: 'id_card', whereNot: { id: this.refs.id } })
    ]),
    name: schema.string.nullable(),
    email: schema.string.nullable({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.id } })
    ]),
    password: schema.string.nullable({}, [
      rules.confirmed()
    ]),
    phone: schema.string.nullable({}, [
      rules.unique({ table: 'users', column: 'phone', whereNot: { id: this.refs.id } })
    ]),
    address: schema.string.nullable(),
    fcm_token: schema.string.nullable(),
    status: schema.number.nullable(),
    is_social: schema.number.nullable(),
    is_reset: schema.number.nullable()
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
  }
}
