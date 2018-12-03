var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
//const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var UserInfo_Schema = new mongoose.Schema({
    
    line_userId: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    line_displayName:{
        type: String,
    },
    line_pictureUrl:{
        type: String,
    },
    line_statusMessege:{
        type: String,
    },
    latitude : {
        type: String,
    },
    longitude  : {
        type: String,
    },
    
    gender:{
        type: String,
    },

    age:{
        type: Number,
    },
    
    search_gender:{
        type: String,
    },

    search_distance_max:{
        type: Number,
    },
    search_age_max: {
        type: Number,
    },
    search_age_min: {
        type: Number,
    }
});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var UserInfo = mongoose.model('UserInfo', UserInfo_Schema);
module.exports = { UserInfo };

