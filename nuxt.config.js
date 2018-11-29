require("dotenv").config();
const bodyParser = require('body-parser')
const session = require('express-session')

 // setBaseURL
var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  var API_URL='http://localhost:3000' //blank: localhost:3000
}
else{
  var API_URL=process.env.HEROKU_URL
}

 
 
 module.exports = {
    mode: 'universal',
    serverMiddleware:[
      
      bodyParser.json(),
      session({
        secret: 'test',
        resave: false,
        saveUninitialized: false,
        cookie            : {
          // maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
          maxAge : 1000 * 60 * 60, // 60min
      }
      }),
      
      '~/api'
      
    ],
    head: {
        title: 'cc-line-nuxt',
        script: [
            {  src: 'https://d.line-scdn.net/liff/1.0/sdk.js'},
          ],
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: 'line booking app using nuxt' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel:  'stylesheet', href:'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
        ]
      },
      modules: [
       
        '@nuxtjs/axios',
        '@nuxtjs/vuetify',
      
      ],
      axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: API_URL
      },
 }