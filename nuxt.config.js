
 module.exports = {
    mode: 'universal',

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




 }