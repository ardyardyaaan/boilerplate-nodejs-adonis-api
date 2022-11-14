import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async create({ request, response }: HttpContextContract) {
        const input = request.only([
            'id_card',
            'name',
            'email',
            'password',
            'phone',
            'address',
            'fcm_token',
            'is_social',
            'is_reset',
            'last_login',
            'status'
        ])
        
        try {
            var crypto = require('crypto')
            var hashedPassword = crypto.createHash('md5').update(input['password']).digest('hex')
            input['password'] = hashedPassword
            const users = await User.create(input)
    
            return response.status(200).json({ code: 200, status: 'success', data: users })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
      }

}
