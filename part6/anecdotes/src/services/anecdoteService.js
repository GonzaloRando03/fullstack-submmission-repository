import axios from 'axios'

const url = 'http://localhost:3001/anecdotes/'

function getAll(){
    const request = axios.get(url)
    return request.then(response => response.data)
}

function addAnecdote(anecdote){
    const request = axios.post(url, anecdote) 
    return request.then(response => response.data)
}

function likeAnecdote(id, anecdote){
    const request = axios.put(url+id, anecdote)
    return request.then(response => response.data)
}

export default {getAll, addAnecdote, likeAnecdote}