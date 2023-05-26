const Author = require('../models/authorModel')
const jwt = require('jsonwebtoken');
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