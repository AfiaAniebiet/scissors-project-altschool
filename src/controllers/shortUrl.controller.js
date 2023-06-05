const ShortUrl = require('../models/shortUrl.model');
const shortID = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const { StatusCodes } = require('http-status-codes');

const getIndexPage = function (req, res) {
  res.send('Index Page');
};

const makeShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    return res.status(StatusCodes.UNAUTHORIZED).json('Invalid url');
  }

  // creating the url code
  const urlCode = shortID.generate();

  // check the long url from req.body
  if (validUrl.isUri(longUrl)) {
    let url = await ShortUrl.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new ShortUrl({
        longUrl,
        urlCode,
        shortUrl,
      });

      await url.save();

      res.status(StatusCodes.OK).json(url);
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Long url does not exist.' });
  }
};

module.exports = {
  getIndexPage,
  makeShortUrl,
};
