const mongoose = require('mongoose')
const supertest = require('supertest')
require('dotenv').config()
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('test get', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

describe('tests',  () => {
  const token = process.env.TOKEN

  const object = {
    title: 'Go To Statement Considered Harmful',
    author: 'Gonzalo Rando',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 20
  }


  
  test('test post', async () => {
    await (await api.post('/api/blogs').send(object)).set({Authorization, token}).expect(201)    
  })
})


afterAll(() => {
  mongoose.connection.close()
})