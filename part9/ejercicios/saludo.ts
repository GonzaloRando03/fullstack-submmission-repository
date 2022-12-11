import express from 'express';

const app = express()

app.get('/saludo', (req, res) => {
    res.send('Hola mundo')

})

app.listen(3030, ()=>{
    console.log('Iniciado')
})