const path = require('path');

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('express-async-errors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const shortUrlRoute = require('./routes/shortUrl.route');

// error Handling
const errorHandlerMiddleware = require('./middlewares/errorHandler.middleware');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', {
    page_title: 'Scissors App',
  });
});

// Define routes
app.use(limiter);
app.use(shortUrlRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
