<!--
<template>
  <div>
    <b-modal id="modal-1" title="输入房间密码" ref="modalPasswd" @ok="enterLobby">
      <b-form-input
        id="input-passwd"
        v-model="vt.passwd"
        required
        @keydown.enter="enterLobby"
        placeholder="密码"
        invalid-feedback="Name is required"
      ></b-form-input>
    </b-modal>

    <b-container fluid> 
      <b-row>
        <b-col>
          <b-form-input
            id="input-2"
            v-model="vt.url"
            required
            @keydown.enter="redirect"
            placeholder="Url"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-button-group>
            <b-button v-b-toggle.collapse-lobby-status variant="outline-primary">房间情况</b-button>
            <b-button v-b-toggle.sidebar-1>设置</b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-container>

    <div id="sidebar">
      <b-sidebar id="sidebar-1" title="设置列表" shadow>
        <div id="common-settings" class="container">
          <div>
            <p>{{vt.statusInfo}}</p>
            <br />
            <b-table hover :items="lobbies" @row-clicked="myRowClickHandler"></b-table>
            <br />
            <b-button-group>
              <b-button @click="createLobby" variant="info">创建房间</b-button>
              <b-button @click="exitLobby">退出当前房间</b-button>
              <b-button @click="refreshLobby">刷新</b-button>
            </b-button-group>
            <br />
            <br />
          </div>
          <b-button v-b-toggle.advanc-collapse variant="outline-primary">高级设置</b-button>
          <b-collapse id="advanc-collapse" class="container">
            <br />
            <small>服务器 URI</small>
            <b-form-input id="input-server-uri" v-model="vt.serverUri" required placeholder="Url"></b-form-input>
            <b-badge pill variant="info" href="#" @mousedown="testServer">点击测试</b-badge>
          </b-collapse>
          <hr />
        </div>
      </b-sidebar>
    </div>
    <b-collapse class="mt-2" id="collapse-lobby-status">
      <div class="container">
        <h3></h3>
        <br />
        <b-table :items="viewers"></b-table>
        <br />
      </div>
    </b-collapse>
    <video preload="auto" src="blob:https://www.bilibili.com/69fc478d-09b9-42cd-8037-20bc7a98032d"></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vt: {
        url: "",
        statusInfo: "当前不在任何房间中",
        serverUri: "https://se.cyf-cloud.cn:2344/",
        passwd: "",
      },
      player: {
        handle: '',
      },
      lobbies: [{ lobbyName: "cyf1" }, { lobbyName: "cyf2" }],
      viewers: [
        { Name: "cyf", Position: "0:00" },
        { Name: "xjh", Position: "0:00" },
      ],
      vb: {
        tCount: 0,
      },
    };
  },
  mounted() {
  },
  methods: {
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    // 播放器相关
    getPlayerHandle() {
      console.log("onload");
    },
    // 辅助函数
    msg(title, msg) {
      this.vb.tCount++;
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 3000,
        appendToast: false,
      });
    },
    // 界面行为
    redirect() {
      this.$refs.vtHandle.src = this.vt.url;
    },
    testServer() {
      let resMsg = "OK";
      this.msg("服务器测试", resMsg);
    },
    myRowClickHandler(record, index) {
      console.log(record);
      console.log(index);
      this.$refs["modalPasswd"].show();
    },
    // Vt相关
    createLobby() {},
    exitLobby() {
      this.msg("提示", "已退出房间");
    },
    refreshLobby() {},
    enterLobby() {
      this.msg("提示", "你已经进入房间");
    },
  },
};
</script>

<style scoped>

.cc-iframe {
  width: 100%;
  height: 40rem;
}
.card {
  border: none;
}
</style>
-->