<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 22:16:42
 * @FilePath: \cyf-cloud.front\src\components\cc-templates\markdown.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <b-card>
    <b-container id="id-cc-markdown">
      <div v-if="infoMdStatus">
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
  </b-card>
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
    mdData: String,   // 长度非0则直接解析markdown
  },
  mounted() {
    if ( this.mdData.length != 0 ) {
      this.infoMd = this.mdData
      md.SetRawMarkdownToDiv(
        this.infoMd,
        this.divId
      )
    } else {
      md.SetMarkdownToDiv(
        this.mdUrl,
        this.infoMd,
        this.divId,
        this.axios,
        this.ccServer
      );
    }
  },
  computed: {
    infoMdStatus() {
      return true
    }
  },
};
</script>

<style scoped>
#id-cc-markdown {
background-color: white;
}
.card {
  border: none;
  margin: 1rem;
  background-color: #F8F8F8;
  transition:all 0.6s;
  transition-timing-function:ease-in-out;
}
.card:hover{
  background-color: #eee;
}
</style>