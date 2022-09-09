import axios from 'axios'

const url = 'http://localhost:3001/api/persons/'

function getAll(){
    const request = axios.get(url)
    return request.then(response => response.data)
}

function addPersonService(person){
    const request = axios.post(url, person) 
    return request.then(response => response.data)
}

function deleteService(id){
    const request = axios.delete(url + id) 
    return request.then(response => response.data)
}

function replaceNumber(person, id){
    const request = axios.put(url + id, person) 
    return request.then(response => response.data)
}


export default {getAll, addPersonService, deleteService, replaceNumber}