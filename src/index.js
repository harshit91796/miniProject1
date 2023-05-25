const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require("./routes/route")
const app = express()
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(`error: ${err}`);
});

app.use('/',routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})