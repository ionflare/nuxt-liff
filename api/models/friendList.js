var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
//const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var FriendList_Schema = new mongoose.Schema({
    
    user_1_id: {
        type: String,
    },
    user_2_id: {
        type: String,
    },
    lastUpdate:{
        type: Date,
    },

});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var FriendList = mongoose.model('friendList', FriendList_Schema);
module.exports = { FriendList };
