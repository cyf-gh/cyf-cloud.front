<!--
 * @Date: 2020-08-29 21:54:19
 * @LastEditors: cyf
 * @LastEditTime: 2020-08-30 02:24:00
 * @FilePath: \cyf-cloud.front\src\components\mcdrPlg\mcdrPlgHome.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
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
          <small class="d-block mb-3 text-muted">官方插件源地址：<br>https://raw.githubusercontent.com/cyf-gh/MCDRPluginCataJson/master/feed.json</small>
      <b-alert show variant="info">
        <h4 class="alert-heading">使用方法</h4>
        <p>
          1. 在插件市场中点击一次则会勾选该插件。点击已经选过的插件会取消对该插件的选择。
          <br />2. 再选中的所有插件列表中，点击任意插件可取消对该插件的选择。
        </p>
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
      <b-button>生成安装脚本</b-button>
      <b-button></b-button>
      <b-button variant="info" v-b-toggle.sidebar-plg-market>打开插件市场</b-button>
      </b-button-group>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.updateFeedSource();
  },
  data() {
    return {
      feed: "",
      curPlgItems: "",
      selectedPlgs: [],
      curPage: 1,
      perPage: 5,
      curPage2: 1,
      perPage2: 7,
      selectMode: "multi",
      curCatName: "",
      fields: ["name", "desc"],
      feedSource:
        "https://raw.githubusercontent.com/cyf-gh/MCDRPluginCataJson/master/feed.json",
    };
  },
  methods: {
    updateFeedSource() {
      this.axios
        .get(this.feedSource)
        .then((res) => {
          this.feed = res.data;
          this.selectedPlgs = [];
        })
        .catch((err) => {
          console.error(err);
        });
        this.curPlgItems = this.selectedPlgs[0].plg;
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
      }
    },
    onSelectedPlgCliced(clickedPlg) {
      for (var i in this.selectedPlgs) {
        if (this.selectedPlgs[i].name == clickedPlg.name) {
          this.$delete(this.selectedPlgs, i);
          return;
        }
      }
    },
  },
  computed: {
    rows() {
      return this.curPlgItems.length;
    },
    rows2() {
      return this.selectedPlgs.length;
    },
  },
};
</script>

<style scoped>
.card {
  border: none;
}
</style>