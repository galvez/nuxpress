module.exports = [
   {
     name: 'index',
     path: '/',
     component: 'pages/index.vue'
   },
   {
     name: 'archive',
     path: '/archive',
     component: 'pages/archive.vue'
   },
   {
     name: 'entry',
     // Using `/` in that regex seems to mess up Nuxt's 
     // URL validator and you end up with a warning on the console.
     // As I workaround, I used .{1,3} to match either `/` or `%2f`
     path: '/:slug(\\d{4}.{1,3}\\w{3}.{1,3}\\d{2}.{1,3}.+)',
     component: 'pages/entry.vue'
   }
]
