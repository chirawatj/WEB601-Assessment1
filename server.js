const express = require('express'); // import express
const bodyParser = require('body-parser'); // import body-parser
const path = require('path'); // declare a variable path

const app = express(); // create instance of expression for the app

app.use(express.static(path.join(__dirname, 'src', 'views'))); // make path to the views folder

app.use((req, res, next) => {
    console.log(`Request: '${req.method}' for path: '${req.url}' at ${new Date()}`); // log the request, path and dates
    next(); 
});

app.use(bodyParser.urlencoded({extended: false})); // returns middleware that only parses urlencoded using querystring

const homeRoutes = require('./src/routes/home'); // initializing the path home 
const postRoutes = require('./src/routes/post'); // initializing the path post

app.use(homeRoutes); // using the homeRoutes
app.use(postRoutes); // using the postRoutes

// create port and listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});