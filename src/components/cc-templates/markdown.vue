<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 18:34:13
 * @FilePath: \cyf-cloud.front\src\components\cc-templates\markdown.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <br />
    <b-container class="border">
      <div v-if="infoMd==''">
        <br />
        <p>
          您正在阅读
          <b-badge pill variant="success" :herf="mdUrl">{{mdUrl}}</b-badge>
        </p>
        <hr />
        <div :id="divId"></div>
        <br />
      </div>
      <div v-else>
        <br />
        <p>获取文档失败：<b-badge pill variant="danger" :herf="mdUrl">{{mdUrl}}</b-badge></p>
        <p>请联系网站管理员</p>
      </div>
    </b-container>
  </div>
</template>

<script>
import md from "../../cc/markdown";
export default {
  data() {
    return {
      infoMd: '',
    };
  },
  props: {
    mdUrl: String,
    divId: String,
    ccServer: Boolean,
  },
  mounted() {
    md.SetMarkdownToDiv(
      this.mdUrl,
      this.infoMd,
      this.divId,
      this.axios,
      this.ccServer
    );
  }
};
</script>