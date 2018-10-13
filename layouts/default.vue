<template>
  <div class="wrapper">
    <left-column />
    <nuxt />
  </div>
</template>

<script>
import LeftColumn from '~/components/LeftColumn'
export default {
  components: { LeftColumn }
}
</script>

<style>
body {
  position: relative;
  background: #2F4858;
  min-width: 1280px;
  max-width: 1400px;
  margin: 0 auto;
}
.wrapper {
  display: flex;
  flex: 1;
  width: 100%;
}
a, a:active, a:visited {
  color: #F6AE2D;
  font-weight: 900;
  text-decoration: none;
}
a:hover {
  color: #F6AE2D !important;
}
b {
  font-weight: 400 !important;
}
section {
  color: #DEC1FF;
  font-family: 'Fira Sans';
  font-weight: 300;
  letter-spacing: 0px;
}
</style>