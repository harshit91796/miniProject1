const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');
const bcrypt = require('bcrypt');

const auth = async (req,res)=>{
    const {email,password} = req.body;
    const user = await Author.findOne({email:email});
    console.log(user)
    if(!user) return res.status(404).send("invalid user!");
    const hashPass = await bcrypt.compare(password,user.password);
    if(hashPass===true){
          const token = jwt.sign({userId:user._id.toString()}, "secret-key",{
                expiresIn:"3d"
            });
        res.setHeader("x-api-key", token);
        res.status(202).json({status:true,data:token})};
    };
    
    
    module.exports = {auth};