const Author = require('../models/authorModel')
const bcrypt = require('bcrypt');

const createAuthor =async (req,res)=>{
    try {
        const {fname,lname,title,email,password} = req.body;
        const hashPass = await bcrypt.hash(password,10);
        const author = await Author({fname,lname,title,email,password:hashPass});
        const data = await author.save(); 
        res.status(201).send({data : data, msg : 'author is succesfully created'})
    } catch (error) {
        res.status(404).send({msg : error.message})
    }
};

const login = async (req,res)=>{
    try {
        const data = req.body;
        const user = await Author.find(data);
        res.status(201).send({msg : 'login successfully',data : user })
    } catch (error) {
        res.status(404).send({msg : error.message})
    }
}



module.exports = {createAuthor,login}