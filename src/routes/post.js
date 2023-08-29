const express = require('express'); // declare a variable to hold the route
const router = express.Router();

const path = require('path');
const rootDir = require('../util/path');

router.get('/', (req, res, next) => { 
    res.sendFile(path.join(rootDir, 'src', 'views', 'post.html')); //route path
});

module.exports = router;