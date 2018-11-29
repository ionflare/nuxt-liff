const express = require('express');
const app = express();

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { UserInfo } = require("./models/userInfo");

app.post('/app_login',async(req,res)=>{
    //req.session.kea = "sssfffxxx";
    var query = {'line_userId' : req.body.currentUser.line_userId};
    var newData = {
        'line_userId' : req.body.currentUser.line_userId,
        'line_displayName' : req.body.currentUser.line_displayName,
        'line_pictureUrl' : req.body.currentUser.line_pictureUrl,
        'line_statusMessege' : req.body.currentUser.line_statusMessege,
        'latitude' : req.body.currentUser.latitude,
        'longitude' : req.body.currentUser.longitude,
    }
    UserInfo.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            req.session.currentUser = req.body.currentUser;
            return res.send("succesfully saved");
        }
      
    });
})



 app.get('/testget', (req,res)=>{
    
    //req.session.current_user = null;
    res.send("xxx" );
    //res.redirect("www.google.com");
 })
 
module.exports = {
    path: '/api',
    handler: app
}