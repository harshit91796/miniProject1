const Author = require('../models/authorModel')
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const bcrypt = require('bcrypt');

const createAuthor =async (req,res)=>{
    try {
        const {fname,lname,title,email,password} = req.body;
        
        // if(!data) {
        //     return res.status(400).send({msg : 'author data is required'})
        // } 
        if(!fname){
            return res.status(400).send({msg : 'author first name is required'})
        }
        if(!lname){
            return res.status(400).send({msg : 'author last name is required'})
        }
        if(!email){
            return res.status(400).send({msg : 'author email is required'})
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return res.status(400).send({msg: 'Invalid email format'})
        }
        const existingAuthor = await Author.findOne({ email: email });
            if (existingAuthor) {
                return res.status(400).send({ msg: 'Email already exists'});
        }
        if(!password){
            return res.status(400).send({msg : 'author password is required'})
        }
        if(!title){
            return res.status(400).send({msg : 'author title is required'})
        }
        if (!['Mr', 'Mrs', 'Miss'].includes(title)) {
            return res.status(400).json({ error: 'Invalid title. Author title will only include - Mr, Mrs, Miss' });
        }
        const hashPass = await bcrypt.hash(password,10);
        const author = new Author({fname,lname,title,email,password:hashPass}); 
        const data = await author.save(); 
        res.status(201).send({data : data, msg : 'author is succesfully created'})
=======

// Create Author
const createAuthor = async (req,res) => {
    try {
        let data = req.body;

        if(!data) {
            return res.status(400).send({msg : 'author data is required'})
        } 
        if(!data.fname){
            return res.status(400).send({msg : 'author first name is required'})
        }
        if(!data.lname){
            return res.status(400).send({msg : 'author last name is required'})
        }
        if(!data.email){
            return res.status(400).send({msg : 'author email is required'})
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
            return res.status(400).send({msg: 'Invalid email format'})
        }
        const existingAuthor = await Author.findOne({ email: data.email });
        if(existingAuthor) {
                return res.status(400).send({ msg: 'Email already exists'});
        }
        if(!data.title){
            return res.status(400).send({msg : 'author title is required'})
        }
        if (!['Mr', 'Mrs', 'Miss'].includes(data.title)) {
            return res.status(400).json({ error: 'Invalid title. Author title will only include - Mr, Mrs, Miss' });
        }

        let createAuthor = await Author.create(req.body);
        res.status(201).send({
            status: true,
            msg : 'author is succesfully created',
            data : createAuthor, 
        })
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}

const login = async (req,res)=>{
    try {
        const user = await Author.findOne({email:req.body.email});
        const token = jwt.sign({userId:user._id.toString()}, 
          process.env.JWT_SECRET_KEY,{
                expiresIn:"1d"
            });
        res.setHeader("x-api-key", token);
        res.status(202).json({status:true,data:token})
>>>>>>> f644724b9ef766e96c14202a06c6d32c2f0e11cc
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