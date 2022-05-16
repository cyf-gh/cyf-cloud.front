<!--
 * @Date: 2020-06-29 10:44:45
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 15:50:46
 * @FilePath: \ccfront\src\components\minecraft\Skin.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container fluid="md">
  <b-card>
      <br />
      <b-alert show variant="warning">
        <a>请不要使用国产浏览器进行注册！请使用诸如Edge Chrome等浏览器进行网站操作！</a>
      </b-alert>
      <b-button
        href="http://ppr.cyf-cloud.cn"
        target="_blank"
        security="restricted"
        sandbox
        pill
        variant="warning"
      >前往皮肤站官网</b-button>
      <br />
  </b-card>
    </b-container>
</template>

<script>
import ccMd from "../cc-templates/markdown";
export default {
  components: {
    ccMd,
  },
  data() {
    return {
      mrUrl: "how-to-register.md",
      divId: "id-cc-md-how-to-register",
      ccServer: true,
      infoMd: "",
    };
  },
  mounted() {},
};
</script>

<style scoped>
.cc-iframe {
  width: 100%;
  height: 40rem;
}
</style>