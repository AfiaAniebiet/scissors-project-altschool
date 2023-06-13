const express = require('express');
const router = express.Router();

const {
  getIndexPage,
  makeShortUrl,
  shortUrlRedirect,
  generateCustomUrl,
} = require('../controllers/shortUrl.controller');

router.get('/short-url', getIndexPage);
router.post('/short-url', makeShortUrl);
router.post('/custom-url', generateCustomUrl);
router.get('/:code', shortUrlRedirect);

module.exports = router;
