var mongoose = require('mongoose');
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
