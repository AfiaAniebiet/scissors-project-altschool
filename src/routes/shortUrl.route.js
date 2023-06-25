const express = require('express');
const router = express.Router();

const {
  getIndexPage,
  getRandomURLPage,
  getCustomURLPage,
  makeShortUrl,
  shortUrlRedirect,
  generateCustomUrl,
} = require('../controllers/shortUrl.controller');

router.get('/', getIndexPage);
router.get('/random-url', getRandomURLPage);
router.get('/custom-url', getCustomURLPage);
router.post('/short-url', makeShortUrl);
router.post('/custom-url', generateCustomUrl);
router.get('/:code', shortUrlRedirect);

module.exports = router;
