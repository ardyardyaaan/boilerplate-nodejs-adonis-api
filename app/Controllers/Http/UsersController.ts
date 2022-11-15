import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUser from 'App/Validators/User/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {

    public async create({ request, response }: HttpContextContract) {
        //validate request payload
        const payload = await request.validate(CreateUser)
        try {
            //hash md5 password
            var crypto = require('crypto')
            var hashedPassword = crypto.createHash('md5').update(payload.password).digest('hex')
            payload.password = hashedPassword
            //insert data
            const users = await User.create(payload)
    
            return response.status(200).json({ code: 200, status: 'success', data: users })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }

}
