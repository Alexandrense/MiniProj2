const Question = require('../models/question.model');
const {
    validationResult
} = require('express-validator');
const QuestionMessages = require("../messages/question.messages");
const Quiz = require("../models/quiz.model");

exports.get = (req, res) => {
    Question.find(req.query, (error, questions) => {
        if (error) throw error;
        let message = QuestionMessages.success.s2;

        if (questions.length < 0)
            message = QuestionMessages.success.s5;

        message.body = questions;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Question({
        question: req.body.question,
        group: req.body.group,
        type: req.body.type,
        description: req.body.description,
        title: req.body.title,
        answers: req.body.answers,
        level: req.body.level
    }).save((error, question) => {
        if (error) throw error;
        let message = QuestionMessages.success.s0;
        message.body = question;
        return res.header("location", "/questions/" + question._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Question.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, question) => {
        if (error) throw error;
        if (!question) return res.status(QuestionMessages.error.e0.http).send(QuestionMessages.error.e0);

        let message = QuestionMessages.success.s1;
        message.body = question;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Question.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(QuestionMessages.error.e0.http).send(QuestionMessages.error.e0);

        Quiz.updateMany({}, {
            $pull: {
                questions: req.params.id
            }
        }, (error) => {
            if (error) throw error;
            return res.status(QuestionMessages.success.s3.http).send(QuestionMessages.success.s3);
        });
    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Question.findOne({
        _id: req.params.id
    }, (error, question) => {
        if (error) throw error;
        if (!question) return res.status(QuestionMessages.error.e0.http).send(QuestionMessages.error.e0);
        let message = QuestionMessages.success.s2;
        message.body = question;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Question.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(QuestionMessages.error.e0.http).send(QuestionMessages.error.e0);
        return res.status(QuestionMessages.success.s6.http).send(QuestionMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Question.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(QuestionMessages.error.e0.http).send(QuestionMessages.error.e0);
        return res.status(QuestionMessages.success.s4.http).send(QuestionMessages.success.s4);

    });
}