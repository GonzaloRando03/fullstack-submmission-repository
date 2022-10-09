import Princip from './Princip'
import { setUserS } from './reducers/usersReducer'
import Users from './components/users'
import User from './components/User'
import {
    Routes, Route, Link, useMatch, useNavigate
  } from "react-router-dom"
import getUsers from './services/users'
import { useEffect } from 'react'
import { connect } from 'react-redux'


const App = (props) => {
    useEffect(() => {
        getUsers().then(res => 
          props.setUserS(res)
        )
      }, [])

    return (
      <div className='m-4'>
        <div className='bg-success p-2 m-2 white'>
          <Link to={'/'}>Blogs</Link>
          <Link to={'/users'}>Users</Link>
        </div>

        <Routes>
            <Route path='/' element={<Princip />}/>
            <Route path='/users' element={<Users users={props.users} />}/>
            <Route path='/users/:id' element={<User />}/>
        </Routes>
      </div>
    )
  }
  
  
  const mapStateToProps = (state) => {
    return {
      users: state.users
    }
  }
  
  const mapDispatchToProps = {
    setUserS
  }
  
  const ConnectAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
  
  export default ConnectAnecdotes