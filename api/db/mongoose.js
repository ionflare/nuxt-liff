var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var connection = mongoose.connect(process.env.MONGODB_URI);
//var connection = mongoose.connect('mongodb://chanon:chanon1234@ds015398.mlab.com:15398/nuxt-liff-datingapp');


module.exports = { mongoose };