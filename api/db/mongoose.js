var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var connection = mongoose.connect(process.env.MONGODB_URI);
module.exports = { mongoose };