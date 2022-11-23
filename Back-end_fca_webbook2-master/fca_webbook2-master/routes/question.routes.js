const express = require('express');
let router = express.Router();
const QuestionController = require('../controllers/question.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, QuestionController.get)
    .post(AuthController.checkAuth, [body('question').isString(),
        body('title').isString(),
        body('description').isString(),
        body('type').isString(),
        body('group').isString(),
        body('level').isInt(),
        body('answers.*.title').isString(),
        body('answers.*.description').isString(),
        body('answers.*.correct').isBoolean()
    ], QuestionController.create)

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuestionController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuestionController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], QuestionController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuestionController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], QuestionController.delete);

module.exports = router;