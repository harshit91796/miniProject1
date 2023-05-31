const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')


const route = require('./routes/route.js');

const app = express();

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://avenger:9179677895@cluster0.oh25cr9.mongodb.net/blogingSite?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: false})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});
