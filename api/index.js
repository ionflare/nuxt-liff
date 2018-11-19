const express = require('express');
const app = express();

app.post('/testpost', (req,res)=>{
    
    //req.session.current_user = null;
    //res.send("xxx" );
    res.redirect("www.google.com");
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