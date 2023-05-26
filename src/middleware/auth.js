const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');
const bcrypt = require('bcrypt');

const auth = async (req,res)=>{
    const {email,password} = req.body;
    const user = await Author.findOne({email:email});
    if(!user) return res.status(404).send("invalid user!");
    const hashPass = await bcrypt.compare(password,user.password);
    if(hashPass===true){
          const token = jwt.sign({userId:user._id.toString()}, "secret-key",{
                expiresIn:"3d"
            });
        res.setHeader("x-api-key", token);
        res.status(202).json({status:true,data:token})};
        next()
    };
    
    const auth2 = async(req,res,next)=>{
        try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return ressend({status:false,message:"invalid token!"});
        const decoding = jwt.verify(token, "secret-key");
        const theUser = await Author.findById(decoding._id);
        req.Author = theUser;
        next()
        } catch (error) {
        res.status(404).send({error:error.message});
        }
    };
    
    module.exports = {auth,auth2};