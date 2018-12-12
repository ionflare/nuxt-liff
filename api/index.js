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
            res.send({result :"successed", msg: "No Error", info: alluser});
        }
     });
})


app.post('/getAvailableUser', (req,res)=>{
    FriendReq.find(
        {
             $or: [ { 'reqFromId': new ObjectId(req.body.currentUserId) }, 
                { 'reqToId': new ObjectId(req.body.currentUserId) } ] 
        } ).then((reqList)=>{ 
 
            //filter 
            res.send({result :"successed", msg: "No Error", info: reqList});

        });
    UserInfo.find({ 
        $or: [ { 'reqFromId': new ObjectId(req.body.currentUserId) }, 
                { 'reqToId': new ObjectId(req.body.currentUserId) } ] 
     }).then((alluser)=>{ 
        if(!alluser){
            res.send({result :"failed", msg: "Error!!", info: { }});
        }
        else
        {
            res.send({result :"successed", msg: "No Error", info: alluser});
        }
     });
})


app.post('/getRequestedListById', async(req,res)=>{
    try{
        let friendList = await FriendReq.find(
            { $or: [ { 'reqFromId': new ObjectId(req.body.currentUserId) }, 
                    { 'reqToId': new ObjectId(req.body.currentUserId) } ]  });
        let storeReqList = [req.body.currentUserId];    
        
        for(let i = 0; i< friendList.length; i++)
        {
            if(friendList[i].reqFromId == req.body.currentUserId)
            {  storeReqList.push( friendList[i].reqToId ); 
            }
            else
            {  storeReqList.push( friendList[i].reqFromId );
            } 
        }
        
        let availableUser = await UserInfo.find(
            { _id: { $nin: storeReqList }});
        let friendReq = await UserInfo.find(
                { _id: { $in: storeReqList }});
           
        res.send({result :"successed", msg: "No Error", info: {availableUser, friendReq}});           

    }
    catch(e)
    { res.send({result :"failed", msg: "Error", info: {e}}); }
    
})



app.post('/makeFriendReq', (req,res)=>{

    let newReq = new FriendReq({
        reqFromId : req.body.reqFromId,
        reqToId : req.body.reqToId,
        isInterested : req.body.isInterested,
        reqDate : Date.now()
    });

    newReq.save(function (err) {
        res.send({result :"successed"});
    });
})


app.get('/TestFriendReq', (req,res)=>{

    let newReq = new FriendReq({
        reqFromId : '5c0a518f7687954bdfe0a4e6',
        reqToId : '5c0a49437687954bdfe09228',
        isInterested : true,
        reqDate : Date.now()
    });

    newReq.save(function (err,results ) {
        res.send(results);
    });
})

app.get('/TestGetFriendReq', (req,res)=>{

    FriendReq.find(
        {
             $or: [ { 'reqFromId': new ObjectId('5c0a49437687954bdfe09228') }, 
                { 'reqToId': new ObjectId('5c0a49437687954bdfe09228') } ] 
        } 
    ).then((reqList)=>{ 
        res.send(reqList);
    })
});





module.exports = {
    path: '/api',
    handler: app
}