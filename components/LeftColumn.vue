<template>
  <section class="left">
    <div class="sidebar">
      <a href="http://hire.jonasgalvez.com.br">
        <img class="avatar" src="/avatar.jpg">
      </a>
      <a href="http://github.com/galvez">
        <img class="icon" src="~/assets/icons/github.svg">
      </a>
      <a href="http://linkedin.com/in/jonasgalvez">
        <img class="icon" src="~/assets/icons/linkedin.svg">
      </a>
      <a href="http://hire.jonasgalvez.com.br/atom.xml">
        <img class="icon" src="~/assets/icons/feed.svg">
      </a>
      <a href="https://twitter.com/anothergalvez">
        <img class="icon" src="~/assets/icons/twitter.svg">
      </a>
    </div>
    <p class="first">I'm <a href="mailto:jonasgalvez@gmail.com">Jonas Galvez</a>, 
    a JavaScript and Go engineer at <a href="http://stored.com.br/">STORED 
    e-commerce</a>. I started my carreer as an ActionScript developer 18 years 
    ago. Since then, I've had a 10-year long affair with Python and have now 
    returned to ECMAScript land. </p>

    <p>I'm an eternal student of <a href="https://12factor.net/">distributed 
    systems</a> and practitioner of minimalism.</p>
    <p>I build and deploy my stuff with <a href="https://vuejs.org">Vue</a>, 
    <a href="https://nuxtjs.org">Nuxt</a>, <a href="https://golang.org">Go</a> 
    and <a href="https://kubernetes.io">Kubernetes</a> nowadays.</p>
    
    <p style="font-size: 14px">Check out my dedicated page to my professional <a href="/influences">influences</a>.</p>

    <p style="font-size: 14px">I am driven by 
    <a href="https://www.facebook.com/thedannyroddyweblog/photos/a.1222130331142621.1073741829.160367813985550/1215862991769355/?type=3">purpose</a>
    and cultivate a <a href="https://en.wikipedia.org/wiki/Meditations">stoic 
    attitude</a> towards life.</p>
  </section>
</template>

<style>
.left {
  position: relative;
  color: #F26419;
  width: 42%;
  padding: 20px;
  padding-left: 200px;
  line-height: 30px;
  font-size: 22px;
}
.left-mobile {
  font-family: 'Fira Sans';
  color: #F26419;
  padding: 10px 20px;
  line-height: 30px;
  font-size: 13px;
}
.left-mobile p {
  margin-bottom: 5px;
  margin-top: 5px;
}
.left .sidebar {
  position: absolute;
  top: 45px;
  left: 130px;
  width: 45px;
}
.left-mobile {
  display: none;
}
.left .sidebar .avatar {
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 32px 32px 32px 32px;
  -moz-border-radius: 32px 32px 32px 32px;
  -webkit-border-radius: 32px 32px 32px 32px;
  border: 3px solid #F6AE2D;
  overflow: hidden;
}
.left .sidebar .icon {
  display: block;
  width: 40px;
  height: auto;
  margin-bottom: 30px;
}
li {
  margin-bottom: 10px;
}
ul.cover-letter li {
 margin-bottom: 2px !important;  
}
.link a, .link a:active, .link a:visited {
  color: #7D70BA;
  font-weight: 900;
  text-decoration: none;
  font-size: 13px;
}
</style>
