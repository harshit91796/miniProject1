const express = require('express')
const router = express.Router();
const {auth,auth2} = require('../middleware/auth')

const {createAuthor,login} = require("../controller/authorController")

const {deleteBlog,deleteBlogQuery,restore} = require("../controller/deleteController")

const {createBlog,blogs,filterBlogs,updateBlog} = require('../controller/blogController')





router.post('/authors',createAuthor)

router.post('/login',auth,login)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)


router.delete('/blogs/:blogId', auth2, deleteBlog)
router.delete('/blogs', deleteBlogQuery)

router.put('/blogs/:blogId',auth2,updateBlog)

router.put('/restore', restore)



module.exports = router;