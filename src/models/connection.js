const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect("mongodb+srv://avenger:9179677895@cluster0.oh25cr9.mongodb.net/blogingSite?retryWrites=true&w=majority").then(

    console.log('Database connected')
)