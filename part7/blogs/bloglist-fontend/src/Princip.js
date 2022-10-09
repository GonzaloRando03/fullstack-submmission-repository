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
import  getUsers from './services/users'
import { connect } from 'react-redux'
import { setUser, resetUser, setPassword, setUsername } from './reducers/userReducer'
import { setBlogs, addBlog } from './reducers/blogReducer'


const Princip = (props) => {
  const [userBlogs, setUserBlogs] = useState([])
  const [login, setLogin] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null) 
  const [infoMessage, setInfoMessage] = useState(null) 


  const blogFormRef = useRef()

  useEffect(() => {
    console.log(props, 'asdf')
    blogService.getAll().then(blogs =>
      props.setBlogs( blogs )
    )  
    let userJSON = window.localStorage.getItem('user')
    let user = JSON.parse(userJSON)
    if (userJSON !== null){
      setLogin(user)
      getUserBlogs(user.username)
      blogService.setToken(user.token)
    }
    /* getUsers().then(res => 
      props.setUserS(res)
    ) */
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
          username: props.user.username, password: props.user.password,
        })
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        setLogin(user)
        getUserBlogs(user.username)
        props.resetUser()
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
      {errorMessage !== null? <ErrorMessage className='bg-cuccess' msg={errorMessage}/>: null}
      {infoMessage !== null? <InfoMessage className='bg-danger' msg={infoMessage}/>: null}
      {login === null?
        <Login username={props.user.username} password={props.user.password} setUsername={props.setUsername} setPassword={props.setPassword} handleLogin={handleLogin}/> :
        <Toggable label={'nuevo blog'}>
          <BlogForm ref={blogFormRef} name={login.username} login={login} setBlogs={props.setBlogs} setInfoMessage={setInfoMessage} setErrorMessage={setErrorMessage} getUserBlogs={getUserBlogs} />
        </Toggable>
        
      }
      {login !== null? <UserBlogs blogs={userBlogs}/>: null}<br/>
      <button className='btn-primary' onClick={unlog}>Exit</button>
      <h2>blogs</h2>
      {props.blogs.map((blog, i) =>
      <div className='blog' key={i}>
        {blog.title}
        <Toggable label={'show'}>
          <Blog  blog={blog} setBlogs={props.setBlogs}/>
        </Toggable>
        <br/>
      </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blog,
  }
}

const mapDispatchToProps = {
  setUser,
  resetUser,
  setUsername,
  setPassword,
  setBlogs,
  addBlog,
}

const ConnectAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Princip)

export default ConnectAnecdotes