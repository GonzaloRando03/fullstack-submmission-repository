const blogReducer = (state = [], action) => {
    switch (action.type){
        case "SET_BLOGS":
            return action.data
        
        case "ADD_BLOG":
            const newBlogs = [...state, action.data.blog]
            return newBlogs


        default: return state
    }   
}

export const setBlogs = (data) => {
    return {
        type: "SET_BLOGS",
        data: data
    }
}

export const addBlog = (blog) => {
    return {
        type: "ADD_BLOG",
        data: {
            blog: blog
        }
    }
}


export default blogReducer