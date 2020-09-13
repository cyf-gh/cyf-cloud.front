<!--
 * @Date: 2020-08-29 21:54:19
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 16:38:50
 * @FilePath: \cyf-cloud.front\src\components\mcdrPlg\mcdrPlgHome.vue
 * @Descrion: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <b-modal id="id-modal-create-scr" title="还剩几步完成脚本的生成" ref="modalCreatescr" @ok="createscr">
      <label for="id-input-mcdr-path">MCDR位于服务器的绝对路径</label>
      <b-form-input
        id="id-input-mcdr-path"
        v-model="scr.mcdrPath"
        required
        :state="scrPathState"
        @keydown.enter="createscr"
        placeholder="Unix路径"
        invalid-feedback="不能为空"
        aria-describedby="input-live-help input-live-feedback"
      ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">
          请输入正确的Unix路径
        </b-form-invalid-feedback>
        <b-form-text id="id-input-mcdr-path">例：~/MCDR/ MCDR是你的MCDR所在的文件夹</b-form-text>
        <br>
        <b-form-checkbox switch v-model="scr.clearOriginPlgs">安装时保留原MCDR插件</b-form-checkbox>
        <b-form-text>当保留时，更新的插件会覆盖旧的插件</b-form-text>
      <hr>
      <p>验证问题</p>
      <label for="id-input-validate-cal">{{validate.dig1}} + {{validate.dig2}} = </label>
        <b-form-input
        id="id-input-validate-cal"
        v-model="validate.sum"
        required
        :state="validateAnswer"
        placeholder="小学生数学题"
        invalid-feedback="答案错误"
        aria-describedby="input-live-help input-live-feedback"
      ></b-form-input>
        <b-form-invalid-feedback id="id-input-validate-cal">
          请输入正确的计算答案
        </b-form-invalid-feedback>
    </b-modal>

    <b-sidebar id="sidebar-plg-market" title="插件市场" shadow>
      <div id="id-plg-market" class="container">
              <b-badge variant="info" target="_blank" href="https://github.com/cyf-gh/MCDRPluginCataJson">我要上传插件</b-badge>
        <br>
              <hr>
          <h5>分类</h5>
          <b-form-select
            id="id-select-cats"
            ref="select-cats"
            v-model="curPlgItems"
            :options="feed"
            value-field="plg"
            text-field="cat"
            @change="selectChanged"
          ></b-form-select>

        <div>
          <b-table
            id="id-table-plgs"
            ref="selectPlgs"
            hover
            :items="curPlgItems"
            @row-clicked="onRowSelected"
            :current-page="curPage"
            :fields="fields"
            :per-page="perPage"
            small
          ></b-table>
        </div>
        <b-pagination
          align="center"
          v-model="curPage"
          :per-page="perPage"
          :total-rows="rows"
          aria-controls="id-table-plgs"
        ></b-pagination>
      </div>
      <hr>
      <b-container>
          <small>插件源</small>
          <b-form-input id="id-input-plg-feed" v-model="feedSource" required placeholder="URI"></b-form-input>
        <b-badge pill variant="info" href="#" @mousedown="updateFeedSource">点击更新源</b-badge>
          <small class="d-block mb-3 text-muted">官方插件源地址：<br>1：<br>https://raw.githubusercontent.com/cyf-gh/MCDRPluginCataJson/master/feed.json<br>2:<br>https://api.cyf-cloud.cn/v1/util/mcdr/plg/feed</small>
      <b-alert show variant="info">
        <h4 class="alert-heading">使用方法</h4>
        <p>
          1. 在插件市场中点击一次则会勾选该插件。点击已经选过的插件会取消对该插件的选择。
          <br />2. 再选中的所有插件列表中，点击任意插件可取消对该插件的选择。
        </p>
        <hr>
        <p>uuid: {{uuid}}</p>
      </b-alert>
      </b-container>
    </b-sidebar>

    <div class="container text-center">
      <br>
      <h1 v-if="selectedPlgs.length==0">你还未选择任何插件</h1>
      <h1 v-if="selectedPlgs.length>0">已选插件列表 
        <b-badge>{{selectedPlgs.length}}个插件</b-badge>
      </h1>
      <br>
      <b-table
       striped
        id="id-table-plgs"
        ref="selectPlgs"
        hover
        :items="selectedPlgs"
        @row-clicked="onSelectedPlgCliced"
        :current-page="curPage2"
        :per-page="perPage2"
        small
      ></b-table>
      <b-pagination
        align="center"
        v-model="curPage2"
        :per-page="perPage2"
        :total-rows="rows2"
        aria-controls="id-table-plgs"
      ></b-pagination>
      <b-button-group>
      <b-button @click="openCreatescr">下一步</b-button>
      <b-button variant="info" v-b-toggle.sidebar-plg-market>打开插件市场</b-button>
      </b-button-group>
      <br>
      

    </div>
    <b-container v-if="scr.src!='' ">
      <hr>
      <b-alert show variant="warning">如果插件有变动则请重新生成脚本</b-alert>
      <label>复制到终端并运行</label>
      <b-form-input id="input-large" size="lg" placeholder="Code..." v-model="runScript"></b-form-input>
      <br>
  <label>脚本</label>
    <b-form-textarea
      id="textarea"
      v-model="scr.src"
      placeholder="Code here..."
      rows="3"
      max-rows="10"
    ></b-form-textarea>
      </b-container>
  </div>
</template>

