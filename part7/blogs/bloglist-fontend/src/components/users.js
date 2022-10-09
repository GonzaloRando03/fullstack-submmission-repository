import { Link } from 'react-router-dom'

const Users = ({users}) => {
    return (
        <>
        <h1>USERS</h1>
            {users.map( user => <div key={user._id}>
                <Link to={`/users/${user._id}`} >name:{user._id} blogs:{user.blogs}</Link>
            </div>)}
        </>
    )
}

export default Users