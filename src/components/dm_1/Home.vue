<!--
 * @Date: 2021-01-06 13:00:26
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-12 00:42:41
 * @FilePath: \cyf-cloud.front\src\components\dm_1\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
  <b-container fluid>
    <b-modal id="id-modal-history-dir" title="历史路径">
      <b-button-group>
        <b-button
          class="ml-2"
          variant="primary"
          size="sm"
          v-for="h in historyDirs"
          :key="h"
          @click="GoTo(h)"
          >{{ h }}</b-button
        >
      </b-button-group>
    </b-modal>
    <b-sidebar
      width="50"
      id="id-sidebar-res-props"
      right
      title="资源信息"
      v-model="infoVisiable"
      shadow
    >
      <div v-if="currentResource != null">
        <b-card>
          <table class="dm-table">
            <tr>
              <td>
                <small>资源名</small>
              </td>
              <td>
                <strong
                  >{{ currentResource.Name
                  }}<b-badge
                    class="ml-1 my-auto"
                    v-if="currentDMResource != null"
                    variant="info"
                    >UID: {{ currentDMResource.Id }}</b-badge
                  >
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <small>大小 </small>
              </td>
              <td>
                <strong
                  >{{ getWellSize }} {{ getWellUnit }} ( {{ currentResSize }} Bytes
                  )</strong
                >
              </td>
            </tr>
            <tr v-if="currentDMResource != null">
              <td>
                <small>MD5 </small>
              </td>
              <td>
                <strong>{{ currentDMResource.MD5 }}</strong>
              </td>
            </tr>
            <tr v-if="currentDMResource != null">
              <td>
                <small for="id-rating-sm-no-border">评分</small>
              </td>
              <td>
                <b-form-rating
                  id="id-rating-sm-no-border"
                  color="#ff8800"
                  stars="6"
                  v-model="currentDMResource.Rating"
                  @change="changeRating"
                  no-border
                  size="sm"
                ></b-form-rating>
              </td>
            </tr>
            <tr v-if="currentDMResource != null">
              <td>
                <small for="rating-sm-no-border">标签</small>
              </td>
              <td>
                <b-form-tags
                  tag-variant="light"
                  size="sm"
                  input-id="id-dm-resources-tags-separators"
                  v-model="currentDMResTags"
                  @input="InputTags"
                  separator=" ,;"
                  placeholder="使用半角逗号，分号，空格隔开"
                  no-add-on-enter
                  remove-on-delete
                ></b-form-tags>
              </td>
            </tr>
            <tr v-if="currentDMResource != null">
              <td>
                <small for="rating-sm-no-border">描述</small>
              </td>
              <td>
                <b-form-textarea
                  size="sm"
                  @blur="descriptionBlur"
                  rows="3"
                  max-rows="10"
                  v-model="currentDMResource.Description"
                ></b-form-textarea>
              </td>
            </tr>
            <tr>
              <td><small>是否索引</small></td>
              <td>
                <small v-if="currentDMResource != null">是</small>
                <div v-else>
                  <strong>否</strong>
                  <b-badge
                    href="#"
                    variant="light"
                    id="id-button-order-resource"
                    size="sm"
                    class="ml-4"
                    @click="orderResource"
                    >索引该资源</b-badge
                  >
                </div>
                <div v-if="currentResource.IsDir">
                  <b-badge
                    href="#"
                    variant="light"
                    id="id-button-order-resource"
                    size="sm"
                    class="ml-4"
                    @click="orderResourceRec"
                    >递归索引该目录</b-badge
                  >
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <small>系统</small>
              </td>
              <td>
                <details class="ml-2">
                  <pre>{{ resourceDetailInfo }}</pre>
                </details>
              </td>
            </tr>
            <tr>
              <td>
                <small>离线备份</small>
              </td>
              <td>
                <b-form-checkbox id="id-is-offline-backup" switch size="sm"
                  >是否开启</b-form-checkbox
                >
                <small style="color: gray" target="id-is-offline-backup"
                  >开启则将于下一次离线备份开始时进行备份。</small
                >
              </td>
            </tr>
            <tr>
              <td>
                <small>备份列表</small>
              </td>
              <td v-if="currentDMResource != null">
                <div v-if="currentDMResource.BackupIdList != null">
                  <b-badge v-for="b in currentDMResource.BackupIdList" :key="b"
                    >UID:{{ b }}</b-badge
                  >
                </div>
              </td>
              <td v-else>
                <strong>空</strong>
              </td>
            </tr>
          </table>
        </b-card>
      </div>
      <div v-else>
        <h1>没有选中任何资源</h1>
      </div>
    </b-sidebar>
    <b-card-group deck>
      <b-card>
        <div v-if="isWsConn">
          <div v-for="wt in wsTasks" :key="wt.Name">
            <div v-for="t in wt.List" :key="t.TaskName">
              <small
                >任务名：<b-badge>{{ t.TaskName }}</b-badge></small
              >
              <small
                >进度描述：<b-badge>{{ t.ProgressStage }}</b-badge> -
                <b-badge>{{ t.CurrentMsg }}</b-badge></small
              >
              <b-progress-bar
                :value="t.Progress"
                :max="t.ProgressMax"
                animated
                variant="success"
                v-if="!t.IsFinished"
              >
                <span
                  ><strong>{{ t.Progress }} / {{ t.ProgressMax }}</strong></span
                >
              </b-progress-bar>
              <small v-else><br />任务完成</small>
            </div>
          </div>
        </div>
        <div v-else>No task</div>

        <div v-if="resourceList == null">
          <h4>该目录下无内容</h4>
        </div>
        <div v-else class="x">
          <b-table
            class="table-explorer"
            hover
            :fields="resourceFields"
            :items="resourceList"
            @row-clicked="clickExplorer"
            small
            fixed
          ></b-table>
        </div>
      </b-card>
    </b-card-group>
    <pre v-if="currentDMResource != null">{{ currentDMResource }}</pre>

    <div v-else></div>

    <b-navbar fixed="bottom" toggleable="sm">
      <b-nav class="mr-0">
        <b-button pill variant="info" v-b-toggle.id-sidebar-res-props size="sm"
          >i</b-button
        >
        <b-badge v-if="isWsConn" variant="success">WS已连接</b-badge>
        <b-badge v-else variant="danger">WS已断连</b-badge>
      </b-nav>
      <b-nav class="mx-auto">
        <b-form inline class="mb-1">
          <b-button variant="light" size="sm" @click="Back">返回上一层</b-button>
          <b-button variant="light" size="sm" @click="BackHome">根目录</b-button>
          <div lg="8" v-if="currentDir != null">
            <b-form-input class="mx-1" size="sm" v-model="currentDir" @change="dirChange"
              >Path</b-form-input
            >
          </div>
          <b-breadcrumb>
            <b-breadcrumb-item
              v-for="(d, i) in dirBC"
              :key="d"
              href="#"
              @click="clickBC(i, d)"
              >{{ d }}</b-breadcrumb-item
            >
          </b-breadcrumb>
          <div lg="4">
            <b-button-group style="float: left">
              <b-button class="mx-auto" variant="light" size="sm" @click="GoToCurrentPath"
                >前往</b-button
              >
              <b-button
                variant="light"
                size="sm"
                @click="setHistoryDirs"
                v-b-modal.id-modal-history-dir
                >查看历史路径</b-button
              >
            </b-button-group>
          </div>
        </b-form>
      </b-nav>
      <b-nav class="ml-0"> </b-nav>
    </b-navbar>
  </b-container>
