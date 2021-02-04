<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-29 15:15:35
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
  created(){

    console.clear()
    let banner =
"%c================================================\n"+
"             __            _                 _\n"+
"  ___ _   _ / _|       ___| | ___  _   _  __| |\n"+
" / __| | | | |_ _____ / __| |/ _ \\| | | |/ _` |\n"+
"| (__| |_| |  _|_____| (__| | (_) | |_| | (_| |\n"+
" \\___|\\__, |_|        \\___|_|\\___/ \\__,_|\\__,_|\n"+
"      |___/                                     \n"+
"================================================\n"

    console.log( banner, 'color: cyan;')
    var hostPort = window.location.host
    console.log( "%c加入团队：https://"+hostPort+"/info/join_us",'color: cyan')
    console.log( "%c捐赠：https://"+ hostPort +"/donate",'color: cyan')
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

    // 首次加载行为
    if ( window.performance.navigation.type != 1 ) {
      ids.LogoutIfSession()
    }

    theme.ReloadBgUrl()
    this.initing = false;
  }
}
</script>

<style>
  .fs {
    box-sizing: content-box;
    width: 100%;
    height: 100%;
  }

  @media screen and ( min-width: 992px;) {
    .fs {
      min-height: 72vh;
    }
  }
</style>
