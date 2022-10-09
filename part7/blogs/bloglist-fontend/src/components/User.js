import { useState, useEffect } from 'react'
import {getUserOne} from '../services/users'
import { useMatch } from 'react-router-dom'

const User = () => {
    const match = useMatch('/users/:id')
    const id = match.params.id

    const [user, setUser] = useState({_id: null, blogs: []})
    const blogs = user.blogs

    useEffect(() => {
        console.log(id)
        getUserOne(id).then(res => 
          setUser(res[0])
        )
      }, [])


    return (
        <>
        <h1>USER {user._id}</h1>
            {blogs.map(blog =><p key={blog}>{blog}</p>)}
        </>
    )
}

export default User