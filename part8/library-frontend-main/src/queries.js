import { gql } from '@apollo/client';

export const ALL_PERSONS = gql`
query {
  allAuthors  {
    name
    bookCount
    born
  }
}
`
export const ALL_BOOKS = gql`
query{
  allBooks {
    title
    published
    author{
      name
    }
    genres
  } 
}
`

export const NEW_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title, 
    author: $author, 
    published: $published, 
    genres: $genres
    ) {
    title
    author
    published
    genres
  }
}
`

export const UPLOAD_YEAR = gql`
mutation uploadYear($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    bookCount
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`