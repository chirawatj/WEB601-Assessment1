const express = require('express'); // import express
const router = express.Router(); // create instance of express router
const path = require('path'); // import path
const rootDir = require('../util/path'); // import rootDir

// create a route for the home page
router.get('/', (req, res, next) => { 
    res.sendFile(path.join(rootDir, 'src', 'views', 'home.html')); //route path
});

module.exports = router;