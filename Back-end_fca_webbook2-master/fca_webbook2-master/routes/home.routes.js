const express = require('express');
let router = express.Router();
const HomeController = require('../controllers/home.controller');

router.route('/')
    .get(HomeController.get);

module.exports = router;