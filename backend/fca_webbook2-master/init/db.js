module.exports = (app, callback) => {
    const CONFIG = require('../config/config');
    //Connect to DB
    const mongoose = require('mongoose');
    let settings = {
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, (error) => {
        if (error) throw error;
        console.log('---Connected to DB');
        return callback();
    })

}