const express = require('express'); // import express
const router = express.Router(); // create instance of express router
const path = require('path'); // import path
const rootDir = require('../util/path'); // import rootDir

// create a route for the home page
router.get('/', (req, res, next) => {
    console.log('Sending home.html')
    res.sendFile(path.join(rootDir, 'src', 'views', 'home.html')); //route path
});

// create a route for the post page
router.get('/post', (req, res, next) => {
    console.log('Sending post.html')
    res.sendFile(path.join(rootDir, 'src', 'views', 'post.html')); //route path
});

module.exports = router;