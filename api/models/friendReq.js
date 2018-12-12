var mongoose = require('mongoose');
//var autoIncrement = require ('mongoose-auto-increment');
//const _ = require("lodash");
//const validator = require("validator");
//const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");


var FriendReq_Schema = new mongoose.Schema({
    
    
    reqFromId: {
        type: String,
    },
    reqToId:{
        type: String,
    },
    isInterested:{
        type: Boolean,
    },
    reqDate:{
        type: Date,
    },
});

//User_Schema.plugin(autoIncrement.plugin, 'User');    
var FriendReq = mongoose.model('friendReq', FriendReq_Schema);
module.exports = { FriendReq };

