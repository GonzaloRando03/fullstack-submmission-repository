import express from 'express';
import diagnoses from 'data/diagnoses.json';
import patients from 'data/patients.json';
import { Diagnose, Patient, NewPatient } from './types';
import bodyParser from 'body-parser';

const dataPatients:Patient[] = patients
const dataDiagnoses:Diagnose[] = diagnoses

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/ping', (req:any, res:any) => {
    res.status(200).send(null)

})

app.get('/api/diagnoses', (req:any, res:any) => {
    res.sent(dataDiagnoses)

})

app.get('/api/patients', (req:any, res:any) => {
    res.sent(dataPatients)

})

app.post('/api/patients', (req:any, res:any) => {
    const patientOne:NewPatient = req.body
    dataPatients.push(patientOne)
    res.sent(patientOne)

})

app.listen(3030, () => {
    console.log('Iniciado')
})