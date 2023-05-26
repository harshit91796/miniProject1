const Blog = require('../models/blogsModel')
const Author = require('../models/authorModel')

async function createBlog(req,res){
    try {
        const validId = await Author.findById(req.body.authorId);
        if(validId){
            const blog = await Blog.create(req.body);
            res.status(201).send({data : blog, msg : 'blog is succesfully created'})
        }
       else{
        res.status(400).send({message : 'maybe author id is not valid'})
       }
        
    } catch (error) {
        res.status(500).send({msg : error.message})
    }

}

const blogs = async (req,res)=>{
    try {
        const result = await Blog.find({$and:[
            {isDeleted:false},
            {isPublished:true}
        ]}); 
        if(!result){
            res.status(404).send({status : false ,message : "blog not found"})
        }
        res.status(200).json({status:true,message:"Blogs List",data:result});
    } catch (error) {
        res.status(404).json({status:false,message:error.mesage});
    }
};

const filterBlogs = async (req, res) => {
  
    try {
        const filters = {};
    
        for (const key in req.query) {
          if (key) {
            filters[key] = { $in: req.query[key].split(',') };
          } else {
            filters[key] = req.query[key];
          }
        }
        const blogs = await Blog.find(filters);
        res.status(200).json({ status: true, message: "Blogs List", data: blogs });
      } catch (error) {
        res.status(404).json({ status: false, message: error.message });
      }
  
  };

  const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        let data = req.body;
        let blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return res.status(404).send({ 
                status: false,
                message: 'Blog not found'
             });
        }

        const updatedData = {
            ...data,
            title: data.title,
            body: data.body,
            tags: blog.tags.concat(data.tags || []),
            subcategory: blog.subcategory.concat(data.subcategory || []),
            isPublished: data.isPublished,
            publishedAt: data.isPublished ? new Date() : undefined
          };

        const updatedblog = await Blog.findOneAndUpdate(
            { _id: blogId, isDeleted: false }, 
            updatedData, 
            { new: true }
        );
        res.status(200).send({
            status: true,
            message: "Blog updated successfully",
            data: updatedblog
        });
    } catch (err) {
        res.status(500).send(err);
    }
}


module.exports = {createBlog,blogs,filterBlogs,updateBlog}