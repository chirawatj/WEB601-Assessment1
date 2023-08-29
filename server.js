const express = require('express'); // declare a variable to hold the route
const app = express(); // create instant of expression for the app
const bodyParser = require('body-parser'); // create middleware
const path = require('path'); // declare a variable path

app.use(express.static(path.join(__dirname, 'src', 'views'))); // initializing the path

app.use((req, res, next) => {
    console.log(`Request: '${req.method}' for path: '${req.url}' at ${new Date()}`); // print the request, path and dates
    next(); 
});

app.use(bodyParser.urlencoded({extended: false})); // Returns middleware that only parses urlencoded using querystring

const homeRoutes = require('./src/routes/home'); // initializing the path home 
const postRoutes = require('./src/routes/post'); // initializing the path post

app.use(homeRoutes); // using the homeRoutes
app.use(postRoutes); // using the postRoutes

app.listen(3000, () => { // create port and listen on port 3000
    console.log('Server listening on port 3000');
});