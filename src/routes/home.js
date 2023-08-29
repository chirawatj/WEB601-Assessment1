const express = require('express'); // declare a variable to hold the route
const router = express.Router();

const path = require('path');
const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    console.log('Sending home.html')
    res.sendFile(path.join(rootDir, 'src', 'views', 'home.html')); //route path
});

router.get('/post', (req, res, next) => {
    console.log('Sending post.html')
    res.sendFile(path.join(rootDir, 'src', 'views', 'post.html')); //route path
});

module.exports = router;