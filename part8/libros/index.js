const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const Author = require('./models/author')
const mongoose = require('mongoose')
const Book = require('./models/book')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = 'introduce url mongo'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    bookCount: Int
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(name: String 
            genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    login(
      username: String!
      password: String!
    ): String
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.name && !args.genre){
        let autBooks = Book.find({title: { $eq: args.name}})
        return autBooks

      }else if(args.genre){
        let genBooks  = await Book.aggregate([
          {
            $unwind:{
              path: '$genres'
            }
          },
          {
            $match: {
              'genres':{$eq: args.genre}
            }
          },
          { $lookup:{
              from: 'authors',
              localField: 'author',
              foreignField: '_id',
              as: 'author'
            }
          },{
            $unwind:{
              path: '$author'
            }
          }
        ])

        if(args.name){
          let autBooks = genBooks.filter(b => b.author === args.name)
          return autBooks
        }else{
          return genBooks
        }

      }else{
        const todosLosLibros = await Book.aggregate([
          { $lookup:{
              from: 'authors',
              localField: 'author',
              foreignField: '_id',
              as: 'author'
            }
          },{
            $unwind:{
              path: '$author'
            }
          }
        ])
        console.log(todosLosLibros)
        return todosLosLibros
      } 
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
        let auhorBooks = books.filter(b => b.author === root.name)
        return auhorBooks.length
    }
  },
  Mutation:{
    addBook: async (root, args, context) => {
      console.log('asdf',context)
      let book = {...args}
      const bookAdd = new Book(book)
      await bookAdd.save()
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args) => {
      let auth = await Author.findOneAndUpdate({name:{$eq : args.name}}, {born: args.setBornTo})
      return auth
    },
    login: async (root, args) => {
      const userForToken = {
        username: args.username,
        password: args.password,
      }
    
      const token = jwt.sign(userForToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzMjYxNjFmZTZlZTgwYmM5ZjNjNDlkOSIsImlhdCI6MTY2MzUxOTg3Nn0.QIyMubnQuAkCeseIbvq2S1n06Pr1gFtQbsfh7ZaGEk0')
      return token
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})