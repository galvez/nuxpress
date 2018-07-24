
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
     path: '/:entrySlug(\\d{4}.+)',
     component: 'pages/entry.vue'
   },
   {
     name: 'page',
     path: '/:pageSlug(.+)',
     component: 'pages/page.vue'
   }
]
