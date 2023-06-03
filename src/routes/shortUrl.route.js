const express = require('express');
const router = express.Router();

const { getIndexPage } = require('../controllers/shortUrl.controller');

router.get('/', getIndexPage);

module.exports = router;
