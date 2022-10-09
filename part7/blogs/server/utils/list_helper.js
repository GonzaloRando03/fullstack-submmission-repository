const blog = require("../models/blog")
const User = require('../models/user')
const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 1){return blogs[0].likes}
    if (blogs.length === 0){return 0}
    const sumLikes = (previusValue, currentValue) => {return previusValue + currentValue.likes}
    let result = blogs.reduce(sumLikes, 0)
    return result
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){return 'Introduce a blog'}
    let likes = []
    blogs.forEach(blog => {
        likes.push(blog.likes)
    })
    let index = likes.indexOf(Math.max(...likes))
    let favorite = {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){return 0}
    let groupOfBlogs = _.groupBy(blogs, 'author')
    let arrayOfBlogs = Object.entries(groupOfBlogs)
    let blogsOfAuthors = []
    arrayOfBlogs.forEach(elem => {
        let object = {
            name: elem[0],
            blogs: elem[1].length
        }
        blogsOfAuthors.push(object)
    })
    let numberOfBlogs = []
    blogsOfAuthors.forEach(elem => {
        numberOfBlogs.push(elem.blogs)
    })
    let most
    blogsOfAuthors.forEach(elem => {
        if(elem.blogs === Math.max(...numberOfBlogs)){
            most = elem
        }
    })
    return most
}

const mostLikes = (blogs) => {
    if (blogs.length === 1){return {name: blogs[0].author, blogs: 1}}
    if (blogs.length === 0){return 0}
    let groupOfBlogs = _.groupBy(blogs, 'author')
    let arrayOfBlogs = Object.entries(groupOfBlogs)
    let blogsOfAuthors = []
    arrayOfBlogs.forEach(elem => {
        let object = {
            name: elem[0],
            likes: elem[1].reduce((previousValue, currentValue) => previousValue + currentValue.likes, 0)
        }
        blogsOfAuthors.push(object)
    })
    let numberOfLikes = []
    blogsOfAuthors.forEach(elem => {
        numberOfLikes.push(elem.likes)
    })
    let most
    blogsOfAuthors.forEach(elem => {
        if(elem.likes === Math.max(...numberOfLikes)){
            most = elem
        }
    })
    return most
}


const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb
}

