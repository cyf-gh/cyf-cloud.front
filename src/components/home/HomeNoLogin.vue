<!--
 * @Date: 2020-11-01 14:46:55
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-27 15:23:24
 * @FilePath: \cyf-cloud.front\src\components\home\HomeNoLogin.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container class="mt-3" style="height: 100%;">
      <SecNavBar></SecNavBar>
              <b-carousel
                  id="carousel-1"
                  v-model="slide"
                  :interval="8000"
                  controls
                  indicators

                  background="#ababab"
                  style="text-shadow: 1px 1px 2px #333;"
                >
                  <!-- Slides with custom text -->
                  <!-- <b-carousel-slide img-src="https://s1.ax1x.com/2020/10/10/06w4j1.jpg">
                  <h1>账户</h1>
                  <p>本站已支持账户注册！享受更多服务！</p>
                  </b-carousel-slide> -->
                  <b-carousel-slide img-src="https://s1.ax1x.com/2022/05/21/OX1arT.jpg">
                  <h1>博客</h1>
                  <p>将cyf-cloud作为您的首选博客</p>
                  <b-button href="/account/signin" pill variant="light">前往注册</b-button>
                  </b-carousel-slide>
                  <b-carousel-slide img-src="https://s1.ax1x.com/2022/05/21/OX1tx0.jpg">
                  <h1>Minecraft</h1>
                  <p>现在就加入我的世界！</p>
                  <b-button href="/post/reader?id=46" pill variant="light">前往了解</b-button>
                  </b-carousel-slide>
                  <b-carousel-slide img-src="https://s1.ax1x.com/2022/05/21/OX1UMV.jpg">
                  <h1>皮肤站点</h1>
                  <p>获取皮肤与外置登录服务</p>
                  <b-button href="/post/reader?id=46" pill variant="light">前往挑选</b-button>
                  </b-carousel-slide>
                  <!-- Slides with custom text -->
                  <!-- <b-carousel-slide img-src="https://s1.ax1x.com/2020/07/13/UJBhmd.jpg">
                  <h1>音乐</h1>
                  <p>通过流式服务聆听人类最伟大的艺术之一</p>
                  </b-carousel-slide> -->

              </b-carousel>
    </b-container>
</template>


<script>
import Vue from 'vue'
import SecNavBar from './SecNavbar'

export default {
  components: {
    SecNavBar
  },
    data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        anchors: [],
        sectionsColor: ['#FAFAFA', '#F5F5F5', '#9E9E9E'],
        scrollBar: true,
      },
    }
  }
}
</script>
