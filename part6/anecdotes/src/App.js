import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Search from './components/Search'

const App = () => {
  

  return (
    <div>
      <Notification/> 
      <Search/>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App