const usersReducer = (state = [], action) => {
    switch (action.type){
        case "SET_USERS":
            return action.data

        default: return state
    }   
}

export const setUserS = (data) => {
    return {
        type: "SET_USERS",
        data: data
    }
}


export default usersReducer