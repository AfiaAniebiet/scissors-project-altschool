const express = require('express');
const router = express.Router();

const { getIndexPage, makeShortUrl, shortUrlRedirect } = require('../controllers/shortUrl.controller');

router.get('/short-url', getIndexPage);
router.post('/short-url', makeShortUrl);
router.get('/:code', shortUrlRedirect);

module.exports = router;
