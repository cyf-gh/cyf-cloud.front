<template>
  <div class="container">
    <div class="text-center my-3">
      <b-button-group>
        <b-button v-on:click="mapSrc='https://se.cyf-cloud.cn:8123/mc/map/114'">1.14 纯净服</b-button>
        <b-button v-on:click="mapSrc='https://se.cyf-cloud.cn:8123/mc/map/112'">1.12 Mod服</b-button>
        <b-button v-on:click="mapSrc='https://se.cyf-cloud.cn:8123/mc/map/116'">1.16 纯净服</b-button>
      </b-button-group>
    </div>

    <div class="text-center my-3">
    <iframe class="cc-iframe"  frameborder="no"  :src="mapSrc" ></iframe>
    </div>
  </div>
</template>

<script>
export default {
    name: "ccMcWebmap",
    data: function() {
        return {
            mapSrc: "https://se.cyf-cloud.cn:8123/mc/map/114"
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