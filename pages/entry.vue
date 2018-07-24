<template>
  <section 
    class="right" 
    v-html="entry.html" />
</template>

<script>
import head from '../head'
export default {
  middleware: 'nuxpress',
  asyncData ({ params, app, error }) {
    if (app.$entry) {
      return { entry: app.$entry }
    }
    error({ statusCode: 404 })     
  },
  head () {
    return {
      ...head,
      title: this.entry.title,
      meta: head.meta.concat([
        { property: 'og:title', content: this.entry.title },
        { property: 'og:description', content: this.entry.summary },
        { property: 'og:image', content: this.entry.image },
        { property: 'og:site_name', content: this.entry.siteName },
        { property: 'og:type', content: 'article' },
        { property: 'og:article:published_time', content: this.entry.published },
        { property: 'og:locale', content: 'en_us' },
        { property: 'og:url', content: this.entry.permalink }
      ])
    }
  }
}
</script>

<style src="./right.css" />
