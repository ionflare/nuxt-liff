var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
//const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var FriendInfo_Schema = new mongoose.Schema({
    
    
    currentUserId: {
        type: String,
    },
    friendId:{
        type: String,
    },
    friendDisplayName:{
        type: String,
    },
    friendAge:{
        type: String,
    },
    friendGender:{
        type: String,
    },
    acceptpDate:{
        type: String,
    },
});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var FriendInfo = mongoose.model('friendInfo', FriendInfo_Schema);
module.exports = { FriendInfo };
