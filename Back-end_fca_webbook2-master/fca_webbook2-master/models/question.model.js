const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const questionSchema = new Schema({
    question: String,
    title: String,
    description: String,
    type: String,
    group: String,
    level: {
        type: Number,
        default: 0
    },
    answers: [{
        title: String,
        description: String,
        correct: Boolean
    }],
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    link: {
        types: String,
        url: String
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.question, questionSchema);