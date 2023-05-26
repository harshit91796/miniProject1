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
  
      const blog = await Blog.findOne({ _id: blogId, isDeleted: false });
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
  
      console.log(blog);
      console.log(req.authorId);
  
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

module.exports = { authenticate, authorize };
