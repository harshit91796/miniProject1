const express = require('express')
const router = express.Router();
const {createAuthor,login} = require("../controller/authorController")
const {auth,auth2} = require('../middleware/auth');
const {deleteBlog,deleteBlogQuery} = require("../controller/deleteController")

const {createBlog,blogs,filterBlogs,updateBlog} = require('../controller/blogController')

router.post('/authors',createAuthor)
router.post('/login',auth,login );

router.post('/blogs',auth2,createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)

router.put('/blogs/:blogId',auth2,updateBlog)

router.delete('/blogs/:blogId', auth2,deleteBlog)
router.delete('/blogs',auth2, deleteBlogQuery)



module.exports = router;