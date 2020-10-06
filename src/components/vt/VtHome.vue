<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 17:59:49
 * @FilePath: \cyf-cloud.front\src\components\vt\VtHome.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
  <div>
  <b-alert show variant="warning">这是一个测试版本，功能完善程度可能较低，bug较多。</b-alert>
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
            <b-badge pill variant="warning" v-if="vt.isIdle == true">未在房间中</b-badge>
            <b-badge pill variant="success" v-else>在房间中</b-badge>
            <br />
            <b-container>
              <small>用户名：{{vt.name}}</small>
              <br />
              <small>房间：{{vt.lobbyname}}</small>
              <br />
              <small>密码：{{vt.passwd}}</small>
            </b-container>
<br/>
                        <b-container>

            <b-table
              id="lobby-table"
              hover
              :items="lobbies"
              :current-page="table.curp"
              :per-page="table.perp"
              @click="myRowClickHandler"
              small
            ></b-table>
            </b-container>
            <b-pagination
              v-model="table.curp"
              :per-page="table.perp"
              :total-rows="rows"
              aria-controls="lobby-table"
            ></b-pagination>
            <br />
            <b-button-group>
              <b-button @click="createLobby" variant="info" :disabled="vt.lobbyname!=''">创建房间</b-button>
              <b-button @click="exitLobby" :disabled="vt.lobbyname==''">退出当前房间</b-button>
              <b-button @click="refreshLobby">刷新</b-button>
            </b-button-group>
            <br />

            <br />
          </div>
          <b-button v-b-toggle.advanc-collapse variant="outline-primary">高级设置</b-button>
          <b-collapse id="advanc-collapse" class="container">
            <br />
                <b-form-checkbox disabled v-model="ux.userStatus">显示房间状态</b-form-checkbox>
                <b-form-checkbox v-model="ux.mentionRefresh">刷新提示</b-form-checkbox>
                <hr/>
                <b-form-checkbox v-model="ux.sync">同步</b-form-checkbox>
                <small class="d-block mb-3 text-muted">关闭则不会有任何视频同步效果</small>
              <small >最大偏移值（秒）</small>
              <b-form-select v-model="vt.maxoffset" :options="vt.options"></b-form-select>
              <small class="d-block mb-3 text-muted">如果观众与房主的视频位置相减大于这个值，将会同步（仅观众）</small>
              <small>同步间隔（毫秒）</small>
              <b-form-select v-model="vt.int" :options="vt.options_int"></b-form-select>
              <small class="d-block mb-3 text-muted">每次同步请求的间隔（房主观众均有效）</small>
                <hr/>
            <small>服务器 URI</small>
            <b-form-input id="input-server-uri" v-model="vt.serverUri" required placeholder="Url"></b-form-input>
            <small class="d-block mb-3 text-muted">官方服务器地址：<br>https://se.cyf-cloud.cn:2344/v1/vt/</small>
            <b-badge pill variant="info" href="#" @mousedown="testServer">点击测试</b-badge>
            <br/>
            <hr />
          </b-collapse>
          <br/>
        </div>
      </b-sidebar>
    </div>

    <b-card id="main-control-panel">
      <b-card-group deck>
        <b-card v-if="ux.userStatus" >
          <div class="container">
            <h3>房间状况</h3>
            <br />
            <b-table :items="viewers"></b-table>
            <br />
          </div>
        </b-card>
        <b-card>
          <video ref="videoHandle" preload="auto" :src="vt.url" controls width="100%"></video>
          <div id="video-controls">
            <b-row>
              <b-col>
                <b-form-input id="input-2" v-model="vt.url" required placeholder="视频Url" v-on:input="changeSrc"></b-form-input>
              </b-col>
              <b-col>
                <b-container>
                  <b-button v-b-toggle.sidebar-1>设置</b-button>
                </b-container>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import md5 from 'js-md5';
