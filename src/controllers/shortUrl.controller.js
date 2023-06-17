const ShortUrlSchema = require('../models/shortUrl.model');
const shortID = require('shortid');
const validUrl = require('valid-url');
const config = require('config');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const Cache = require('../../config/redis_connect');

const getRandomURLPage = function (req, res) {
  res.render('random-url', {
    page_title: 'Random URL',
  });
};

const getCustomURLPage = function (req, res) {
  res.render('custom-url', {
    page_title: 'Custom URL',
  });
};

// algorithm to generate short url using shortid package
const makeShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    throw new CustomError.NotFoundError('This url is invalid. Try another one.');
  }

  // generating the url code from shortid
  const urlCode = shortID.generate();

  // check if the long url from req.body is a valid url
  if (validUrl.isUri(longUrl)) {
    let url = await ShortUrlSchema.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new ShortUrlSchema({
        longUrl,
        urlCode,
        shortUrl,
      });

      await url.save();

      res.status(StatusCodes.OK).json({ url });
    }
  } else {
    throw new CustomError.NotFoundError('The long URL does not exist.');
  }
};

// algorithm to create custom url
const generateCustomUrl = async (req, res) => {
  const { longUrl, code } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) {
    throw new CustomError.NotFoundError('Oops! This url does not exist.');
  }

  // check if long url from req.body is valid url
  if (!validUrl.isUri(longUrl)) {
    throw new CustomError.BadRequestError('Invalid url. Try another one.');
  }

  // check if customCode exists in database
  let url = await ShortUrlSchema.findOne({ urlCode: code });
  if (url) {
    throw new CustomError.BadRequestError(`Custom Url code ${url.urlCode} already exists. `);
  }

  const shortUrl = `${baseUrl}/${code}`;

  url = new ShortUrlSchema({
    longUrl,
    shortUrl,
    urlCode: code,
  });

  await url.save();

  res.render('post-custom-url', {
    page_title: 'Custom URL',
    display_url: `${url.shortUrl}`,
  });
};

// function to redirect generated short url to the long url
const shortUrlRedirect = async function (req, res) {
  const code = req.params.code;

  const cacheKey = `urlCode: ${code}`;

  const cachedUrl = await Cache.redis.get(cacheKey);

  if (cachedUrl) {
    return res.redirect(cachedUrl);
  }

  const url = await ShortUrlSchema.findOne({ urlCode: code });

  // cache miss
  Cache.redis.set(cacheKey, url.longUrl);

  if (!url) {
    throw new CustomError.NotFoundError('The url does not exist.');
  }

  url.visits += 1;
  await url.save();

  return res.redirect(url.longUrl);
};

module.exports = {
  getRandomURLPage,
  getCustomURLPage,
  makeShortUrl,
  generateCustomUrl,
  shortUrlRedirect,
};
