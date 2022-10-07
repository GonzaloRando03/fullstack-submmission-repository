import anecdoteService from "../services/anecdoteService"



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      anecdote.votes+=1
      anecdoteService.likeAnecdote(id, anecdote).then(() => {
        anecdoteService.getAll().then(anecdotes => {
          return anecdotes
        })
      })
      return state

    case 'NEW_ANECDOTE':
      anecdoteService.addAnecdote(action.data.anecdote).then(anecdote => {
        console.log(anecdote)
        return [...state, action.data.anecdote]
      })
      return state
    
    case 'SET_ANECDOTES':
      return action.data.anecdotes
  
    default: return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id: id }
  }
}

export const allAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: { anecdotes: anecdotes }
  }
}

export const addAnecdote = (anecdote) => {
  const anecdoteObject = asObject(anecdote)
  return {
    type: 'NEW_ANECDOTE',
    data: {anecdote: anecdoteObject}
  }
}

export default anecdoteReducer