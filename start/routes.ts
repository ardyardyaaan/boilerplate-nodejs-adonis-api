/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('users', 'UsersController.store')
})

Route.group(() => {
  Route.group(() => {
    //USERS
    Route.group(() => {
      Route.post('create', 'UsersController.create') // /api/v1/users/create
      Route.get('list', 'UsersController.index') // /api/v1/users/list
      Route.get('detail', 'UsersController.detail') // /api/v1/users/detail
      Route.post('edit', 'UsersController.edit') // /api/v1/users/detail
    }).prefix('/users')

  }).prefix('/v1')
}).prefix('/api')

