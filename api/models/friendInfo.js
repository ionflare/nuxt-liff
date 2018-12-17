var mongoose = require("mongoose")
var Message = mongoose.model("Message", {
  //--From sender
  from_UserId: { type: String, require: true },
  //from_UserId: { type: mongoose.Schema.Types.ObjectId, require: true },
  // lineuserid: { type: String, required: true }, //r
  //fromusername: { type: String, required: false },

  //--To receiver
  to_UserId: { type: String, require: true },
  //to_UserId: { type: mongoose.Schema.Types.ObjectId, require: true },
  //tousername: { type: String, required: false },

  //--Message
  //sender: { type: String, required: true }, // [user , notice,etc ]
  type: { type: String, required: true }, // [message_web, LINE_MSG]
  text: { type: String, required: false }, //type==message only
  // messageobj: { type: Object, require: false }, //Hole message {type,source,message...}

  //-- lastupdate
  lastupdate: { type: Date, default: Date.now }
})
module.exports = { Message }