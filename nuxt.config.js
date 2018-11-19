

/*
 // setBaseURL
var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  //var API_URL='http://localhost:3000' //blank: localhost:3000
  var API_URL= 'https://3c9df73438794ae49a6a317ae2eeb187.vfs.cloud9.ap-southeast-1.amazonaws.com'
  
}
else{
  var API_URL=process.env.HEROKU_URL
}
*/
 
 
 module.exports = {
    mode: 'universal',
    serverMiddleware:[
      /*
      bodyParser.json(),
      session({
        secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie            : {
          // maxAge : 1000 * 60 * 60 * 24 * 30, // 30日
          maxAge : 1000 * 60 * 60, // 60min
      }
      }),
      */
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
 }