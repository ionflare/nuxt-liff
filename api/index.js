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
        let reqRelateUser = await FriendReq.find(
            { $or: [ { 'reqFromId': new ObjectId(req.body.currentUserId) }, 
                    { 'reqToId': new ObjectId(req.body.currentUserId) } ]  });
        // storeAllReqList ignore whether users are interested or not            
        let storeAllReqList = [req.body.currentUserId];    
        let storeReqFromOtherUser =  [];    
        let storeMyReqList =  [];
        let storeRejectList =  [];
          
        for(let i = 0; i< reqRelateUser.length; i++)
        {
            if(reqRelateUser[i].reqFromId == req.body.currentUserId)
            {  storeAllReqList.push( reqRelateUser[i].reqToId ); 
                if(reqRelateUser[i].isInterested == true)
                {
                    storeMyReqList.push( reqRelateUser[i].reqToId ); 
                }
                else{
                    storeRejectList.push( reqRelateUser[i].reqToId ); 
                }
                
            }
            else
            {  storeAllReqList.push( reqRelateUser[i].reqFromId );
                if(reqRelateUser[i].isInterested == true)
                {
                    storeReqFromOtherUser.push( reqRelateUser[i].reqFromId );
                }
                else{
                    storeRejectList.push( reqRelateUser[i].reqFromId ); 
                }
            } 
        }
        
        //let storeMyFriendList =  [];    
        //find Isinterested intersection between users.
        let storeMyFriendList = storeMyReqList.filter(function(n) {
            return storeReqFromOtherUser.indexOf(n) > -1;
          });
        
        let storeFriendReq = storeReqFromOtherUser.filter(function(n) {
            return storeRejectList.indexOf(n) === -1;
          });
        
        storeFriendReq = storeFriendReq.filter(function(n) {
            return storeMyFriendList.indexOf(n) === -1;
          });
          
        let availableUser = await UserInfo.find(
            { _id: { $nin: storeAllReqList }});
        
        let friendReq = await UserInfo.find(
                { _id: { $in: storeFriendReq }});
        
        let friendList = await UserInfo.find(
            { _id: { $in: storeMyFriendList }});
        
                /*
        //find other user that current user is interested.
        let friendReq = await UserInfo.find(
            { _id: { $in: storeReqFromOtherUser }});
        */   
            
        res.send({result :"successed", msg: "No Error", info: {availableUser, friendReq , friendList}});           

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

app.post('/clearAllReq', (req,res)=>{

    FriendReq.remove({}, function (err) {
        if(err)
        {   res.send({result :"failed"}); }
        else 
        {   res.send({result :"successed"}); }
    });
});

app.get('/testAddFriendReq', async (req,res)=>{

    //dummy account will send req to incoming userId
    try{
        /*
        let dummyAccount = ["5c0a49437687954bdfe09228","5c0a49437687954bdfe09222",
        "5c0a49437687954bdfe09223","5c0a49437687954bdfe09224"];
        */
       /*
        var newReq1 = new FriendReq({
            reqFromId : '5c0a49437687954bdfe09228',
            reqToId :  req.params.userid,
            isInterested : true,
            reqDate : Date.now()
        });
        var newReq2 = new FriendReq({
            reqFromId : '5c0a49437687954bdfe09222',
            reqToId :  req.params.userid,
            isInterested : true,
            reqDate : Date.now()
        });
        var newReq3 = new FriendReq({
            reqFromId : '5c0a49437687954bdfe09223',
            reqToId :  req.params.userid,
            isInterested : true,
            reqDate : Date.now()
        });
        var newReq4 = new FriendReq({
            reqFromId : '5c0a49437687954bdfe09224',
            reqToId :  req.params.userid,
            isInterested : true,
            reqDate : Date.now()
        });
        */


       var query = {
            reqFromId : '5c0a49437687954bdfe09222',
            reqToId :  req.param('userid'),
       };
       var newData = {
            reqFromId : '5c0a49437687954bdfe09222',
            reqToId :   req.param('userid'),
            isInterested : true,
            reqDate : Date.now()
       };
       FriendReq.findOneAndUpdate(query, newData, {upsert:true
        , new: true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            
            res.send({result :"successed", msg: "No Error", info: {doc}});
        }
      
        });


        /*

        for(var i = 0;i< dummyAccount.count;i++)
        {  if(req.params.userid == dummyAccount[i])
            { continue; }
            var query = {};
            var newReq = await new FriendReq({
                reqFromId : dummyAccount[i],
                reqToId :  req.params.userid,
                isInterested : true,
                reqDate : Date.now()
            });
            await newReq.save();
        }
     
      
        res.send("Dummy accounts have sent Friend Req to userId : "+ req.params.userid);
        */
    }catch(e){
        res.send("Am error occured while pushing req!!");
    }
   
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