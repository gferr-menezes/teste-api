import Factory from '@ioc:Adonis/Lucid/Factory'

import User from 'App/Modules/User/Models/TesteLogin'

export const UserFactory = Factory.define(User, ({ faker }) => {
  const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`
  return {
    loginUsuario: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
    nome: fullName.toLowerCase(),
  }
}).build()
