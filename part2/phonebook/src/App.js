import React, { useState, useEffect } from 'react'
import service from './service'
import Filter from './components/filter'
import Form from './components/form'
import Persons from './components/persons'



function App() {

  function addPerson(event) {
    event.preventDefault()


    const newPersonObject = {
      name: newName,
      number: newNumber
    } 
    let array = Object.values(persons)
    let counter = 0
    array.forEach( person => {
      if (person.name !== newName){
        counter++
      }
    })
    if (array.length === counter){
      service.addPersonService(newPersonObject).then(personRes => {
        array.push(personRes)
        let value = {
          search: newSearch.search,
          cache: array
        } 
        setNewSearch(value)
        setPersons(array)
        setMessage(<div className='good'>Added {newName}</div>)
      })
      
    }else {
      
      if (window.confirm(newName + ' is already added to phonebook')){
        let id
        array.map( person => {
          if (person.name === newPersonObject.name){
            id = person.id
          }
          return null
        })
        service.replaceNumber(newPersonObject, id).then(personRes => {
          array.pop()
          array.push(personRes)
          let value = {
            search: newSearch.search,
            cache: array
          } 
          setNewSearch(value)
          setPersons(array)
        }).catch(() => {
          setMessage(<div className='bad'>Information of {newName} has already been deleted from server</div>)
        })
      }
    }

    console.log('button clicked', event.target)
  }


  function deletePerson(person){
    if (window.confirm(`delete ${person.name} ?`)){
      service.deleteService(person.id).then(() => {
        service.getAll().then(personsRes => {
          console.log('patata')
          setPersons(personsRes)
          let value = {
            search: '',
            cache: personsRes
          } 
          setNewSearch(value)
        })
      })
    }
  }


  function handleNameChange(event) {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  function handleNumberChange(event) {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  function handleSearchChange(event) {
    console.log(event.target.value)
    let value = {
      search: event.target.value,
      cache: newSearch.cache
    } 
    setNewSearch(value)

    if(value.search.length === 0){
      setPersons(value.cache)
    }else{
      let search = persons.filter(person => person.name.toLowerCase().includes(newSearch.search.toLowerCase()))
      setPersons(search)
    }
  }



  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState(<></>)
  const [ newSearch, setNewSearch ] = useState({search: '', cache: persons})


  useEffect(() => {
    console.log('effect')
    service.getAll().then(personsRes => {
      setPersons(personsRes)
      let value = {
        search: '',
        cache: personsRes
      } 
      setNewSearch(value)
    })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch.search} onChange={handleSearchChange}/>
      {message}
      <h2>Add a new</h2>
      <Form onSubmit={addPerson} 
        valueName={newName} onChangeName={handleNameChange}
        valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} onClick={deletePerson} />
    </div>
  )
}

export default App