import apiServer from "../../server"
import rd from '../../cc/random'
import bvu from '../../cc/bvUtil'
export default {
  data() {
    return {
      vt: {
        options: [
          1,2,3,4
        ],
        options_int: [
          1000,
          1500,
          2000,
          2500,
          3000,
          3500
        ],
        maxoffset: 1,
        forever: true,
        int:2000,
        url:
          "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1", // test
        statusInfo: "当前不在任何房间中",
        serverUri: apiServer + "/v1/vt/",
        isHost: false,
        lobbyname: "",
        name: "",
        passwd: "",
        isIdle: true,
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
        // 播放器句柄
        handle: "",
      },
      ux:{
        userStatus: false,
        mentionRefresh: true,
        sync: true
      },
      lobbies: [],
      viewers: [],
      vb: {
        tCount: 0,
      },
      timer: '',
    };
  },
  computed: {
      rows() {
        return this.lobbies.length
      }
    },
  mounted() {
    // 如果需要更换播放器，则修改以下这段代码。
    this.player.handle = this.$refs["videoHandle"];
    bvu.InitToast(this.$bvToast)
    this.vt.name = rd.noncestr(true, 4, 10);
    this.refreshLobby();
    this.sync();
  },
  created() {
    this.timer = setInterval(this.sync, this.vt.int)
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    changeSrc() {
      this.syncVideoStatus();
    },
    sync() {
      if ( !this.vt.isIdle ){
        if( this.sync ) {
          this.refreshLobbyUsersStatus();
          if ( this.vt.isHost ) {
            this.syncHost();
          } else {
            this.syncGuest();
          }
        }
      }
    },
    // 播放器相关
    getPlayerHandle() {
      console.log("onload");
    },
    //////////////////////////////////////////////////////////////////
    testServer() {
      this.axios
        .get(this.vt.serverUri + "ping")
        .then((res) => {
          console.log(res);
          bvu.Msg("测试成功", "服务器可用！", "success");
        })
        .catch((err) => {
          console.log(err);
          bvu.Msg("测试错误", "服务器不可用，详情请查看控制台", "danger");
        });
    },
    /**
     * @name: myRowClickHandler
     * @description: 处理房间列表单项点击
     * @test: NA
     * @param {type} 
     * @return {type} 
     * @note: 
     */
    myRowClickHandler(record, index) {
      console.log(record);
      console.log(index);
      this.vt.tmp.lbname = this.lobbies[(this.table.curp-1) * this.table.perp + index]["lobbyName"];
      this.$refs["modalPasswd"].show();
    },
    // Vt相关
    createLobby() {
      this.vt.lobbyname = this.vt.name + "'s lobby";
      this.vt.passwd = rd.noncestr(true, 4, 6);
      console.log(this.vt.passwd);
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
            bvu.Msg("错误", "房间已存在", "danger");
          } else {
            bvu.Msg("成功", "创建房间成功！", "success");
          }
        })
        .catch((err) => {
          console.log(err);
          bvu.Msg("错误", "创建房间错误", "danger");
        });
      this.changeSrc();
      this.refreshLobby();
    },
    exitLobby() {
      this.axios.get(this.vt.serverUri + "lobby/exit",{params:{username:this.vt.name}})
      .then(res => {
        switch(res.data) {
          case "LOBBY_DELETED":
            bvu.Msg("成功", "你是房主，房间已删除！", "success");
            break;
          case "LOBBY_EXIT":
            bvu.Msg("成功", "已退出房间！", "success");
            break;
          case "NO_SUCH_LOBBY":
            bvu.Msg("警告", "你所在的房间不存在", "warning");
            break;
        }
      })
      .catch(err => {
        console.error(err); 
        bvu.Msg("错误", "退出房间请求错误", "danger");
      })
      this.refreshLobby();
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
          bvu.Msg("错误", "刷新房间错误，请检查服务器通信是否正常", "danger");
        });
      this.whereIAm();
      if ( this.ux.mentionRefresh ) {
        bvu.Msg("提示", "信息已刷新");
      }
    },
    syncVideoStatus() {
      this.axios.post(this.vt.serverUri + "lobby/update/videodesc",{
        Ls:this.vt.url,
        Index:0,
        Md5:md5(this.vt.url)
      },{
        params:{hostname:this.vt.name},
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err);
      })
    },
    syncHost() {
      var p = this.player.handle.paused ? "p" : "s"
      this.axios.get(this.vt.serverUri + "sync/host",{params:{
        name: this.vt.name,
        location: this.player.handle.currentTime,
        ispause: p,
        p: 0 // web端缺省
      }})
      .then(res => {
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getCurVideoSrc() {
      this.axios.get(this.vt.serverUri + "lobby/videodesc",{params:{name:this.vt.name,
      t:"web"}})
      .then(res => {
        console.log("current video src"+res.data)
        this.vt.url = res.data
      })
      .catch(err => {
        console.error(err);
      })
    },
    syncGuest() {
      this.axios.get(this.vt.serverUri + "sync/guest",{params:{
        name: this.vt.name,
      }})
      .then(res => {
        // web版第四个参数index忽略
        var data = res.data.split(",");
        console.log( data[0] )
        console.log( md5(this.vt.url) )
        // 同步视频
        if( data[0] != md5(this.vt.url)) {
          this.getCurVideoSrc()
        }
        // 同步时间
        var hostTime = data[2];
        if( hostTime != "") {
          if ( Math.abs( this.player.handle.currentTime - data[2] ) > this.vt.maxoffset ) {
            this.player.handle.currentTime =  data[2];
          }
        }
        //同步状态
        if (data[1] == "p") {
          this.player.handle.pause();
        } else {
          this.player.handle.play();
        }
        console.log(res);
      })
      .catch(err => {
        console.error(err); 
      })
    },
    refreshLobbyUsersStatus() {
      if (!this.ux.userStatus) {
        return;
      }
      console.log("user status refreshed!");
      if ( this.vt.lobbyname == "" ) {
        this.viewers = []
        return;
      }
      this.axios.get(this.vt.serverUri+"lobby/users/status",{params:{lobbyname:this.vt.lobbyname}})
      .then(res => {
        if ( res.data == "NO_SUCH_LOBBY" ){
          console.log("Lobby " + this.vt.lobbyname + " does not exist.");
          this.viewers = [];
          return;
        }
        this.viewers = res.data
      })
      .catch(err => {
        console.error(err); 
      })
    },
    enterLobby() {
      console.log(this.vt.tmp.lbname);
      console.log(this.vt.tmp.pswd);
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
              bvu.Msg("错误", "密码不正确", "danger");
              break;
            case "NO_SUCH_LOBBY":
              bvu.Msg("错误", "当前房间不存在，请刷新", "danger");
              break;
            case "OK":
              bvu.Msg("成功", "成功进入房间！", "success");
              this.vt.passwd = this.vt.tmp.pswd;
              this.vt.lobbyname = this.vt.tmp.lbname;
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          bvu.Msg("错误", "进入房间错误", "danger");
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
            this.vt.isHost = false;
            this.vt.lobbyname = "";
            this.vt.passwd = "";
            this.vt.isIdle = true;
            return;
          } else {
            this.vt.isIdle = false;
          }
          console.log( "idle:"+this.vt.isIdle);
          var where = res.data.split(",");
          this.vt.lobbyname = where[0];
          this.vt.isHost = where[1] == "HOST";
          this.vt.passwd = where[2];
        })
        .catch((err) => {
          console.log(err);
          bvu.Msg("错误", "获取用户状态错误", "danger");
        });
      this.vt.isIdle = (this.vt.lobbyName == "" );
      console.log( this.vt.isIdle );
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