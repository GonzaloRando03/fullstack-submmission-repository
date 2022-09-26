const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

  if (request.body.password.lenght < 3){
    response.status(500).send({error: 'password needs more than 3 characters'})
  }

  if (request.body.userName.lenght < 3){
    response.status(500).send({error: 'user name needs more than 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const user = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    try{
      let users = await User.find({}).populate('blogs')
      response.json(users)
    }catch(error){
      next(error)
    }
  })

module.exports = usersRouter