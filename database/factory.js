'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

const COURSES = [{name: 'ADS', type: 'Superior'}, {name: 'EI', type: 'Superior'}, {name: 'Informática', type: 'Técnico'}]

Factory.blueprint('App/Models/Unit', (faker) => {
  return {
    name: faker.name(),
    room: faker.integer({ min: 101, max:519  }),
    phone: faker.phone({ country: "br" })
  }
})

// Post blueprint
Factory.blueprint('App/Models/User', async (faker) => {
  return {
    name: faker.name(),
    identify_number: faker.integer({min: 100000, max: 999999}),
    type: 'user',
    email: faker.email(),
    phone: faker.phone({ country: "br" }),
    password: '123456'
  }
})

Factory.blueprint('App/Models/Course', (faker, i) => {
  return {
    name: COURSES[i%3].name,
    type: COURSES[i%3].type,
  }
})


Factory.blueprint('App/Models/Student', async (faker, i) => {
  return {
    name: faker.name(),
    identify_number: faker.integer({min: 100000, max: 999999}),
    status: 'active',
    email: faker.email(),
    phone: faker.phone({ country: "br" }),
    password: '123456'
  }
})

