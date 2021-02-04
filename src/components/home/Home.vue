<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-04 16:32:08
 * @FilePath: \cyf-cloud.front\src\components\home\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// static
<template>
<b-container fluid="md">
 <SecNavBar></SecNavBar>
      <b-card-group deck v-if="isLogin">
        <ccPostHome></ccPostHome>
        <VPHome></VPHome>
      </b-card-group>
      <!--
      <b-card v-if="isLogin">
        <ccClipboard></ccClipboard>
      </b-card>
      -->
</b-container>
</template>

<script>
import idy from "../../cc/v1x1/Identity"
// import ccClipboard from "../v1x1/Clipboard"
import ccPostHome from "../post/Home"
import '../../cc/css/cc-card.css'
import SecNavBar from './SecNavbar'
import VPHome from '../vp/home'

export default {
    metaInfo: {
          title: "主页",
          titleTemplate: '%s - cyf-cloud',
          htmlAttrs: {
            lang: 'zh-cn',
            amp: true
          }
    },
    components:{
      // ccClipboard,
      ccPostHome,
      SecNavBar,
      VPHome
    },
    name: "ccHome",
    data() {
      return {
          slide: 0,
          sliding: null,
          isLogin: false,
        }
    },
    created() {
      idy.InitCookie(this.$cookie)
      this.isLogin = idy.IsLogin()
      if ( !this.isLogin ) {
        this.$router.push({ path: "/home/nl" });
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true;
      },
      onSlideEnd() {
        this.sliding = false;
      },
    },
}    
</script>
