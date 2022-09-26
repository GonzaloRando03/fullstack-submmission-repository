const UserBlogs = ({blogs}) => {

    return (
        <>
        <h4>Your blogs</h4>
        {blogs.map(blog => (
            <p key={blog.id}>{blog.title}</p>
        ))}
        </>
    )
}

export default UserBlogs