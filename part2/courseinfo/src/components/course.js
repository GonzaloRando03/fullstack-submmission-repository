function Header({course}){
    return(
        <h1>{course}</h1>
    )
}

function Part({part}){
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

function Content({parts}){
    return(
        <>
            {parts.map(part => (
                <Part key={part.id} part={part}/>
            ))}
        </>
    )
}

function Total({parts}){
    let total = parts.reduce((b,a) => b + a.exercises, 0)


    return(
        <b>Total of {total} exercises</b>
    )
}

function Course({course}){
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            <br/><br/><br/>
        </div>
    )
}

export default Course