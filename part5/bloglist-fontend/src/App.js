import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import UserBlogs from './components/UserBlogs'
import InfoMessage from './components/Infomessage'
import ErrorMessage from './components/ErrorMessage'
import Toggable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userBlogs, setUserBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null) 
  const [infoMessage, setInfoMessage] = useState(null) 


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    let userJSON = window.localStorage.getItem('user')
    let user = JSON.parse(userJSON)
    if (userJSON !== null){
      setLogin(user)
      getUserBlogs(user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const getUserBlogs = async (username) => {
    try{
      let uBlogs = await blogService.getUserBlog(username)
      console.log(uBlogs)
      setUserBlogs(uBlogs)
    }catch(error){
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.postLogin({
          username: username, password: password,
        })
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setLogin(user)
        getUserBlogs(user.username)
        setUsername('')
        setPassword('')
        setInfoMessage('Logging sussesfully')
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        console.log('logging in with', username)

      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }
}

const unlog = () =>{
  window.localStorage.removeItem('user')
  setLogin(null)
}

  return (
    <div>
      {errorMessage !== null? <ErrorMessage msg={errorMessage}/>: null}
      {infoMessage !== null? <InfoMessage msg={infoMessage}/>: null}
      {login === null?
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/> :
        <Toggable label={'nuevo blog'}>
          <BlogForm ref={blogFormRef} name={login.username} login={login} setBlogs={setBlogs} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage} getUserBlogs={getUserBlogs} />
        </Toggable>
        
      }
      {login !== null? <UserBlogs blogs={userBlogs}/>: null}<br/>
      <button onClick={unlog}>Exit</button>
      <h2>blogs</h2>
      {blogs.map((blog, i) =>
      <div className='blog' key={i}>
        {blog.title}
        <Toggable label={'show'}>
          <Blog  blog={blog} setBlogs={setBlogs}/>
        </Toggable>
        <br/>
      </div>
      )}
    </div>
  )
}

export default App
