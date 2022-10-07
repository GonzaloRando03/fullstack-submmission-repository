import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
      }


    return (
        <div>
            <h2>Create New</h2>
          <form onSubmit={newAnecdote}>
            <input name="anecdote" /> 
            <button type="submit">add</button>
          </form>
        </div>
      )
  }

  const mapDispatchToProps = {
    addAnecdote
  }
  
  const ConnectAnecdoteForm = connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)
  
  export default ConnectAnecdoteForm
