import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { LOGIN } from './queries'


const LoginForm = ({setToken}) => {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  function loginSend(event){
    event.preventDefault()
    const res = login({variables:{username: name, password: pass}})
    localStorage.setItem('token',res)
    setToken(res)
  }

  return(
    <div>
      <form onSubmit={loginSend}>
        username<br/>
        <input type='text' value={name} onChange={(event)=>{setName(event.target.value)}} /><br/>
        password<br/>
        <input type='password' value={pass} onChange={(event)=>{setPass(event.target.value)}} /><br/>
        <button type='submit'>enviar</button>
      </form>
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)


  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
