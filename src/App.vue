<template>
  <div id="app">
    <cc-navbar/>
    <br>
    <router-view></router-view>
    <br>
    <cc-footer/>
  </div>
</template>

<script>
import ccNavbar from './components/Navbar.vue'
import ccFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    ccNavbar, ccFooter
  }
}
</script>

<style>
  .selector-for-some-widget {
    box-sizing: content-box;
  }
</style>
