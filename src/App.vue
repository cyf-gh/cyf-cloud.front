<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 19:57:39
 * @FilePath: \cyf-cloud.front\src\App.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div id="app">
    <cc-navbar/>
    <!--cc-navbar height-->
    <div class="fs">
      <div class="mt-2"></div>
      <br>
      <br>
      <router-view></router-view>
      <br>
    </div>
    <cc-footer/>
  </div>
</template>

<script>
import ccNavbar from './components/Navbar.vue'
import ccFooter from './components/Footer.vue'
import ids from './cc/v1x1/Identity'
import theme from './cc/v1x1/Theme'

export default {
  name: 'App',
  components: {
    ccNavbar, ccFooter
  },
  data() {
    return {
      initing: true,
    }
  },
  mounted(){
    window.addEventListener('hashchange',()=>{
        var currentPath = window.location.hash.slice(1); // 获取输入的路由
        if(this.$router.path !== currentPath){
          this.$router.push(currentPath); // 动态跳转
        }
    },false);
    // 完成客户端cid的编写
    ids.InitCookie(this.$cookie)
    ids.GenerateBasicIds();
    
    theme.ReloadBgUrl()
    this.initing = false;
  }
}
</script>

<style>
  .selector-for-some-widget {
    box-sizing: content-box;
  }

  .fs {
    width: 100%;
    height: 100%;
  }
</style>
