
<template>
  <div>
    <b-modal id="modal-1" title="输入房间密码" ref="modalPasswd" @ok="enterLobby">
      <b-form-input
        id="input-passwd"
        v-model="vt.tmp.pswd"
        required
        @keydown.enter="enterLobby"
        placeholder="密码"
        invalid-feedback="Name is required"
      ></b-form-input>
    </b-modal>

    <div id="sidebar">
      <b-sidebar id="sidebar-1" title="设置列表" shadow>
        <div id="common-settings" class="container">
          <div>
            <b-badge pill variant="dark" v-if="vt.isHost">你是房主</b-badge>
            <b-badge pill variant="light" v-else>你是观众</b-badge>
            <b-badge pill variant="warning" v-if="vt.isIdle">未在房间中</b-badge>
            <b-badge pill variant="success" v-else>在房间中</b-badge>
            <br />
            <small>用户名：{{vt.name}}</small>
            <br />
            <small>房间：{{vt.lobbyname}}</small>
            <br />
            <small>密码：{{vt.passwd}}</small>
            <br />
            <br />
            <b-table
              id="lobby-table"
              hover
              :items="lobbies"
              :current-page="table.curp"
              :per-page="table.perp"
              @row-clicked="myRowClickHandler"
              small
            ></b-table>
            <b-pagination
              v-model="table.curp"
              :per-page="table.perp"
              :total-rows="rows"
              aria-controls="lobby-table"
            ></b-pagination>
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

    <b-container id="main-control-panel">
      <b-card-group deck>
        <b-card>
          <video ref="videoHandle" preload="auto" :src="vt.url" controls width="100%"></video>
          <div id="video-controls">
            <b-row>
              <b-col>
                <b-form-input id="input-2" v-model="vt.url" required placeholder="Url"></b-form-input>
              </b-col>
              <b-col>
                <b-button v-b-toggle.sidebar-1>设置</b-button>
              </b-col>
            </b-row>
          </div>
        </b-card>
        <b-card>
          <div class="container">
            <h3>房间状况</h3>
            <br />
            <b-table :items="viewers"></b-table>
            <br />
          </div>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vt: {
        url:
          "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1", // test
        statusInfo: "当前不在任何房间中",
        serverUri: "/vt",
        isHost: false,
        lobbyname: "",
        name: "",
        passwd: "",
        isIdle: false,
        tmp: {
          pswd: "",
          lbname: "",
        },
      },
      table: {
        perp: 8,
        curp: 1,
      },
      player: {
        handle: "",
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
  computed: {
      rows() {
        return this.lobbies.length
      }
    },
  mounted() {
    this.player.handle = this.$refs["videoHandle"];
    this.vt.name = this.noncestr(true, 4, 10);
    this.refreshLobby();
  },

  methods: {
    noncestr(randomFlag, min, max) {
      var str = "",
        range = min,
        arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      // 随机产生
      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }
      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }
      return str;
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    // 播放器相关
    getPlayerHandle() {
      console.log("onload");
    },
    // 辅助函数
    msg(title, msg, v = "default") {
      this.vb.tCount++;
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 3000,
        appendToast: false,
        variant: v,
      });
    },
    // 界面行为
    ///
    /// 测试服务器
    ///
    testServer() {
      this.axios
        .get(this.vt.serverUri + "ping")
        .then((res) => {
          console.log(res);
          this.msg("测试成功", "服务器可用！", "success");
        })
        .catch((err) => {
          console.log(err);
          this.msg("测试错误", "服务器不可用，详情请查看控制台", "danger");
        });
    },
    myRowClickHandler(record, index) {
      console.log(record);
      console.log(index);
      this.vt.tmp.lbname = this.lobbies[index]["lobbyName"];
      this.$refs["modalPasswd"].show();
    },
    // Vt相关
    createLobby() {
      this.vt.lobbyname = this.vt.name + "'s lobby";
      this.vt.passwd = this.noncestr(true, 4, 6);
      this.axios
        .get(this.vt.serverUri + "lobby/create", {
          params: {
            hostname: this.vt.name,
            lobbyname: this.vt.lobbyname,
            passwd: this.vt.passwd,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data == "LOBBY_EXISTED") {
            this.msg("错误", "房间已存在", "danger");
          } else {
            this.msg("成功", "创建房间成功！", "success");
          }
        })
        .catch((err) => {
          console.log(err);
          this.msg("错误", "创建房间错误", "danger");
        });
      this.refreshLobby();
    },
    exitLobby() {
      this.msg("提示", "已退出房间");
    },
    refreshLobby() {
      this.axios
        .get(this.vt.serverUri + "lobbies")
        .then((res) => {
          console.log("refreshed!");
          this.lobbies = [];
          res.data.split(",").forEach((el) => {
            this.lobbies.push({ lobbyName: el });
          });
          console.log(this.lobbies);
        })
        .catch((err) => {
          console.log(err);
          this.msg("错误", "刷新房间错误，请检查服务器通信是否正常", "danger");
        });
      this.whereIAm();
    },
    enterLobby() {
      console.log(this.vt.tmp);
      this.axios
        .get(this.vt.serverUri + "lobby/enter", {
          params: {
            username: this.vt.name,
            lobbyname: this.vt.tmp.lbname,
            passwd: this.vt.tmp.pswd,
          },
        })
        .then((res) => {
          switch (res.data) {
            case "PASSWORD_INCORRECT":
              this.msg("错误", "密码不正确", "danger");
              break;
            case "NO_SUCH_LOBBY":
              this.msg("错误", "当前房间不存在，请刷新", "danger");
              break;
            case "OK":
              this.msg("成功", "成功进入房间！", "success");
              this.vt.passwd = this.vt.tmp.pswd;
              this.vt.lobbyname = this.vt.tmp.lbname;
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          this.msg("错误", "进入房间错误", "danger");
        });
      this.refreshLobby();
    },
    whereIAm() {
      this.axios
        .get(this.vt.serverUri + "user/where", {
          params: {
            username: this.vt.name,
          },
        })
        .then((res) => {
          if (res.data == "IDLE") {
            this.vt.isIdle = true;
            return;
          } else {
            this.vt.isIdle = false;
          }
          var where = res.data.split(",");
          this.vt.lobbyname = where[0];
          this.vt.isHost = where[1] == "HOST";
          this.vt.passwd = where[2];
        })
        .catch((err) => {
          console.log(err);
          this.msg("错误", "获取用户状态错误", "danger");
        });
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