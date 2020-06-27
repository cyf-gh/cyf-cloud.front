<template>
  <div id="app">
    <cc-navbar/>
    <router-view></router-view>
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
  },
  mounted(){
    window.addEventListener('hashchange',()=>{
        var currentPath = window.location.hash.slice(1); // 获取输入的路由
        if(this.$router.path !== currentPath){
            this.$router.push(currentPath); // 动态跳转
        }
    },false);
  }
}
</script>

<style>
  .selector-for-some-widget {
    box-sizing: content-box;
  }


</style>
