const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")

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

// Create Blog
router.post('/blogs',createBlog)

// Get All Blog
router.get('/blogs',blogs)

// Filter Blog
router.get('/filter',filterBlogs)

// Update Blog
router.put('/blogs/:blogId',updateBlog)

// Delete Blog with id
router.delete('/blogs/:blogId', deleteBlog)

// Delete Blog with filter
router.delete('/blogs', deleteBlogQuery)


module.exports = router;