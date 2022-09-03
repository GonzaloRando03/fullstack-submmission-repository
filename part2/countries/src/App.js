import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Countries from './components/countries'

function App() {
  const [ countries, setCountries ] = useState([]) 
  const [ search, setSearch ] = useState('')

  function getData(){
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(getData, [])

  function handleSearchChange(event) {
    console.log(event.target.value)
    setSearch(event.target.value)

    if(event.target.value.length === 0){
      getData()
      setCountries(countries)
    }else{
      let searchCountrie = countries.filter(countrie => countrie.name.common.toLowerCase().includes(search.toLowerCase()))
      setCountries(searchCountrie)
    }
  }

  return(
    <div>
      <Filter value={search} onChange={handleSearchChange}/>
      <Countries countries={countries}/>
    </div>
  )

}

export default App;
