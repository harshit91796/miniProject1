
const Blog = require('../models/blogsModel');

const deleteBlog = async function(req,res){
    let id = req.params.blogId
    let result = await Blog.findById(id)
    if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
  
    const dateUp = {deletedAt : new Date(), isDeleted :true}
    try{
        await Blog.updateOne({_id:id}, {$set : dateUp})
        res.status(200).send({status:true,data:result})
    }
    catch(error){
        res.status(501).json({message:error.message})
    }    
  }

  const deleteBlogQuery = async function(req,res){
  
    let filters = req.query;
    let result = await Blog.findOne(filters).select({_id:1})
    if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
    let id = result._id
    const dateUp = {deletedAt : new Date(), isDeleted :true}
    try{
        await Blog.updateOne({_id:id},
            {$set : dateUp},
            {new :true}
        )
        res.status(200).send({status:true,data:result})
    }
    catch(error){
        res.status(501).json({message:error.message})
    }    
  }   

module.exports = {deleteBlog,deleteBlogQuery}
