const Animal = require('../models/animal.model');
const {
    validationResult
} = require('express-validator');
const AnimalMessages = require("../messages/animal.messages");

exports.get = (req, res) => {

    Animal.find(req.query).populate("comments.user", "name").exec((error, animals) => {
        if (error) throw error;

        let message = AnimalMessages.success.s2;

        if (animals.length < 0)
            message = AnimalMessages.success.s5;

        message.body = animals;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Animal({
        name: req.body.name,
        group: req.body.group,
        description: req.body.description,
        level: req.body.level,
        links: req.body.links
    }).save((error, animal) => {
        if (error) throw error;
        let message = AnimalMessages.success.s0;
        message.body = animal;
        return res.header("location", "/animals/" + animal._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Animal.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, animal) => {
        if (error) throw error;
        if (!animal) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);

        let message = AnimalMessages.success.s1;
        message.body = animal;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Animal.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s3.http).send(AnimalMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Animal.findOne({
        _id: req.params.id
    }).populate("comments.user", "name").exec((error, animal) => {
        if (error) throw error;
        if (!animal) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        let message = AnimalMessages.success.s2;
        message.body = animal;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Animal.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s6.http).send(AnimalMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Animal.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s4.http).send(AnimalMessages.success.s4);

    });
}