<script>
import apiServer from "../../server"
import bvu from '../../cc/bvUtil'
import rd from '../../cc/random'
export default {
  mounted: function () {
    try {
      bvu.InitToast(this.$bvToast)
      this.updateFeedSource();
      var localSelectedPlgs = localStorage.getItem('selectedPlgs');
      this.selectedPlgs = localSelectedPlgs == null ? [] : JSON.parse( localSelectedPlgs );
      this.scr.mcdrPath = localStorage.getItem('mcdrPath')
      console.log( JSON.parse( this.selectedPlgs ) )

    } catch (error) {
      console.error(error)
    }
    var _uuid = localStorage.getItem('mcdrplguuid')
    if( _uuid == null ) {
      _uuid = rd.CreateUuid().toString();
      localStorage.setItem('mcdrplguuid', _uuid )
    }
    this.uuid = _uuid
    try {
      this.getscr();
      console.log("getscr");
      this.runScript += this.uuid + ")"
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      feed: [],
      curPlgItems: [],
      selectedPlgs: [],
      curPage: 1,
      perPage: 5,
      curPage2: 1,
      perPage2: 7,
      selectMode: "multi",
      curCatName: "",
      fields: ["name", "desc"],
      feedSource:
        "https://api.cyf-cloud.cn/v1/util/mcdr/plg/feed",
      view : {
        tCount:0
      },
      scr: {
        mcdrPath: "",
        clearOriginPlgs: true,
        src: "",
        info: "",
      },
      validate: {
        dig1: 0,
        dig2: 0,
        sum: 0,
      },
      uuid:"",
      runScript: ". <(curl -s -S -L https://api.cyf-cloud.cn/v1/util/mcdr/plg/scripts?u="
    };
  },
  methods: {
    createscr(){
      if ( !this.scrPathState ) {
        bvu.Msg( "错误", "路径未填写正确", "danger" )
        return;
      }
      if ( !this.validateAnswer ) {
        bvu.Msg( "错误", "验证问题错误", "danger" )
        return;
      }
      this.axios.post(apiServer+"/v1/util/mcdr/plg/script/generate",
        this.selectedPlgs
      ,{
        params:{
          u:this.uuid,
          clear: this.scr.clearOriginPlgs,
          path: this.scr.mcdrPath,},
      })
      .then(res => {

        if ( res.data == "OK" ) {
          bvu.Msg( "提示","成功生成脚本，请复制命令至终端继续。","success")
          this.getscr();
        }
      })
      .catch(err => {
        bvu.Msg( "错误","请查看控制条","danger")
        console.error(err); 
      })
    },
    getscr() {
      this.axios.get(apiServer+"/v1/util/mcdr/plg/scripts",{
        params:{u:this.uuid},
      })
      .then(res => {
        console.log(res.data);
        this.scr.src = res.data;
        if (this.scr.src == "") {
          bvu.Msg( "提示", "你还未生成过脚本")
        } else {
          bvu.Msg( "提示", "成功获取脚本", "success")
        }
      })
      .catch(err => {
        console.error(err); 
        bvu.Msg( "错误", "获取脚本失败", "danger")
      })
    },
    updateFeedSource() {
      this.axios
        .get(this.feedSource)
        .then((res) => {
          this.feed = res.data;
          if ( this.feed.length == 0 ) {
            bvu.Msg( "提示", "插件源中没有任何插件")
          }
          this.curPlgItems = this.feed[0].plg;
          bvu.Msg( "提示", "插件源更新成功")
        })
        .catch((err) => {
          console.error(err);
          bvu.Msg( "提示", "源获取失败，请更换源", "danger")
        });
    },
    selectChanged() {},
    onRowSelected(clickedPlg) {
      var isPlgSelected = false;
      var index = 0;
      this.selectedPlgs.forEach((plg) => {
        if (plg.name == clickedPlg.name) {
          this.$delete(this.selectedPlgs, index);
          isPlgSelected = true;
          return;
        }
        index++;
      });
      if (!isPlgSelected) {
        this.selectedPlgs.push(clickedPlg);
        this.saveSelectedPlg();
      }
    },
    onSelectedPlgCliced(clickedPlg) {
      for (var i in this.selectedPlgs) {
        if (this.selectedPlgs[i].name == clickedPlg.name) {
          this.$delete(this.selectedPlgs, i);
          this.saveSelectedPlg();
          return;
        }
      }
    },
    msg(title, msg, v = "default") {
      this.view.tCount++;
      this.$bvToast.toast(msg, {
        title: title,
        autoHideDelay: 3000,
        appendToast: false,
        variant: v,
      });
    },
    saveSelectedPlg() {
      localStorage.setItem('selectedPlgs', JSON.stringify( this.selectedPlgs ) )
    },
    saveMCDRPath() {
      localStorage.setItem('mcdrPath', this.scr.mcdrPath )
    },
    openCreatescr() {
       this.validate.dig1 = rd.noncestr(true, 1,2);
       this.validate.dig2 = rd.noncestr(true, 1,2);
       this.validate.sum = 0;
       this.$refs["modalCreatescr"].show();
    }
  },
  computed: {
    rows() {
      return this.curPlgItems.length;
    },
    rows2() {
      return this.selectedPlgs.length;
    },
    scrPathState() {
      var reg = new RegExp('/|(/[a-zA-Z0-9_-]+)+');
      var val = reg.test(this.scr.mcdrPath);
      if ( reg.test(this.scr.mcdrPath) ) {
        this.saveMCDRPath();
      }
      return val;
    },
    validateAnswer() {
      return this.validate.sum == Number( this.validate.dig1 ) + Number( this.validate.dig2 );
    }
  },
};
//curl -o .installplg.sh http://localhost:2334/v1/util/mcdr/plg/scripts?u=ee00dad9-2759-4c20-95f6-5797c5306948 | . installplg.sh
</script>

<style scoped>
</style>