<template>
  <section class="right">
    <template v-for="year in Object.keys(archive).reverse()">
      <h1>{{ year }}</h1>
      <template v-for="month in Object.keys(archive[year]).reverse()">
        <ul>
        <li v-for="entry in archive[year][month]">
          <a :href="entry.permalink">{{ entry.title }}</a>
          <span class="timestamp"> · {{ entry.publishedText }}</span>
        </li>
        </ul>
      </template>
    </template>
  </section>
</template>

<script>
import head from '../head'
export default {
  asyncData ({ app }) {
    return {
      archive: app.$archive
    }
  },
  head: () => ({
    title: 'Hire Jonas Galvez',
    ...head
  })
}
</script>

<style src="./right.css" />
