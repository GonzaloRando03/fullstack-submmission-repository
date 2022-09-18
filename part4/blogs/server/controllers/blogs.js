const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  try{
    let blogs = await Blog.find({})
    response.json(blogs)
  }catch(error){
    next(error)
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('url')){
    response.status(400).json({error: 'Bad request'})
  }

  let likes = request.body.hasOwnProperty('likes')? request.body.likes : 0

  let requestBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: likes,
    user: user.id
  }

  const blog = new Blog(requestBlog)
  try{
    let blogResult = await blog.save()
    response.status(201).json(blogResult)
  }catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (blog.user.toString() === decodedToken.id.toString()){
      Blog.findOneAndRemove({"_id": {$eq: id}})
      response.json({msg: 'Person deleted'})
    }else{
      response.status(500).json({error: 'This blog is not yours'})
    }
    
  }catch{
    response.json({msg: 'Error'})
  }
})

module.exports = blogsRouter