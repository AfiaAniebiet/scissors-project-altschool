const path = require('path');

const express = require('express');
const cors = require('cors');
require('express-async-errors');

const shortUrlRoute = require('./routes/shortUrl.route');

const app = express();

// setting up ejs
app.set('views', 'ejs');
app.set('views', 'views');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './', 'public')));

// Define routes
app.use(shortUrlRoute);

module.exports = app;
