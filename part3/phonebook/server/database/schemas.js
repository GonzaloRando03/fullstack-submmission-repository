const db = require('mongoose')

const personSchema = new db.Schema({
    name: {
      type: String,
      unique: true,  
      minlength: 3
    },
    number: {
        type: String,
        minlength: 5,
    },
    id: Number
})



module.exports = db.model('Persons', personSchema)