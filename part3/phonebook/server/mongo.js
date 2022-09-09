const db = require('mongoose')

if (process.argv.length < 3){
    console.log('Please provide a password')
    process.exit(1)
}

const personSchema = new db.Schema({
    name: String,
    number: String
})

const Person = db.model('Persons', personSchema)

const password = process.argv[2]

const url = `mongodb+srv://gonzalo:${password}@cluster0.b62kyze.mongodb.net/?retryWrites=true&w=majority`

db.connect(url)


if (process.argv.length === 5){
    let docSchema = {
        name: process.argv[3],
        number: process.argv[4]
    }

    let person = new Person(docSchema)
    person.save().then( () => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
    }).catch(error => {console.log(error)})
    

}else if (process.argv.length === 3){
    Person.find({}).then(persons => {
        persons.forEach(person => {
            console.log(person)
        })
    }).catch(error => {
        console.log(error)
    })
    

}else{
    console.log('enter the name and the phone to add a person')
    
}

