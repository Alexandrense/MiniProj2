const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    name: String,
    group: String,
    description: String
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);