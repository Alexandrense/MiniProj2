const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const AuthMessages = require("../messages/auth.messages");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.getInfo = (req, res) => {
    let message = AuthMessages.success.s1;
    message.body = req.user;
    return res.status(message.http).send(message);
}

exports.login = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    let username = req.body.username;
    let password = escape(req.body.password);

    User.findOne({
        "auth.username": username
    }, (error, user) => {
        if (error) throw error;

        if (!user || !bcrypt.compareSync(password, user.auth.password))
            return res.header("Authorization", null).status(AuthMessages.error.e0.http).send(AuthMessages.error.e0);

        let payload = {
            pk: user.auth.public_key
        }

        let options = {
            expiresIn: CONFIG.auth.expiration_time,
            issuer: CONFIG.auth.issuer
        };

        let token = JWT.sign(payload, user.auth.private_key, options);

        let message = AuthMessages.success.s0;
        message.body = user;
        return res.header("Authorization", token).status(message.http).send(message);

    });

}

exports.checkAuth = (req, res, callback) => {
    // return callback();
    let token = req.headers.authorization;
    if (!token) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

    let payload = JWT.decode(token);

    User.findOne({
        "auth.public_key": payload.pk
    }, (error, user) => {
        if (error) throw error;
        if (!user) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

        JWT.verify(token, user.auth.private_key, (error) => {
            if (error) return res.status(AuthMessages.error.e1.http).send(AuthMessages.error.e1);

            req.user = user;
            return callback();

        });

    });

};