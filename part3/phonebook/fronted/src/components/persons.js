function Persons({persons, onClick}){

    return(
        <>
            {persons.map(person => (
                <div key={person.id}>{person.name} {person.number}  <button onClick={() => onClick(person)}>Delete</button></div>
            ))}
        </>
    )
}

export default Persons