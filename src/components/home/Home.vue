<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 18:05:55
 * @FilePath: \ccfront\src\components\home\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// static
<template>
<div class="container-fluid">
  <b-card-group deck>
    <b-card class="cc-cls-home-cardgroup">
      <b-dropdown id="cc-home-dropdown-mc" class="p-1" variant="light" text="我的世界">
        <b-dropdown-item href="/mc">概况</b-dropdown-item>
        <b-dropdown-item href="/mc/skin">外置登录</b-dropdown-item>
        <b-dropdown-item href="/mc/map">卫星地图</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/mc/about">关于</b-dropdown-item>
      </b-dropdown>
        <b-dropdown id="cc-home-dropdown-cloud-app" class="p-1" variant="light" text="云应用">
          <b-dropdown-item href="#/util/mcdrPlg">MCDR插件安装助手</b-dropdown-item>
          <b-dropdown-item href="#/vt">开黑看视频（预览版）</b-dropdown-item>
        </b-dropdown>
        <b-dropdown id="cc-home-dropdown-about-cyf" class="p-1" variant="light" text="音乐" disabled>

        </b-dropdown>
    </b-card>
  </b-card-group>
  <b-card-group deck>
    <b-card>
      <b-carousel
          v-if="!isLoginIn"
          id="carousel-1"
          v-model="slide"
          :interval="7000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://s1.ax1x.com/2020/07/13/UJBTtP.jpg">
          <h1>Minecraft</h1>
          <h5>在服务器和其他小伙伴们一起游玩史上以来最棒的沙盒游戏</h5>
          <h6>图自1.14纯净生存服</h6>
          <b-button href="#/mc/map" pill variant="info">查看卫星地图</b-button>
          </b-carousel-slide>
          <b-carousel-slide img-src="https://s1.ax1x.com/2020/07/13/UJB6fK.jpg">
          <h1>Minecraft 皮肤站点</h1>
          <h5>获取皮肤与外置登录服务</h5>
          <b-button href="#/mc/skin" pill variant="outline-secondary">前往注册</b-button>
          </b-carousel-slide>
          <!-- Slides with custom text -->
          <b-carousel-slide img-src="https://s1.ax1x.com/2020/07/13/UJBhmd.jpg">
          <h1>音乐</h1>
          <h5>通过流式服务聆听人类最伟大的艺术之一</h5>
          </b-carousel-slide>
          <b-carousel-slide img-src="https://s1.ax1x.com/2020/07/13/UJB5TI.jpg">
          <h1>探索</h1>
          <h5>了解和获取更多cyf的信息与提供的服务</h5>
          </b-carousel-slide>
      </b-carousel>
    </b-card>
    <b-card>
      <h6>服务功能</h6>
      
    </b-card>
    <b-card>
    </b-card>
  </b-card-group>



</div>
</template>

<script>
import idy from "../../cc/v1x1/Identity"
export default {
    name: "ccHome",
        data() {
      return {
        slide: 0,
        sliding: null,
        initing: true,
      }
    },
    mounted() {
      idy.InitCookie(this.$cookie)
      this.initing = false;
    },
    methods: {
      onSlideStart() {
        this.sliding = true;
      },
      onSlideEnd() {
        this.sliding = false;
      }
    },
    computed: {
      isLoginIn() {
        if ( this.initing ) {
          return false
        } else {
          return idy.IsLogin()
        }
      }
    },
}    
</script>
<style scoped>
.card {
  border: none;
  background-color: white;
  margin: 1rem;
  transition:all 1s;
}
.card:hover{
  background-color:#F8F8F8;
}
.cc-cls-home-cardgroup{
}
</style>