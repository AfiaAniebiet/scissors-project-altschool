const ShortUrl = require('../models/shortUrl.model');
const shortid = require('shortid');

const getIndexPage = function (req, res) {
  res.send('Index Page');
};

const makeShortUrl = (req, res) => {
  const shortID = shortid.generate;
};

module.exports = {
  getIndexPage,
};
