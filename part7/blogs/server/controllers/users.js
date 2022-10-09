const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

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
      let users = await Blog.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'username'
          }
        },{
          $project: {
            title: "$title",
            user: "$username.username"
          }
        },{
          $unwind: {
            path: "$user"
          }
        },{
          $group: {
            _id: "$user",
            blogs: {$sum: 1}
          }
        }
      ])
      console.log(users)
      response.json(users)
    }catch(error){
      console.log(error)
    }
  })

  usersRouter.get('/:id', async (request, response) => {
    try{
      const id = request.params.id
      console.log(id)
      let users = await Blog.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'username'
          }
        },{
          $project: {
            title: "$title",
            user: "$username.username"
          }
        },{
          $unwind: {
            path: "$user"
          }
        },{
          $match:{
            "user": {
              $eq: id 
            }
          }
        },{
          $group: {
            _id: "$user",
            blogs: {$addToSet: "$title"}
          }
        }
      ])
      console.log(users)
      response.json(users)
    }catch(error){
      console.log(error)
    }
  })

module.exports = usersRouter