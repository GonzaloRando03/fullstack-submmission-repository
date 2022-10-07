import { useEffect } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, allAnecdotes } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const Anecdotes = (props) => {
    useEffect(() => {
      anecdoteService
        .getAll().then(anecdotes => props.allAnecdotes(anecdotes))
    }, [])
    
    const vote = async (id) => {
      console.log('vote', id)
      props.voteAnecdote(id)
      props.newNotification('Liked anecdote')
      setTimeout(()=>{props.newNotification('')}, 2000)
      
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            <br/>
            </div>
        )}
      </div>
    )
  }

  const mapStateToProps = (state) => {
    let anecdotesList = state.anecdote.sort(function(a, b) {
      return b.votes - a.votes;
    })
    if(state.search === ''){
      return {
        search: state.search,
        anecdotes: anecdotesList,
      }
    }else{
      const anecdotesSearch = anecdotesList.filter(anecdote => anecdote.content.includes(state.search))
      return {
        search: state.search,
        anecdotes: anecdotesSearch,
      }
    }
  }
  
  const mapDispatchToProps = {
    newNotification,
    allAnecdotes,
    voteAnecdote
  }
  
  const ConnectAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Anecdotes)
  
  export default ConnectAnecdotes
