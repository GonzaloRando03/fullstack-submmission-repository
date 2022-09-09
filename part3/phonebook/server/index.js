const express = require("express")
const cors = require('cors')
const logger = require('morgan')
const Person = require('./database/schemas')
const db = require('./database/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(logger(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}));


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


db.connectDB()


app.get('/info', (request, response) => {
    let today = new Date()
    let date = today.toUTCString()
    response.send(`<p>Phonebook has info for  people</p><p> ${date} (Eastern European Standard Time)</p>`)
  })
  

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {response.json(persons)})
    .catch(error => {
      console.log(error)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id, 10)
    Person.findOne({"id": {$eq: id}}).then(person => {response.json(person)})
      .catch(() => {response.status(404).end()})
})

app.delete('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id, 10)
    Person.findOneAndRemove({"id": {$eq: id}}).then(() => {response.json({msg: 'Person deleted'})})
      .catch(() => {response.json({msg: 'Error'})})
})

app.post('/api/persons', (request, response) => {
  let id = Math.floor(Math.random() * 50)
  let persons = []
  Person.find({}).then(result => {persons = result})
  if (request.body.name !== undefined && request.body.number !== undefined) {
    let nameGood = true
    let numberGood = true
    persons.forEach(person => {
      if (person.name === request.body.name){
        nameGood = false
      }
      if (person.number === request.body.number){
        numberGood = false
      }
    })

    if (numberGood && nameGood){
      const docSchema = {
        name: request.body.name,
        number: request.body.number,
        id: id
      }
      let person = new Person(docSchema)
      person.save().then( () => {
          console.log(`added ${person.name} number ${person.number} to phonebook`)
          response.json(docSchema)
      }).catch(error => {
        console.log(error)
        if (error.code === 11000){
          response.status(500).send({error: 'name already exist'})
        }else if (error.name === 'ValidationError'){
          response.status(500).send({error: 'name or phone should be longer'})
        }
      })
    }else if (numberGood && !nameGood){
      response.json({msg: 'Name already exist'})
    }else{
      response.json({msg: 'Number already exist'})
    }

  } else {
    response.json({msg: 'Error, arguments missing'})
  }
  
})


app.put('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id, 10)
  Person.findOneAndUpdate({"id":id},{$set:{number:request.body.number}}).then(() => {
    Person.findOne({"id": {$eq: id}}).then(person => {response.json(person)})
      .catch(() => {response.status(404).end()})
  })
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})