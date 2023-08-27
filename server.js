const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'src', 'views')));

app.use((req, res, next) => {
    console.log(`Request: '${req.method}' for path: '${req.url}' at ${new Date()}`);
    next(); 
});

app.use(bodyParser.urlencoded({extended: false}));

const homeRoutes = require('./src/routes/home');
const postRoutes = require('./src/routes/post');

app.use(homeRoutes);
app.use(postRoutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});