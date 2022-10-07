const searchReducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch (action.type) {
        case 'NEW_SEARCH':
            console.log('notification', action.data.search)
            const newState = action.data.search
            return newState
    
        default: return state
    }
    
}

export const newSearch = (search) => {
    return {
      type: 'NEW_SEARCH',
      data: { search: search }
    }
}

export default searchReducer