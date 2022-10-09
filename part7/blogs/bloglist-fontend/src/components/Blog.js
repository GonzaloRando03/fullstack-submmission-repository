import blogService from '../services/blogs'

const Blog = ({blog, setBlogs}) => {
  const like = async (likes, id) => {
    
    try{
      const blogs = await blogService.likeBlog(likes, id)
      setBlogs(blogs)
    }catch(error){
      console.log(error)
    }
    
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      let blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      console.log(error)
    }
    
  }

  return(
    <div>
      {blog.url} <br/>
      {blog.likes} <button className='btn-primary' onClick={()=>{like(blog.likes+1, blog.id)}}>Like</button> <br/>
      {blog.author}<br/>
      <button className='btn-primary' onClick={()=>{deleteBlog(blog.id)}}>Delete</button><br/>
      <br/>

    </div>
  )
}

export default Blog