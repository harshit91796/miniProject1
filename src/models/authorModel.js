const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
        fname : {
            type : String,
            required : true
        },
        lname : {
            type : String,
            required : true
        },
        title : {
            type : String,
            required : true,
            enum : ["Mr", "Mrs", "Miss"]
        },
        email : {
            type : String,
            required : true,
            unique : true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        password : {
            type : String,
            required : true,
           
        },

},{timestamps : true})

const Author = mongoose.model("Author",authorSchema);

module.exports = Author;