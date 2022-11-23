const Quiz = require('../models/quiz.model');
const {
    validationResult
} = require('express-validator');
const QuizMessages = require("../messages/quiz.messages");

exports.get = (req, res) => {

    Quiz.find(req.query).populate("questions").exec((error, quizzes) => {
        if (error) throw error;
        let message = QuizMessages.success.s2;

        if (quizzes.length < 0)
            message = QuizMessages.success.s5;

        message.body = quizzes;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Quiz({
        name: req.body.name,
        points: req.body.points,
        hidden: req.body.hidden,
        level: req.body.level,
        questions: req.body.questions
    }).save((error, quiz) => {
        if (error) throw error;
        quiz.populate("questions", (error) => {
            if (error) throw error;
            let message = QuizMessages.success.s0;
            message.body = quiz;
            return res.header("location", "/quizzes/" + quiz._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Quiz.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, quiz) => {
        if (error) throw error;
        if (!quiz) return res.status(QuizMessages.error.e0.http).send(QuizMessages.error.e0);
        quiz.populate("questions", (error) => {
            if (error) throw error;
            let message = QuizMessages.success.s1;
            message.body = quiz;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Quiz.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(QuizMessages.error.e0.http).send(QuizMessages.error.e0);
        return res.status(QuizMessages.success.s3.http).send(QuizMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Quiz.findOne({
        _id: req.params.id
    }).populate("questions").exec((error, quiz) => {
        if (error) throw error;
        if (!quiz) return res.status(QuizMessages.error.e0.http).send(QuizMessages.error.e0);
        let message = QuizMessages.success.s2;
        message.body = quiz;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Quiz.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(QuizMessages.error.e0.http).send(QuizMessages.error.e0);
        return res.status(QuizMessages.success.s6.http).send(QuizMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Quiz.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(QuizMessages.error.e0.http).send(QuizMessages.error.e0);
        return res.status(QuizMessages.success.s4.http).send(QuizMessages.success.s4);

    });
}