<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-29 16:32:09
 * @FilePath: \cyf-cloud.front\src\components\home\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// static
<template>
<b-container fluid="lg">
  <div>
  <b-card-group deck>
    <b-card style="z-index: 999;">
      <b-dropdown id="cc-home-dropdown-mc" variant="light" text="我的世界">
        <b-dropdown-item href="/mc">首页</b-dropdown-item>
        <b-dropdown-item href="/mc/skin">外置登录</b-dropdown-item>
        <b-dropdown-item href="/mc/map">卫星地图</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/mc/about">关于</b-dropdown-item>
      </b-dropdown>
        <b-dropdown id="cc-home-dropdown-cloud-app" class="p-1 upper" variant="light" text="云应用">
          <b-dropdown-item href="/cloudApp/util/mcdrPlg">MCDR插件安装助手</b-dropdown-item>
          <b-dropdown-item href="/cloudApp/vt">开黑看视频（预览版）</b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="cc-home-dropdown-music-cyf" class="p-1 upper" variant="light" text="音乐" disabled>
        </b-dropdown>
    </b-card>
  </b-card-group>
  </div>
  <div>
  <b-card-group deck>
      <div v-if="isLogin">
        <ccPostHome></ccPostHome>
      </div>
      <!-- <b-card v-if="isLogin">
        <ccClipboard></ccClipboard>
      </b-card> -->
  </b-card-group>
  </div>
</b-container>
</template>

<script>
import idy from "../../cc/v1x1/Identity"
// import ccClipboard from "../v1x1/Clipboard"
import ccPostHome from "../post/Home"
import '../../cc/css/cc-card.css'

export default {
    components:{
      // ccClipboard, 
      ccPostHome
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
