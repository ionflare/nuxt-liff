const express = require('express');
const app = express();

const ObjectId = require('mongoose').Types.ObjectId; 
const { mongoose } = require('./db/mongoose');
const { UserInfo } = require("./models/userInfo");
const { FriendInfo } = require("./models/friendInfo");
const { FriendReq } = require("./models/friendReq");
const { FriendList } = require("./models/friendList");
const { Message } = require("./models/message");
const line_login = require("line-login"); //module

const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
    prompt: "consent" // 追加
});


app.post('/app_login',async(req,res)=>{
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
    
    UserInfo.findOneAndUpdate(query, newData, {upsert:true ,
        new: true }, function(err, doc){
        if (err) return res.send(500, { error: err });
        else{
            req.session.currentUser = doc;
            return res.send("succesfully saved");
        }
      
    });
})

app.get("/onLinelogin",async(req,res)=>{
    req.session.latitude = req.param('latitude');
    req.session.longitude = req.param('longitude');
    res.redirect("./auth");
});

app.get("/auth", login.auth());


app.get("/callback", login.callback(async (req, res, next, token_response) => {

    let query = {
        'ext_userId' : token_response.id_token.sub,
        'loginMethod' : "line"
        };
        
    let newData ={
        ext_pictureUrl : token_response.id_token.name,
        ext_pictureUrl :   token_response.id_token.picture,
        latitude :  req.session.latitude,
        longitude : req.session.longitude,
    
    };
   try
   {
        _userinfo = await UserInfo.findOneAndUpdate(query, newData, {upsert:true , new: true });
        req.session.currentUser = _userinfo;
        res.redirect('../main');
   }
   catch(err)
   {
        res.send(err);
   }
}));

app.post('/update_profile',async(req,res)=>{
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
            res.send({result :"successed", msg: "No Error", info: {doc}});
        }
      
    });
})


app.post('/update_settings',async(req,res)=>{
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




app.post('/getRequestedListById_V1', async(req,res)=>{
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
        res.send({result :"successed", msg: "No Error", info: {availableUser, friendReq , friendList}});           
        
    }
    catch(e)
    { res.send({result :"failed", msg: "Error", info: {e}}); }
    
})

app.post('/getRequestedListById', async(req,res)=>{
    try{

        //find my friend
        let _myFriendList = await FriendList.find(
            { $or: [ { 'user_1_id': req.body.currentUserId }, 
                     { 'user_2_id': req.body.currentUserId} ]  });
        let _myFriend_arr =  [];
        for(let i = 0; i< _myFriendList.length; i++)
        {
            if(_myFriendList[i].user_1_id == req.body.currentUserId)
            {
                _myFriend_arr.push( _myFriendList[i].user_2_id ); 
            }else{ _myFriend_arr.push( _myFriendList[i].user_1_id );  }
        }
        let friendList = await UserInfo.find(
            { _id: { $in: _myFriend_arr }});

            
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
                    //storeMyReqList.push( reqRelateUser[i].reqToId ); 
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
        
        let storeFriendReq = storeReqFromOtherUser.filter(function(n) {
            return storeRejectList.indexOf(n) === -1;
          });
    
          
        let availableUser = await UserInfo.find(
            { _id: { $nin: storeAllReqList }});
        
        let friendReq = await UserInfo.find(
                //{ _id: { $in: storeFriendReq }}
                { $and: [ { _id: { $in: storeFriendReq } }, 
                    { _id: { $nin: _myFriend_arr } } ] 
                });
        
                /*
        let friendList = await UserInfo.find(
            { _id: { $in: storeMyFriendList }});
            */
        res.send({result :"successed", msg: "No Error", info: {availableUser, friendReq , friendList}});           
        
    }
    catch(e)
    { res.send({result :"failed", msg: "Error", info: {e}}); }
    
})

app.post('/sendMessage', async (req,res)=>{

    let newMsg = new Message({
        from_UserId : req.body.from_UserId,
        to_UserId : req.body.to_UserId,
        type : req.body.type,
        text : req.body.text,
        reqDate : Date.now()
    });

    try
    {
        let msgRes = await newMsg.save();
        res.send({result :"successed", info : msgRes} );
    }
    catch(err)
    {
        res.send({result :"failed"});
    }
    
    
})


app.post('/getMeseage', async (req,res)=>{
    try
    {
        let allMsg = await Message.find({ 
            $or : [
                {
                    $and: [ 
                    { 'from_UserId': req.body.user_1 }, 
                    { 'to_UserId': req.body.user_2 } 
                    ]
                },
                {
                    $and: [ 
                    { 'from_UserId': req.body.user_2 }, 
                    { 'to_UserId': req.body.user_1 } 
                    ]
                },
                ]
        });
        res.send({result :"successed",info : allMsg});
    }
    catch(err)
    {
        res.send({result :"failed"});
    }
    
    
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

app.post('/creFriend', async (req,res)=>{

    try{
        //create Req 
        let newReq = await new FriendReq({
            reqFromId : req.body.reqFromId,
            reqToId : req.body.reqToId,
            isInterested : req.body.isInterested,
            reqDate : Date.now()
        });
        await newReq.save();

        //create new Friend List
        let newData = {
            user_1_id : req.body.reqFromId,
            user_2_id : req.body.reqToId,
            lastUpdate : Date.now()
        }
        let _newFriendList = await FriendList.findOneAndUpdate(
        {  //search for existed friend list then update it.
            $or : [
                {
                    $and: [ 
                    { 'user_1_id': req.body.reqFromId }, 
                    { 'user_2_id': req.body.reqToId } 
                    ]
                },
                {
                    $and: [ 
                    { 'user_1_id': req.body.reqToId }, 
                    { 'user_2_id': req.body.reqFromId } 
                    ]
                },
        ]}, newData, {upsert:true, new: true});
          res.send({result :"successed"});
    }catch(err){
         res.send(err);
    }

})

app.post('/clearAllReq', async (req,res)=>{

    try{
        await FriendReq.remove({});
        await FriendList.remove({});
        await Message.remove({});
        res.send({result :"successed"});
    }
    catch(err)
    {
        res.send(err);
    }
   
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