<template>
  <section 
    class="right" 
    v-html="article.html" />
</template>

<script>
import head from '../head'
export default {
  asyncData ({ params, app }) {
    return {
      article: app.$permalinks[params.slug]
    }
  },
  head () {
    return {
      ...head,
      title: this.article.title,
      meta: head.meta.concat([
        { property: 'og:title', content: this.article.title },
        { property: 'og:description', content: this.article.summary },
        { property: 'og:image', content: this.article.image },
        { property: 'og:site_name', content: this.article.siteName },
        { property: 'og:type', content: 'article' },
        { property: 'og:article:published_time', content: this.article.published },
        { property: 'og:locale', content: 'en_us' },
        { property: 'og:url', content: this.article.permalink }
      ])
    }
  }
}
</script>

<style src="./right.css" />
