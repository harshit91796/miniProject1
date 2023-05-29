const jwt = require('jsonwebtoken');
const Blog = require('../models/blogsModel');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('x-api-key');

    if (!token) {
        return res.status(401).json({
        success: false,
        message: 'No token provided'
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.authorId = decoded.authorId
    
    next();

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const authorize = async (req, res, next) => {
    try {
      const token = req.header('x-api-key');
  
      if (!token) {
          return res.status(401).json({
          success: false,
          message: 'No token provided'
          });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
  
      req.authorId = decoded.authorId
      let blogId = req.params.blogId
  
      const blog = await Blog.findOne({ _id: blogId });
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
  
      if (blog.authorId.toString() !== req.authorId) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized User! You are not the owner of this blog'
        });
      }
      
      next();
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };

  const createBlogAuth = (req, res, next) => {
    try {
        const token = req.header('x-api-key');
    
        if (!token) {
            return res.status(401).json({
            success: false,
            message: 'No token provided'
            });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
          return res.status(401).json({
            success: false,
            message: 'Invalid token'
          });
        }
    
        if(req.body.authorId !== decoded.authorId){
            return res.status(403).json({
                status: false,
                message: "Unauthorized access. You are not authorized to create a BLOG."
            })
        }
        
        next();
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}




// const auth2 = async(req,res,next)=>{
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         if(!token) return res.send({status:false,message:"token is requires!"});
//         const decoding = jwt.verify(token, "secret-key-for-login");
//         if(!decoding) return res.send({status:false,message:"Invalid token!"});
//         const theUser = await Author.findById(decoding.userId)
//         let id={}
//         if(req.params.blogId){
//             id = await Blog.findById(req.params.blogId)
//         }else if(req.query){
//             id = await Blog.findOne(req.query).select({authorId:1})
//         }
//          if(!id.authorId==theUser._id) return res.status(403).send({msg :"user unauthorized"})
        
//         next()
//     } catch (error) {
//         res.status(404).send({error:error.message});
//     }
// };

module.exports = { authenticate, authorize, createBlogAuth };
