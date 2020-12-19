<!--
 * @Date: 2020-10-14 21:08:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-04 14:05:11
 * @FilePath: \cyf-cloud.front\src\components\post\info\PostCardList.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
        <!-- 限定post范围弹窗 -->
        <b-modal ref="modal-range-post" hide-footer title="限定范围">
            <b-container>
                <h5 class="mx-1">标签</h5>
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
                    <b-button @click="rangeByTags" variant="light"
                        >搜索</b-button
                    >
                    <b-button @click="hideFilter" variant="light"
                        >取消</b-button
                    >
                </b-button-group>
            </b-container>
        </b-modal>
        <!-- 列表 -->
        <b-container fluid="lg">
            <div>
                <div v-if="SelectedTags != null" class="text-center">
                    <h3 class="text-center mt-4">{{this.ListTitle}}</h3>
                    <div v-if="SelectedTags.length != 0">
                    当前选中的标签：
                        <b-badge
                            variant="primary"
                            v-for="t in SelectedTags"
                            :key="t"
                            class="mr-1 mb-2"
                        >
                        {{ t }}
                        </b-badge>
                    </div>
                </div>
                <div v-if="postCurPage == null">
                    <h2 class="text-center">没有相应的文章</h2>
                </div>
                <div v-else>
                    <cc-postinfos :posts="postCurPage"></cc-postinfos>
                </div>
            </div>
            <!--  -->
            <b-navbar fixed="bottom" toggleable="sm">
                <b-nav class="mr-0">
                    <small>一共有 {{ rows }} 篇</small>
                </b-nav>
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
                    <b-button @click="showFilter" variant="light" size="sm"
                        >显示筛选器</b-button
                    >
                </b-nav>
            </b-navbar>
        </b-container>
    </div>
</template>

<script>
import apiAddr from "../../../server";
import err from "../../../cc/v1x1/HttpErrReturn";
import postInfos from "./PostCards";

export default {
    metaInfo() {
        return {
            title: this.listTitle,
            titleTemplate: '%s - cyf-cloud',
            htmlAttrs: {
                lang: 'zh-cn',
                amp: true
            }
        }
    },
    name: "cc-post-list",
    components: {
        "cc-postinfos": postInfos,
    },
    data() {
        return {
            fields: ["Title", "Date"],
            posts: [],
            showPosts: [],
            curPage: 1,
            perPage: 7,
            Tags: [],
            TagNames: [],
            SelectedTags: [],
        };
    },
    props: {
        PostUrl: String, // "/v1x1/posts/info" by default
        ClientFilter: Boolean,
        ListTitle: String, //
    },
    created() {
        this.onload();
    },
    methods: {
        onload() {
            this.axios
                .get(apiAddr + "/v1x1/tags", { withCredentials: true })
                .then((res) => {
                    if (err.Check(res.data)) {
                        this.Tags = JSON.parse(res.data.Data);
                        this.Tags.forEach((tag) => {
                            this.TagNames.push(tag.Text);
                        });
                    } else {
                        console.error(
                            "in tag list loading all posts",
                            res.data.Desc
                        );
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            var CateDate = this.$route.query.date
            if ( CateDate != undefined ) {
                this.axios
                    .get(apiAddr + "/v1x1/posts/info/by/date"+"?date="+CateDate, { withCredentials: true })
                    .then((res) => {
                        if (err.Check(res.data)) {
                            this.posts = JSON.parse(res.data.Data);
                        } else {
                            console.error(
                                "in post list loading all posts",
                                res.data.Desc
                            );
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                return
            }
            var CateTags = this.$route.query.tags
            if ( CateTags != undefined ) {
                this.SelectedTags = CateTags.split(",")
                this.rangeByTags()
                return
            }
            this.axios
                .get(apiAddr + this.PostUrl, { withCredentials: true })
                .then((res) => {
                    if (err.Check(res.data)) {
                        this.posts = JSON.parse(res.data.Data);
                    } else {
                        console.error(
                            "in post list loading all posts",
                            res.data.Desc
                        );
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        onSelectedPlgCliced(clicked) {
            for (var i in this.posts) {
                if (this.posts[i].Id == clicked.Id) {
                    this.$router.push({
                        path: "/post/reader?id=" + clicked.Id,
                    });
                    return;
                }
            }
        },
        addSearchTag(tag) {
            this.SelectedTags.push(tag.Text);
        },
        rangeByTags() {
            if (this.SelectedTags == null) {
                this.onload();
                this.hideFilter();
                return;
            }
            if (this.SelectedTags.length == 0) {
                this.onload();
                this.hideFilter();
                return;
            }
            if (this.ClientFilter) {
                this.onload();
                this.posts = 
                console.log("TODO: client filter");
            } else {
                this.axios
                    .get(
                        apiAddr +
                            "/v1x1/posts/info/by/tag?tags=" +
                            this.SelectedTags.toString(),
                        { withCredentials: true }
                    )
                    .then((res) => {
                        if (err.Check(res.data)) {
                            this.posts = JSON.parse(res.data.Data);
                            this.hideFilter();
                        } else {
                            console.error(
                                "in tag list loading all posts",
                                res.data.Desc
                            );
                        }
                    });
            }
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
            return this.posts == null ? 0 : this.posts.length;
        },
        postCurPage() {
            if (this.posts == null) {
                return null;
            }
            var start = (this.curPage - 1) * this.perPage;
            return this.posts.slice(start, start + this.perPage);
        },
        listTitle() {
            return this.ListTitle == "文章列表 " ? this.title : this.ListTitle;
        },
    },
};
</script>
