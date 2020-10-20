<!--
 * @Date: 2020-10-14 21:08:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-20 23:08:21
 * @FilePath: \cyf-cloud.front\src\components\post\PostBBS.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container>
    <!-- 限定post范围弹窗 -->
    <b-modal ref="modal-range-post" hide-footer title="限定范围">
        <b-container>
        <h5 class="mb-1">标签</h5>
        <small class="cc-detail-text text-center">点选标签来缩小你的搜索范围</small>
        <br />
        <b-badge
            variant="light"
            v-for="tag in Tags"
            :key="tag.Text"
            @click="addSearchTag(tag)"
            class="mr-1 my-auto">
        {{ tag.Text }}
        </b-badge>
        <b-form-group
          id="bbs-tags-separators-desc"
          description="勾选你想要的标签"
          label-for="id-bbs-tags-separators"
          class="mt-3">
        <b-form-tags
          v-if="SelectedTags != null"
          input-id="id-bbs-tags-separators"
          v-model="SelectedTags"
          separator=" ,;"
          placeholder="使用半角逗号，分号，空格隔开"
          no-add-on-enter
          ></b-form-tags>
          </b-form-group>
        <b-button-group style="width: 100%" class="my-3">
            <b-button @click="rangeByTags" variant="light">搜索</b-button>
            <b-button @click="hideFilter" variant="light">取消</b-button>
        </b-button-group>
        </b-container>
    </b-modal>
    <!-- 限定post范围弹窗 -->
    <b-card-group deck>
        <b-card>
        <div v-if="SelectedTags!=null" class="text-center">
          <h3 class="text-center mb-2">文章列表</h3>
          <b-badge variant="primary" v-for="t in SelectedTags" :key="t" class="mr-1">
            {{t}}
          </b-badge>
        </div>
        <div v-if="postCurPage == null">
          <h2 class="text-center">没有相应的文章</h2>
        </div>
        <div v-else>
          <b-card class="ps-info" v-for="p in postCurPage" :key="p.Id" @click="viewPost(p)">
          <b-row>
            <b-col>
              <h6>{{p.Title}}</h6>
            </b-col>
            <b-col>
              <small style="float:right">浏览量：{{p.ViewedCount}}</small>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <small>创建日期：<b-badge variant="light">{{p.CreateDate}}</b-badge></small>
            </b-col>
            <b-col>
              <small style="float:right">作者：<b-badge variant="light">{{p.Author}}</b-badge></small>
            </b-col>
          </b-row>
          <b-row v-if="p.Tags!=null">
            <b-col>
              <small>标签：</small>
              <b-badge variant="light" v-for="t in p.Tags" :key="t" class="mr-1">
                {{t}}
              </b-badge>
            </b-col>
          </b-row>
          </b-card>
        </div>
        <!-- <b-table
            :items="posts"
            :fields="fields"
            hover
            small
            :current-page="curPage"
            :per-page="perPage"
            @row-clicked="onSelectedPlgCliced"
        ></b-table> -->
        <!--概述-->
        </b-card>
      <b-navbar fixed="bottom" toggleable="sm" >
      <b-nav class="mx-auto">
        <b-pagination
            size="sm"
            v-model="curPage"
            :per-page="perPage"
            :total-rows="rows"
            aria-controls="id-all-posts"
            pills
            
        ></b-pagination>
      </b-nav>
      <b-nav class="ml-0">
        <b-button @click="showFilter" variant="light">显示筛选器</b-button>
      </b-nav>
      </b-navbar>
    </b-card-group>
    </b-container>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
  data() {
    return {
      fields: ["Title", "Date"],
      posts: [],
      showPosts: [],
      curPage: 1,
      perPage: 7,
      Tags: [
        { Id: 1, Text: "aaa", IsCatalog: false, Percentage: 0 },
        { Id: 2, Text: "bbb", IsCatalog: false, Percentage: 0 },
        { Id: 3, Text: "ccc", IsCatalog: false, Percentage: 0 },
        { Id: 4, Text: "dddd", IsCatalog: false, Percentage: 0 },
        { Id: 5, Text: "pmTag1", IsCatalog: false, Percentage: 0 },
        { Id: 6, Text: "pmTag2", IsCatalog: false, Percentage: 0 },
        { Id: 7, Text: "pmTag_New", IsCatalog: false, Percentage: 0 },
        { Id: 8, Text: "dev_xxs_test", IsCatalog: false, Percentage: 0 },
        { Id: 9, Text: "new", IsCatalog: false, Percentage: 0 },
      ],
      TagNames: [],
      SelectedTags: [],
    };
  },
  created() {
    this.onload()
  },
  methods: {
    onload() {
      this.axios
      .get(apiAddr + "/v1x1/posts/info", { withCredentials: true })
      .then((res) => {
        if (err.Check(res.data)) {
          this.posts = JSON.parse(res.data.Data);
        } else {
          console.error("in post list loading all posts", res.data.Desc);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    this.axios
      .get(apiAddr + "/v1x1/tags", { withCredentials: true })
      .then((res) => {
        if (err.Check(res.data)) {
          this.Tags = JSON.parse(res.data.Data);
          this.Tags.forEach((tag) => {
            this.TagNames.push(tag.Text);
          });
        } else {
          console.error("in tag list loading all posts", res.data.Desc);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
    ,
    viewPost( p ) {
      this.$router.push({ path: "/post/reader?id=" + p.Id });
    },
    onSelectedPlgCliced(clicked) {
      for (var i in this.posts) {
        if (this.posts[i].Id == clicked.Id) {
          this.$router.push({ path: "/post/reader?id=" + clicked.Id });
          return;
        }
      }
    },
    addSearchTag(tag) {
      this.SelectedTags.push(tag.Text);
    },
    rangeByTags() {
      if ( this.SelectedTags == null ) {
        this.onload();
        this.hideFilter();
        return;
      }
      if ( this.SelectedTags.length == 0 ) {
        this.onload();
        this.hideFilter();
        return;
      }
      this.axios
        .get(
          apiAddr + "/v1x1/posts/by/tag?tags=" + this.SelectedTags.toString(),
          { withCredentials: true }
        )
        .then((res) => {
          if (err.Check(res.data)) {
            this.posts = JSON.parse(res.data.Data);
            this.hideFilter();
          } else {
            console.error("in tag list loading all posts", res.data.Desc);
          }
        });
    },
    showFilter() {
      this.$refs["modal-range-post"].show();
    },
    hideFilter() {
      this.$refs["modal-range-post"].hide();
    },
  },
  computed: {
    rows() {
      return this.posts == null ? 0: this.posts.length;
    },
    postCurPage() {
      if ( this.posts == null ) {
        return null
      }
      var start = ( this.curPage - 1 ) * this.perPage
      return this.posts.slice( start, start + this.perPage )
    }
  },
};
</script>