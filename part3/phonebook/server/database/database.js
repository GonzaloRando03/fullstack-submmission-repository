require('dotenv').config()
const db = require('mongoose')

const url = process.env.MONGODB_URI

function connectDB(){
    db.connect(url).then( () => {
        console.log('Conected to database')
    }).catch(error =>{
        console.log('Error: ',error)
    })
}

function disconnectDB(){
    db.disconnect().then( () => {
        console.log('Disonected to database')
    }).catch(error =>{
        console.log('Error: ',error)
    })
}

module.exports = {connectDB, disconnectDB}