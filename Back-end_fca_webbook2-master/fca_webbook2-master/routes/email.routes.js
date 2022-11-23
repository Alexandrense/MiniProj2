const express = require('express');
let router = express.Router();
const EmailController = require('../controllers/email.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');

router.route('/')
    .post([body('name').isString(),
        body('email').isEmail(),
        body('message').isString(),
        body('subject').isString(),
    ], EmailController.send);

module.exports = router;