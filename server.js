const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const path = require('path'); // declare a variable path
const fs = require('fs'); // import file system

const app = express(); // create instance of expression for the app

app.use(express.static(path.join(__dirname, 'src', 'views'))); // make path to the views folder
app.use(bodyParser.json()); // returns middleware that only parses json
app.use(bodyParser.urlencoded({extended: true})); // transform the string into an object

app.use((req, res, next) => {
    console.log(`Request: '${req.method}' for path: '${req.url}' at ${new Date()}`); // log the request, path and dates
    next(); 
});

const homeRoutes = require('./src/routes/home'); // initializing the path home 
const postRoutes = require('./src/routes/post'); // initializing the path post
const commentsRoutes = require('./src/routes/comments'); // initializing the path comments

app.use(homeRoutes); // using the homeRoutes
app.use(postRoutes); // using the postRoutes
app.use(commentsRoutes); // using the commentsRoutes

// create port and listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});