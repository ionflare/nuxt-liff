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
    UserInfo.findOneAndUpdate(query, newData, {upsert:true ,
        new: true }, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            req.session.currentUser = doc;
            return res.send("succesfully saved");
        }
      
    });
})

app.post('/update_profile',async(req,res)=>{
    //req.session.kea = "sssfffxxx";
    var query = {'line_userId' : req.body.currentUser.line_userId};
    var newData = {
        'line_userId' : req.body.currentUser.line_userId,
        'line_displayName' : req.body.currentUser.line_displayName,
        'line_pictureUrl' : req.body.currentUser.line_pictureUrl,
        'line_statusMessege' : req.body.currentUser.line_statusMessege,
        'latitude' : req.body.currentUser.latitude,
        'longitude' : req.body.currentUser.longitude,
        'gender' : req.body.currentUser.gender,
        'age' : req.body.currentUser.age,
    }
    UserInfo.findOneAndUpdate(query, newData, {upsert:true
        , new: true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            req.session.currentUser = doc;
            //return res.send("succesfully saved");
            res.send({result :"successed", msg: "No Error", info: {doc}});
        }
      
    });
})


app.post('/update_settings',async(req,res)=>{
    //req.session.kea = "sssfffxxx";
    var query = {'line_userId' : req.body.currentUser.line_userId};
    var newData = {
        'line_userId' : req.body.currentUser.line_userId,
        'search_gender' : req.body.currentUser.search_gender,
        'search_distance_max' : req.body.currentUser.search_distance_max,
        'search_age_min' : req.body.currentUser.search_age_min,
        'search_age_max' : req.body.currentUser.search_age_max, 
    }
    UserInfo.findOneAndUpdate(query, newData, {upsert:true
        , new: true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            req.session.currentUser = doc;
            //return res.send("succesfully saved");
            res.send({result :"successed", msg: "No Error", info: {doc}});
        }
      
    });
})





 app.get('/getCurrentUserInfo', (req,res)=>{
    var query = {'line_userId' : req.body.currentUser.line_userId};
    UserInfo.findOne({
        query
     }).then((user)=>{ 
        if(!user)
        {
            res.send({result :"failed", msg: "Error!!", info: { }});
        }
        else
        {
            res.send({result :"successed", msg: "No Error", info: {user}});
        }
     });
})

app.post('/getOtherUserInfo', (req,res)=>{

    UserInfo.find({ 
        //findall
     }).then((alluser)=>{ 
        if(!alluser){
            res.send({result :"failed", msg: "Error!!", info: { }});
        }
        else
        {
            res.send({result :"successed", msg: "No Error", info: {alluser}});
        }
     });
})


module.exports = {
    path: '/api',
    handler: app
}