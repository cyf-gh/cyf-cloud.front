<!--
 * @Date: 2020-06-30 14:41:46
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 19:21:34
 * @FilePath: \cyf-cloud.front\src\components\minecraft\Webmap.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div class="container">
    <div class="text-center my-3">
      <b-button-group>
        <b-button variant="light" v-on:click="mapSrc='https://se.cyf-cloud.cn:8123/mc/map/116'">1.16 纯净服</b-button>
        <b-button variant="light" v-on:click="mapSrc='https://se.cyf-cloud.cn:8123/mc/map/112'">1.12 Mod服</b-button>
      </b-button-group>
    </div>

    <div class="text-center my-3">
    <iframe class="cc-iframe"  frameborder="no"  :src="mapSrc" ></iframe>
    </div>
    <div class="text-center my-3">
      <b-button  target="_blank" variant="light" block :href="mapSrc">打开卫星地图原网页</b-button>
    </div>
  </div>
</template>

<script>
export default {
    name: "ccMcWebmap",
    data: function() {
        return {
            mapSrc: "https://se.cyf-cloud.cn:8123/mc/map/116"
        }
    }
};
</script>

<style scoped>
    .cc-iframe {
        width: 100%;
        height: 40rem;
    }
</style>