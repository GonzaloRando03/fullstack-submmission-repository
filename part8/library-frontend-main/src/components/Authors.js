import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_PERSONS, UPLOAD_YEAR } from "../queries"

const Authors = (props) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [uploadYear] = useMutation(UPLOAD_YEAR, {
    refetchQueries: [ { query: ALL_PERSONS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  const res = useQuery(ALL_PERSONS)

  if (!props.show) {
    return null
  }

  if (res.loading){
    return(<div>Cargando</div>)
  }


  function changeYear(){
    const yearNumber = parseInt(year)
    uploadYear({variables:{name: name, setBornTo: yearNumber}})
  }

  function handleSelect(event){
    setName(event.target.value)
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {res.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={changeYear}>
        name
        <select value={name} onChange={handleSelect}>
        {res.data.allAuthors.map(option => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
        </select>
        <br/>year
        <input type='number' value={year} onChange={(event)=>{setYear(event.target.value)}}/><br/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Authors
