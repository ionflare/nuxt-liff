var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
//const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var User_Schema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },

    firstname:{
        type: String,

    },
 
});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var User= mongoose.model('User', User_Schema);
module.exports = { User };

