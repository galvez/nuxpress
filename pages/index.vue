<template>
  <section class="right">
    <template v-for="entry in entries">
	    <h1><a :href="entry.permalink">{{ entry.title }}</a>
        <span class="timestamp"> · {{ entry.publishedText }}</span></h1>
      <blockquote v-html="entry.summary" />
    </template>
  </section>
</template>

<script>
import head from '../head'
export default {
  asyncData ({ app }) {
    return {
      entries: app.$entries
    }
  },
  head: () => ({
    title: 'Hire Jonas Galvez',
    ...head
  })
}
</script>

<style src="./right.css" />
