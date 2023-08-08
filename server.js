const express = require('express');
const app = express();

const homeRoutes = require('./src/routes/home');
const postRoutes = require('./src/routes/post');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(homeRoutes);
app.use(postRoutes);

app.listen(3000);