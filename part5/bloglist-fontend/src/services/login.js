import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const postLogin = async (login) => {
  const request = axios.post(baseUrl, login)
  return request.then(response => response.data)
}

export default { postLogin }