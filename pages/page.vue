<template>
  <section 
    class="right" 
    v-html="page" />
</template>

<script>
import head from '../head'
export default {
  head,
  asyncData ({ params, app, error }) {
    if (app.$page) {
      return {
        title: app.$title,
        slug: params.pageSlug,
        page: app.$page
      }
    }
    error({ statusCode: 404 })     
  },
  middleware: 'nuxpress',
  head () {
    return {
      ...head,
      title: this.title,
      meta: head.meta.concat([
        { property: 'og:title', content: this.title },
        { property: 'og:url', content: `/${this.slug}` }
      ])
    }
  }
}
</script>

<style src="./right.css" />
