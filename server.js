const express = require('express')
// require('./src/models/connection')
const dotenv = require('dotenv')
const routes = require("./src/routes/routes")
const app = express()
dotenv.config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI).then(

    console.log('Database connected')
).catch(err => console.log(err.message))

app.use(express.json())

app.use('/',routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server is on ${PORT}`)
})