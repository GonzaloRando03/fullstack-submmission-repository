const notificationReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            console.log('notification', action.data.msg)
            const newState = action.data.msg
            return newState
    
        default: return state
    }
    
}

export const newNotification = (msg) => {
    return {
      type: 'NEW_NOTIFICATION',
      data: { msg: msg }
    }
}

export default notificationReducer