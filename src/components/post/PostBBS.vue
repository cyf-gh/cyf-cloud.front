<!--
 * @Date: 2020-10-14 21:08:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-15 20:00:26
 * @FilePath: \cyf-cloud.front\src\components\post\PostBBS.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
    <!-- 限定post范围弹窗 -->
    <b-modal ref="modal-range-post" hide-footer title="限定范围">
        <b-container>
        <h5 class="mb-1">标签</h5>
        <small class="cc-detail-text text-center"
            >点选标签来缩小你的搜索范围</small
        >
        <br />
        <b-badge
            variant="light"
            v-for="tag in Tags"
            :key="tag.Text"
            @click="addSearchTag(tag)"
            class="mr-1 my-auto"
        >
            {{ tag.Text }}
        </b-badge>
        <b-form-group
            id="bbs-tags-separators-desc"
            description="勾选你想要的标签"
            label-for="id-bbs-tags-separators"
            class="mt-3"
        >
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
        <h3 class="text-center mb-2">文章列表</h3>
        <b-table
            :items="posts"
            :fields="fields"
            hover
            small
            :current-page="curPage"
            :per-page="perPage"
            @row-clicked="onSelectedPlgCliced"
        ></b-table>
        <b-pagination
            size="sm"
            align="center"
            v-model="curPage"
            :per-page="perPage"
            :total-rows="rows"
            aria-controls="id-all-posts"
        ></b-pagination>
        <b-button @click="showFilter" variant="light">显示筛选器</b-button>

        </b-card>
    </b-card-group>
    </div>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
  data() {
    return {
      fields: ["Title", "Date"],
      posts: [],
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
  },
  methods: {
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
      return this.posts.length;
    },
  },
};
</script>