const express = require('express')
const router = express.Router();
const {auth,auth2} = require('../middleware/auth')

const {createAuthor} = require("../controller/authorController")

const {deleteBlog,deleteBlogQuery} = require("../controller/deleteController")

const {createBlog,blogs,filterBlogs,updateBlog} = require('../controller/blogController')

router.post('/authors',createAuthor)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)


router.post('/authors',createAuthor)

router.delete('/blogs/:blogId', deleteBlog)
router.delete('/blogs', deleteBlogQuery)

router.put('/blogs/:blogId',updateBlog)

module.exports = router;