const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const userLevelSchema = new Schema({
    level: Number,
    name: String,
    avatar: String,
    max: Number
});


module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.user_levels, userLevelSchema);