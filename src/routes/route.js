const express = require('express')
const router = express.Router();
const {createAuthor, login} = require("../controller/authorController")

const { authenticate, authorize } = require("../middleware/auth")

const { 
    createBlog,
    blogs,
    filterBlogs,
    updateBlog,
    deleteBlog,
    deleteBlogQuery
} = require('../controller/blogController')

// Create Author
router.post('/authors',createAuthor)

// Login Author
router.post('/login', login)

// Create Blog
router.post('/blogs', authenticate, createBlog)

// Get All Blog
router.get('/blogs', authenticate, blogs)

// Filter Blog
router.get('/filter', authenticate, filterBlogs)

// Update Blog
router.put('/blogs/:blogId', authorize, updateBlog)

// Delete Blog with id
router.delete('/blogs/:blogId', authorize, deleteBlog)

// Delete Blog with filter
router.delete('/blogs', authenticate, deleteBlogQuery)


module.exports = router;