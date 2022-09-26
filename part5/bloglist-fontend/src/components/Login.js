const Login = (props) => {   
    return (
        <>
            <h2>Login</h2>
            <form onSubmit={props.handleLogin}>
                <h4>Name</h4>
                <input
                    id="username"
                    type="text"
                    value={props.username}
                    name="Username"
                    onChange={({ target }) => props.setUsername(target.value)}
                />
                <h4>Password</h4>
                <input
                    id="password"
                    type="password"
                    value={props.password}
                    name="Password"
                    onChange={({ target }) => props.setPassword(target.value)}
                /><br/>
                <button id="login-button" type="sumbit">Login</button>
            </form>
        </>
        
    )}
  
export default Login