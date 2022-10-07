import { connect } from 'react-redux'
import { newSearch } from '../reducers/searchReducer'

const Search = (props) => {

  const handleSearch = (event) => {
    console.log(event.target.value)
    console.log(props.search)
    props.newSearch(event.target.value)
  }

  return (
    <form >
        filter <input onChange={handleSearch} />
    </form>
  )
}

const mapStateToProps = (state) => {
    return {
      search: state.search,
    }
  
}

const mapDispatchToProps = {
  newSearch
}

const ConnectSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

export default ConnectSearch
