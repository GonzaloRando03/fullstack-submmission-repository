import express from 'express';
import bodyParser from 'body-parser';

function calculateBmi(peso: number, estatura: number){
    const metros: number = estatura/100
    const result: number = peso/(metros * metros)
    
    if (result > 25){
        return "no saludable " + (result)
    }else{
        return "saludable " + (result)
    }
}

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/bmi', (req, res) => {
    const pesoParam:any = req.query.peso
    const estaturaParam:any = req.query.estatura

    const peso:number = parseFloat(pesoParam)
    const estatura:number = parseFloat(estaturaParam)
    
    const bmi:string = calculateBmi(peso,estatura)
    res.send(bmi)

})

app.listen(3030, () => {
    console.log('Iniciado')
})