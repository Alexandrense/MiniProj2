const UserLeveL = require("../models/userlevel.model");
const UserLevelMessages = require("../messages/userlevel.messages");
const {
    validationResult
} = require('express-validator');

exports.get = (req, res) => {

    UserLeveL.find(req.query, (error, levels) => {
        if (error) throw error;

        let message = UserLevelMessages.success.s2;

        if (levels.length < 0)
            message = UserLevelMessages.success.s4;

        message.body = levels;
        return res.status(message.http).send(message);
    });

}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    UserLeveL.findOne({
        _id: req.params.id
    }, (error, user_level) => {
        if (error) throw error;
        if (!user_level) return res.status(UserLevelMessages.error.e0.http).send(UserLevelMessages.error.e0);
        let message = UserLevelMessages.success.s2;
        message.body = user_level;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new UserLeveL({
        name: req.body.name,
        level: req.body.level,
        avatar: req.body.avatar,
        max: req.body.max
    }).save((error, user_level) => {
        if (error) throw error;

        let message = UserLevelMessages.success.s0;
        message.body = user_level;
        return res.header("location", "/users/levels/" + user_level._id).status(message.http).send(message);
    })

}

exports.update = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    UserLeveL.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, user_level) => {
        if (error) throw error;
        if (!user_level) return res.status(UserLevelMessages.error.e0.http).send(UserLevelMessages.error.e0);

        let message = UserLevelMessages.success.s1;
        message.body = user_level;
        return res.status(message.http).send(message);

    });

}

exports.delete = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    UserLeveL.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(UserLevelMessages.error.e0.http).send(UserLevelMessages.error.e0);

        return res.status(UserLevelMessages.success.s3.http).send(UserLevelMessages.success.s3);

    });

}