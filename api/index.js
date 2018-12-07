const express = require('express');
const app = express();

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { UserInfo } = require("./models/userInfo");
const { FriendInfo } = require("./models/friendInfo");
const { FriendReq } = require("./models/friendReq");

app.post('/app_login',async(req,res)=>{
    //req.session.kea = "sssfffxxx";
    
    let query = {
        'ext_userId' : req.body.currentUser.ext_userId,
        'loginMethod' : req.body.currentUser.loginMethod
        };
        
    let newData = {};
    if (req.body.currentUser.ext_displayName != "")
    { newData.ext_displayName = req.body.currentUser.ext_displayName;}
    if (req.body.currentUser.ext_pictureUrl != "")
    { newData.ext_pictureUrl = req.body.currentUser.ext_pictureUrl;}
    if (req.body.currentUser.ext_statusMessege != "")
    { newData.ext_statusMessege = req.body.currentUser.ext_statusMessege;}
    if (req.body.currentUser.latitude != "")
    { newData.latitude = req.body.currentUser.latitude;}
    if (req.body.currentUser.longitude != "")
    { newData.longitude = req.body.currentUser.longitude;}
    
    /*
    let newData = {
   
        'ext_displayName' : req.body.currentUser.ext_displayName,
        'ext_pictureUrl' : req.body.currentUser.ext_pictureUrl,
        'ext_statusMessege' : req.body.currentUser.ext_statusMessege,
        'latitude' : req.body.currentUser.latitude,
        'longitude' : req.body.currentUser.longitude,
    }
    */
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
    var query = { '_id': new ObjectId(req.body.currentUser._id) };
    var newData = {
        'ext_displayName' : req.body.currentUser.ext_displayName,
        'ext_pictureUrl' : req.body.currentUser.ext_displayName,
        'ext_statusMessege' : req.body.currentUser.ext_statusMessege,
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
    var query = { '_id': new ObjectId(req.body.currentUser._id) };
    var newData = {
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

app.post('/getAllUserInfo', (req,res)=>{

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

app.post('/makeFriendReq', (req,res)=>{

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