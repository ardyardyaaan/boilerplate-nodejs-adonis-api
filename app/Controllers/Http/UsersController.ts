import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUser from 'App/Validators/User/CreateUserValidator'
import DetailUser from 'App/Validators/User/DetailUserValidator'
import EditUser from 'App/Validators/User/EditUserValidator'
import User from 'App/Models/User'

export default class UsersController {

    public async create ({ request, response }: HttpContextContract) {
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

    public async index ({ response }: HttpContextContract) {
        try {
            const users = await User.all()
    
            return response.status(200).json({ code: 200, status: 'success', data: users })
        } catch (err) {
          return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }

    public async detail ({ request, response }: HttpContextContract) {
        //validate request payload
        const payload = await request.validate(DetailUser)
        try {

            const users = await User.findBy('id', payload.id)
    
            return response.status(200).json({ code: 200, status: 'success', data: users })
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }
    }

    public async edit ({ request, response }: HttpContextContract) {
        //validate request payload
        const payload = await request.validate(EditUser)
        try {
            const users = await User.findBy('id', payload.id)
            if (users) {
                users.id_card = payload.id_card != null ? payload.id_card : users.id_card
                users.name = payload.name != null ? payload.name : users.name
                users.email = payload.email != null ? payload.email : users.email
                if (payload.password != null) {
                    var crypto = require('crypto')
                    var hashedPassword = crypto.createHash('md5').update(payload.password).digest('hex')
                    users.password = hashedPassword
                }
                users.phone = payload.phone != null ? payload.phone : users.phone
                users.address = payload.address != null ? payload.address : users.address
                users.fcm_token = payload.fcm_token != null ? payload.fcm_token : users.fcm_token
                users.is_social = payload.is_social != null ? payload.is_social : users.is_social
                users.is_reset = payload.is_reset != null ? payload.is_reset : users.is_reset
                users.save

                return response.status(200).json({ code: 200, status: 'success', data: users })
            }
        } catch (err) {
            return response.status(500).json({ code: 500, status: 'error', message: err.message })
        }

    } 

}
