import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)

}

export const getUserOne = (id) => {
  const request = axios.get(baseUrl + id)
  return request.then(response => response.data)

}


export default  getUsers