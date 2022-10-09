import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  let blogs
  return request.then(response => {
    blogs = response.data.sort((a, b) => {
      if(a.likes < b.likes) {
        return -1;
      }
      if(a.likes > b.likes) {
        return 1;
      }
      return 0;
    })

    return blogs
  })
}

const getUserBlog = (name) => {
  const request = axios.get(baseUrl + name)
  return request.then(response => response.data)
}

const postBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(baseUrl + id, config)
  return request.then(response => response.data)
}

const likeBlog = (likes, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const likesParams = {
    likes: likes
  }
  const request = axios.put(baseUrl + id, likesParams, config)
  return request.then(response => response.data)
}

export default { getAll, getUserBlog, postBlog, setToken, likeBlog, deleteBlog }