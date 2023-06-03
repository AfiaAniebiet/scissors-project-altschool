const express = require('express');
const router = express.Router();

const { getIndexPage, makeShortUrl } = require('../controllers/shortUrl.controller');

router.get('/short-url', getIndexPage);
router.post('/short-url', makeShortUrl);

module.exports = router;
