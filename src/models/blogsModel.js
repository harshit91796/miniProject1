const mongoose = require('mongoose');
const author = require("./authorModel")

const blogSchema = new mongoose.Schema({    
        title : {
            type : String,
            required : true
        },
        body : {
            type : String,
            required : true
        },
        authorId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Author",
            required : true,
        },
        tags : {
            type : [String],
            required : true
        },
        category : {
            type : String,
            required : true,
           
        },
        subcategory : {
            type : [String],
            required : true
        },
        deletedAt : {
            type : Date,
        },
        isDeleted : {
            type : Boolean,
            default : false
        },
        publishedAt : {
            type : Date,
        },
        isPublished : {
            type : Boolean,
            default : false
        },

},{timestamps : true})

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;

