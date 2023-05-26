const express = require('express')
const router = express.Router();
const {auth,auth2} = require('../middleware/auth')

const {createAuthor,login} = require("../controller/authorController")

const {deleteBlog,deleteBlogQuery} = require("../controller/deleteController")

const {createBlog,blogs,filterBlogs,updateBlog} = require('../controller/blogController')





router.post('/authors',auth2,auth,createAuthor)

router.post('/login',auth,login)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)


router.delete('/blogs/:blogId',auth2, deleteBlog)
router.delete('/blogs',auth2, deleteBlogQuery)

router.put('/blogs/:blogId',updateBlog)



module.exports = router;