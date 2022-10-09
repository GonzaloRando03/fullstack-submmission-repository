const userReducer = (state = {username: '', password: ''}, action) => {
    switch (action.type){
        case "SET_VALUES":
            const newValues = {
                username: action.data.username,
                password: action.data.password
            }
            return newValues
        
        case "SET_USERNAME":
            const newUsername = {
                username: action.data.username,
                password: state.password
            }
            return newUsername

        case "SET_PASSWORD":
            const newPassword = {
                username: state.username,
                password: action.data.password
            }
            return newPassword
        
        case "RESET_VALUES":
            const resetValues = {
                username: '',
                password: ''
            }
            return resetValues

        default: return state
    }   
}

export const setUser = (data) => {
    return {
        type: "SET_VALUES",
        data: data
    }
}

export const setUsername = (username) => {
    return {
        type: "SET_USERNAME",
        data: {
            username: username
        }
    }
}

export const setPassword = (password) => {
    return {
        type: "SET_PASSWORD",
        data: {
            password: password
        }
    }
}

export const resetUser = () => {
    return {
        type: "RESET_VALUES"
    }
}

export default userReducer