</template>

<script>
import apiAddr from "../../server";
import apiAddrWS from "../../serverWS";
import bvu from "../../cc/bvUtil";
import err from "../../cc/v1x1/HttpErrReturn";
import idy from "../../cc/v1x1/Identity";
export default {
  data() {
    return {
      infoVisiable: true,
      resourceList: null,
      dmResList: null,
      resourceFields: [
        { key: "Name", label: "名字", sortable: true },
        { key: "Path", label: "路径" },
        { key: "Mode", label: "权限" },
        { key: "Size", label: "大小", sortable: true },
        { key: "ModTime", label: "修改时间", sortable: true },
      ],
      resourceDetailInfo: "",
      currentResource: null,
      currentDMResource: null,
      currentResSize: 0,
      currentResSizeUnit: "bytes",
      currentDir: "",
      dirStack: [],
      historyDirs: [],
      rootDir: "",
      allTags: [],
      allTags2: [],
      currentDMResTags: [],
      websock: null,
      isWsConn: false,
      wsTasks: [],
      dirBC: [],
    };
  },
  mounted() {
    if (!idy.IsLogin()) {
      this.$router.push({ path: "/account/login?from=require_login" });
    }
    bvu.InitToast(this.$bvToast);
    var dir = this.$route.query.d;
    if (dir == undefined || dir == "") {
      this.BackHome();
    } else {
      this.currentDir = dir;
      this.dirStack.push(dir);
      this.historyDirs.push(dir);
      this.MakeBreadCrumb();
      this.Forward(dir);
    }
  },
  methods: {
    BackHome() {
      this.axios
        .get(apiAddr + "/v1x1/dm/1/raw/root", { withCredentials: true })
        .then((res) => {
          this.rootDir = JSON.parse(res.data.Data);
          this.dirStack.push(this.rootDir);
          this.historyDirs.push(this.rootDir);
          this.ModifyUrlDirParam(this.rootDir);
          this.MakeBreadCrumb();
          this.Home();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    clickBC(i, d) {
      console.log("Goto " + d + "in breadcrumb");
      var dir = this.dirBC[0];
      for (var ii = 1; ii <= i; ++ii) {
        dir += "/" + this.dirBC[ii];
      }
      this.Forward(dir);
    },
    dirChange() {
      if (this.currentDir == "") {
        this.currentDir = this.rootDir;
      }
    },

    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },

    websocketinit() {
      try {
        this.websock = new WebSocket(apiAddrWS + "/v1x1/dm/1/tasks/status/ws");
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
        this.isWsConn = true;
        bvu.Msg("Websocket", "连接成功", "success");
      } catch (error) {
        console.error(error);
      }
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      this.websocketsend(JSON.stringify({ Name: "order_recruit", Index: -1 }));
    },
    websocketonerror() {
      //连接建立失败重连
      // this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      this.wsTasks = JSON.parse(e.data);
      console.log("from order_recruit ws", this.wsTasks);
      this.sleep(1000).then(() => {
        this.websocketsend(JSON.stringify({ Name: "order_recruit", Index: -1 }));
      });
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      bvu.Msg("Websocket", "已断开连接", "danger");
      console.log("WS closed", e);
      this.isWsConn = false;
    },

    ModifyUrlDirParam(dir) {
      this.$router.push({
        query: { d: dir },
      });
    },
    GetAllTags() {
      this.axios
        .get(apiAddr + "/v1x1/dm/1/tags/all", { withCredentials: true })
        .then((res) => {
          var tags = JSON.parse(res.data.Data);
          this.allTags = new Map();
          if (tags != null) {
            tags.forEach((el) => {
              this.allTags[el.Id] = el.Name;
              this.allTags2[el.Name] = el.Id;
            });
            this.UpdateCurrentDMResTags();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    UpdateCurrentDMResTags() {
      this.currentDMResTags = [];
      if (this.currentDMResource == null) return;
      if (this.currentDMResource.TagIds != null) {
        this.currentDMResource.TagIds.forEach((el) => {
          this.currentDMResTags.push(this.allTags[el]);
        });
      }
    },
    setHistoryDirs() {
      this.historyDirs = [...new Set(this.historyDirs)];
      this.historyDirs.reverse();
    },
    descriptionBlur() {
      this.UpdateDMRes();
      console.log("updated description");
    },
    Home() {
      this.axios
        .get(apiAddr + "/v1x1/dm/1/raw/dir/root", {
          withCredentials: true,
        })
        .then((res) => {
          this.resourceList = JSON.parse(res.data.Data);
        })
        .catch((err) => {
          console.error(err);
        });
      if (this.rootDir)
        this.axios
          .get(apiAddr + "/v1x1/dm/1/query/dir", {
            params: { d: this.rootDir },
            withCredentials: true,
          })
          .then((res) => {
            if (err.Check(res.data)) {
              this.dmResList = JSON.parse(res.data.Data);
            } else {
              console.error("in Home", res.data.Desc);
              bvu.Msg("错误", res.data.Desc, "danger");
            }
            console.log(res);
          })
          .catch((err) => {
            bvu.Msg("错误", err, "danger");
            console.error(err);
          });

      this.dirStack.push(this.rootDir);
      this.historyDirs.push(this.rootDir);
      this.currentDir = this.rootDir;
    },
    Back() {
      console.log(this.dirStack);
      if (this.dirStack.length > 1) {
        this.dirStack.pop();
        this.GoTo(this.dirStack[this.dirStack.length - 1]);
      }
    },
    Forward(path) {
      this.GoTo(path);
      this.dirStack.push(path);
      this.historyDirs.push(path);
      this.setHistoryDirs();
    },
    changeRating() {
      console.log("rating changed");
      this.UpdateDMRes();
    },
    GoToCurrentPath() {
      this.Forward(this.currentDir);
    },
    // 不应该在除去Forward与Back的任意其他方法中调用GoTo
    GoTo(path) {
      this.currentDir = path;
      console.log("Goto: ", path);
      this.ModifyUrlDirParam(this.currentDir);
      this.axios
        .get(apiAddr + "/v1x1/dm/1/raw/dir", {
          params: { d: path, head: 0, end: -1 },
          withCredentials: true,
        })
        .then((res) => {
          if (err.IsOk(res.data)) {
            this.resourceList = JSON.parse(res.data.Data).Dirs;
            this.infoVisiable = true;
          } else {
            bvu.Msg("错误 - 路径", res.data.Desc, "danger");
          }
        })
        .catch((err) => {
          bvu.Msg("错误 - 路径", err, "danger");
        });
      this.axios
        .get(apiAddr + "/v1x1/dm/1/query/dir", {
          params: { d: path },
          withCredentials: true,
        })
        .then((res) => {
          if (err.IsOk(res.data)) {
            this.dmResList = JSON.parse(res.data.Data);
          } else {
            bvu.Msg("错误 - 资源索引", res.data.Desc, "danger");
          }
        })
        .catch((err) => {
          bvu.Msg("错误 - 资源索引", err, "danger");
        });
    },

    // 将资源添加至索引
    orderResource() {
      this.axios
        .post(apiAddr + "/v1x1/dm/1/order", [{ Path: this.currentResource.Path }], {
          withCredentials: true,
        })
        .then((res) => {
          if (err.IsOk(res.data)) {
            bvu.Msg("成功 - 添加资源至索引", res.data.Desc, "success");
            this.QueryDMResource();
          } else {
            bvu.Msg("错误 - 添加资源至索引", res.data.Desc, "danger");
          }
        })
        .catch((err) => {
          bvu.Msg("错误 - 资源索引", err, "danger");
          console.error(err);
        });
    },
    orderResourceRec() {
      this.axios
        .get(apiAddr + "/v1x1/dm/1/order/recruit", {
          params: { d: this.currentResource.Path },
          withCredentials: true,
        })
        .then((res) => {
          if (err.Check(res.data)) {
            bvu.Msg("任务已开始", "递归添加目录" + this.currentResource.Path, "success");
            this.websocketinit();
          } else {
            console.error("in orderResourceRec", res.data.Desc);
            bvu.Msg("错误", res.data.Desc, "danger");
          }
          console.log(res);
        })
        .catch((err) => {
          bvu.Msg("错误", err, "danger");
          console.error(err);
        });
    },
    InputTags(value) {
      console.log(value);
      this.currentDMResource.TagIds = [];
      var newTags = [];
      value.forEach((el) => {
        if (this.allTags2[el] == null) {
          console.log("new tag:", el);
          newTags.push(el);
        } else {
          this.currentDMResource.TagIds.push(this.allTags2[el]);
        }
      });
      if (newTags.length == 0) {
        this.UpdateDMRes();
        return;
      } else {
        this.axios
          .post(apiAddr + "/v1x1/dm/1/tags/add", newTags, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            JSON.parse(res.data.Data).forEach((el) => {
              this.currentDMResource.TagIds.push(el);
            });
            console.log(this.currentDMResource);
            this.UpdateDMRes();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    UpdateDMRes() {
      this.axios
        .post(apiAddr + "/v1x1/dm/1/info/modifies", this.currentDMResource, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          this.GetAllTags();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    GetDirSize(path) {
      this.axios
        .get(apiAddr + "/v1x1/dm/1/raw/recruit/dir/size", {
          params: { d: path },
          withCredentials: true,
        })
        .then((res) => {
          this.currentResSize = JSON.parse(res.data.Data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    clickExplorer(record, index) {
      console.log(record, index);
      this.resourceDetailInfo = record.Sys;
      this.currentResource = record;
      try {
        this.QueryDMResource();
      } catch (ex) {
        console.error(ex);
      }
      if (record.IsDir == true) {
        this.GetDirSize(record.Path);
        this.Forward(record.Path);
      } else {
        this.currentResSize = record.Size;
      }
    },
    QueryDMResource() {
      this.currentDMResource = null;
      if (this.dmResList == null) return;
      this.dmResList.forEach((el) => {
        if (el.Path == this.currentResource.Path) {
          this.currentDMResource = el;
          return;
        }
      });
      this.GetAllTags();
    },
    MakeBreadCrumb() {
      var bread = this.$route.query.d.split("\\");
      var bread2 = this.$route.query.d.split("/");
      this.dirBC = bread.length > bread2.length ? bread : bread2;
      for (var i = 0; i < this.dirBC.length; ++i) {
        if (this.dirBC[i] == "") {
          this.dirBC.splice(i, 1);
          --i;
        }
      }
      console.log(bread, bread2);
    },
  },
  watch: {
    // 监控url参数的变化
    $route(to, from) {
      this.infoVisiable = true;
      this.MakeBreadCrumb();
      // 防止原来的Forward导致该方法再次将新路径入栈
      if (this.dirStack[this.dirStack.length - 1] != this.$route.query.d) {
        this.Forward(this.$route.query.d);
      }
    },
    currentDir: function () {
      if (this.currentDir == "") {
        this.currentDir = this.rootDir;
      }
    },
  },
  computed: {
    // 转化容量大小为可读单位
    getWellSize() {
      if (this.currentResSize > 1024 * 1024 * 1024) {
        return (this.currentResSize / 1024 / 1024 / 1024).toFixed(2);
      }
      if (this.currentResSize > 1024 * 1024) {
        return (this.currentResSize / 1024 / 1024).toFixed(2);
      }
      if (this.currentResSize > 1024) {
        return (this.currentResSize / 1024).toFixed(2);
      }
      return this.currentResSize;
    },
    // 获得可读单位
    getWellUnit() {
      if (this.currentResSize > 1024 * 1024 * 1024) {
        return "GB";
      }
      if (this.currentResSize > 1024 * 1024) {
        return "MB";
      }
      if (this.currentResSize > 1024) {
        return "KB";
      }
      return "Byte";
    },
  },
};
</script>

<style>
.x {
  overflow-x: auto;
}
.dm-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.dm-table,
th,
td {
  border: 1px solid whitesmoke;
  padding: 10px;
}
.x {
  overflow-x: auto;
}
/* Table Head */
.table-explorer table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

.table-explorer thead th {
  background-color: whitesmoke;
  color: gray;
  border-bottom-width: 0;
}

/* Column Style */
.table-explorer td {
  color: #000;
}
/* Heading and Column Style */
.table-explorer tr,
th {
  border-width: 1px;
  border-style: solid;
  border-color: whitesmoke;
}

/* Padding and font style */
.table-explorer td,
th {
  padding: 5px 10px;
  font-size: 12px;
  font-family: sans-serif;
  font-weight: bold;
}
.b-form-tag {
  margin: 1px;
}
</style>
