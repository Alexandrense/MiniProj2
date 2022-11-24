const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, [body('name').isString(),
        body('group').isString(),
        body('description').isString(),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ExpertController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.delete);

module.exports = router;