// static
<template>
<div class="container">
  <br>
   <b-carousel
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
      <!-- Text slides with image -->
      <b-carousel-slide img-src="https://gitee.com/cyf-my/imgs/raw/master/assets/haruhi.jpg">
        <h1>cyf-cloud</h1>
        <h5>cyf提供的各式网络服务导航站点</h5>
      </b-carousel-slide>
      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://gitee.com/cyf-my/imgs/raw/master/assets/mc1.png">
      <h1>Minecraft</h1>
      <h5>在服务器和其他小伙伴们一起游玩史上以来最棒的沙盒游戏</h5>
      <h6>图自1.14纯净生存服</h6>
      <b-button href="/mc/map" pill variant="info">查看卫星地图</b-button>
      </b-carousel-slide>
      <b-carousel-slide img-src="https://gitee.com/cyf-my/imgs/raw/master/assets/c-skin.jpg">
      <h1>Minecraft 皮肤站点</h1>
      <h5>享受皮肤带来的乐趣与进行外置验证资格的获取</h5>
      <b-button href="/mc/skin" pill variant="outline-secondary">前往注册</b-button>
      </b-carousel-slide>
      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://gitee.com/cyf-my/imgs/raw/master/assets/c-karajan.jpg">
      <h1>音乐</h1>
      <h5>通过流式服务聆听人类最伟大的艺术之一</h5>
      </b-carousel-slide>
      <b-carousel-slide img-src="https://gitee.com/cyf-my/imgs/raw/master/assets/c-cyf.png">
      <h1>探索</h1>
      <h5>了解和获取更多cyf的信息与提供的服务</h5>
      </b-carousel-slide>
    </b-carousel>
</div>
</template>

<script>
export default {
    name: "ccHome",
        data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true;
      },
      onSlideEnd() {
        this.sliding = false;
      }
    }
}    
</script>

<style scoped>
</style>