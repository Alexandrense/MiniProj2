const express = require('express');
let router = express.Router();
const UserLevelController = require('../controllers/userlevel.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post(AuthController.checkAuth, [body('name').isString(),
        body('level').isNumeric(),
        body('avatar').isString(),
        body('max').isNumeric()
    ], UserLevelController.create)
    .get(AuthController.checkAuth, UserLevelController.get);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], UserLevelController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], UserLevelController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], UserLevelController.delete);

module.exports = router;