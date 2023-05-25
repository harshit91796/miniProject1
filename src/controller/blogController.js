const Blog = require('../models/blogsModel')
const Author = require('../models/authorModel')

// Create Blog
const createBlog = async (req,res) => {
    try {
        let data = req.body;

        if(!data) {
            return res.status(400).send({msg : 'blog data is required'})
        }
        if(!data.title){
            return res.status(400).send({msg : 'blog title is required'})
        }
        if(!data.body){
            return res.status(400).send({msg : 'blog body is required'})
        }
        if(!data.authorId){
            return res.status(400).send({msg : 'blog author id is required'})
        }
        if(!data.tags){
            return res.status(400).send({msg : 'blog tags is required'})
        }
        if(!data.category){
            return res.status(400).send({msg : 'blog category is required'})
        }
        if(!data.subcategory){
            return res.status(400).send({msg : 'blog subcategory is required'})
        }

        const validId = await Author.findById(data.authorId);
        if(validId){
            const blog = await Blog.create(data);
            return res.status(201).send({
              status: true,
              msg : 'blog is succesfully created',
              data : blog
            })
        }
       else{
        return res.status(404).send({
            status : false,
            message : 'author not found'
        })
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
            return res.status(404).send({
              status : false ,
              message : "blog not found"
            })
        }
        
        res.status(200).json({
          status:true,
          message:"Blogs List",
          data:result
        });
    } catch (error) {
        res.status(500).json({
          status:false,
          message:error.mesage
        });
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
        res.status(200).json({ 
          status: true, 
          message: "Blogs List", 
          data: blogs 
        });
      } catch (error) {
        res.status(500).json({ 
          status: false, 
          message: error.message 
        });
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

const deleteBlog = async function(req,res){
  let id = req.params.blogId
  const date = new Date()
  let result = await Blog.findById(id)
  if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}

  const dateUp = {deletedAt : date}
  const isdeletd = { isDeleted :true}
  try{
      await Blog.updateOne({_id:id},
          {$set : dateUp},
          {new :true}
      )
      let savedata = await Blog.updateOne({_id:id},
          {$set : isdeletd},
          {new :true}
      )
      res.status(200).send({status:true})
  }
  catch(error){
      console.log(error.message);
      res.status(501).json({message:error.message})
  }    
}

const deleteBlog1 = async function(req,res){
  const filters = {};
  
  for (const key in req.query) {
      if (key) {
          filters[key] = { $in: req.query[key].split(',') };
      } else {
          filters[key] = req.query[key];
      }
  }

  let result = await Blog.findOne(filters).select({_id:1})
  console.log(result)
  if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
  let id = result._id

  const date = new Date()
  const dateUp = {deletedAt : date}
  const isdeletd = { isDeleted :true}
  try{
      await Blog.updateOne({_id:id},
          {$set : dateUp},
          {new :true}
      )
      let savedata = await Blog.updateOne({_id:id},
          {$set : isdeletd},
          {new :true}
      )
      res.status(200).send({status:true})
  }
  catch(error){
      res.status(500).json({
          status: false,
          message: error.message
      })
  }    
}


module.exports = {
  createBlog,
  blogs,
  filterBlogs,
  updateBlog,
  deleteBlog,
  deleteBlog1
}