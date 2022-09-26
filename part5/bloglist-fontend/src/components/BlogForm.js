import { useState, forwardRef } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = forwardRef((props, ref) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)


    const handleBlog = async (event) => {
        event.preventDefault()

        BlogForm.propTypes = {
            setBlogs: PropTypes.func.isRequired,
            setUserBlogs: PropTypes.func.isRequired,
        }

        try {
            await blogService.postBlog({
              title: title,
              author: author,
              url: url,
              likes: likes,
              user: props.login.id
            })
      
            let blogs = await blogService.getAll()
            props.setBlogs( blogs )
            props.getUserBlogs(props.login.username)
            props.setInfoMessage('Save sussesfully')
            props.toggleVisibility()
              setTimeout(() => {
                props.setInfoMessage(null)
              }, 5000)
      
          } catch (exception) {
            props.setErrorMessage('Wrong credentials')
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 5000)
        }
    }
    



    return(
        <>
            <h2>User: {props.name}</h2>
            <form onSubmit={handleBlog}>
                <h4>Title</h4>
                <input type="text"
                    id="title"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}>
                </input>
                <h4>Author</h4>
                <input type="text"
                    id="author"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}>
                </input>
                <h4>URL</h4>
                <input type="text"
                    id="url"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setUrl(target.value)}>
                </input>
                <h4>Likes</h4>
                <input type="number"
                    id="number"
                    value={likes}
                    name="Likes"
                    onChange={({ target }) => setLikes(target.value)}>
                </input><br/>
                <button id="create-button" type="submit">Send</button>
            </form>
        </>
    )
})

export default BlogForm