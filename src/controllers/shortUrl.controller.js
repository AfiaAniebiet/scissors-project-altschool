const ShortUrl = require('../models/shortUrl.model');

const getIndexPage = function (req, res) {
  res.send('Index Page');
};

const makeShortUrl = (req, res) => {
  const longUrl = req.body;
  if (!longUrl) {
    throw new Error({ msg: 'Enter a valid url to shorten' });
  }
};

module.exports = {
  getIndexPage,
  makeShortUrl,
};
