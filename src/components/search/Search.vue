<!--
 * @Date: 2020-12-04 13:53:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 00:34:39
 * @FilePath: \cyf-cloud.front\src\components\search\Search.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container fluid="md">
        <b-row>
        <b-col md="9" class="no-pd">
            <b-row>
                <b-col md="12" class="no-pd">
                <b-card>
                <h4 class="text-center mb-3">
                    cyf-cloud 搜索 <b-badge variant="primary">v1x1</b-badge>
                </h4>
                <b-form-row>
                    <b-col sm="2" cols="3" class="no-pd2">
                    <b-form-select
                        id="id-cc-select-search-genre"
                        class="ml-auto"
                        v-model="Genre"
                        :options="AllGenre"
                        required
                    ></b-form-select>
                    </b-col>

                    <b-col sm="9" cols="6" class="no-pd2">
                    <b-form-input
                        class="ml-1"
                        id="id-cc-input-search"
                        v-model="Text"
                        style="width=100%"
                    ></b-form-input>
                    </b-col>

                    <b-col sm="1" cols="3" class="no-pd2">
                    <b-button class="mr-auto ml-2" variant="light" 
                    @click="doSearch" block
                        >搜索</b-button>
                    </b-col>
                </b-form-row>
                </b-card>
                </b-col>
            </b-row>
            <b-row>
                <b-col md= "8" class="no-pd">
                    <cc-search-post :text="Text"></cc-search-post>
                </b-col>
                <b-col md= "4" class="no-pd">
                    <cc-search-user :text="Text"></cc-search-user>
                </b-col>
            </b-row>
        </b-col>
        <b-col md="3" class="text-center no-pd">
            <b-card>
            <p>⌚ 搜索历史<b-badge class="ml-3" variant="light" href="#" @click="clearHistory">🗑️ 清空</b-badge></p>
            <hr>
            <div v-for="hi in searchHistory" :key="hi">
                <a :href="searchUrl(hi)">{{hi}}</a>
            </div>
            </b-card>
        </b-col>
        </b-row>
    </b-container>
</template>

<script>
import sh from "../../cc/searchHistory"
import post from "./Post"
import user from "./User"

export default {
    components:{
        "cc-search-post": post,
        "cc-search-user": user,
    },
    data() {
        return {
            Text: "",
            Genre: "全部",
            AllGenre: ["全部", "文章", "用户"],
            searchHistory: [],
        };
    },
    metaInfo() {
        return {
          title: this.Text + " - 搜索结果",
          titleTemplate: '%s - cyf-cloud',
          htmlAttrs: {
            lang: 'zh-cn',
            amp: true
            }
        }
    },
    created() {
        this.Text = this.$route.query.text;
        this.searchHistory = sh.GetSearchHistoryList().reverse()
    },
    mounted() {
    },
    methods: {
        clearHistory() {
            sh.ClearSearchHistory();
            this.searchHistory = [];
        },
        doSearch() {
            sh.AddSearchHistory(this.Text)
            switch (this.Genre) {
                case "全部":
                    this.$router.push({ path: "/search?text=" + this.Text });
                    location.reload()
                    break;
                case "文章":
                    this.$router.push({ path: "/search/post?text=" + this.Text });
                break;
                case "用户":
                    this.$router.push({ path: "/search/user?text=" + this.Text });
                break;
                default:
                break;
            }
        },
        searchUrl( text ) {
            return "/search?text="+text;
        }
    },
};
</script>

<style scoped>
@media screen and (min-width: 992px) {
    .no-pd {
        padding-right: 0px;
        padding-left: 0px;
        width:100%;
    }
    .no-pd2 {
        padding-right: 0px;
        padding-left: 0px;
    }
}
@media screen and (max-width: 992px) {
    .no-pd {
        margin-top: 1rem;
    }
}
</style>