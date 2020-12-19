<!--
 * @Date: 2020-12-05 12:21:10
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 20:19:43
 * @FilePath: \cyf-cloud.front\src\components\account\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <b-container fluid="md" v-if="u != null">
        <b-card>
            <b-row>
                <b-col class="text-center mb-3" lg="3" md="4">
                    <b-img-lazy
                        rounded="circle"
                        class="mb-2"
                        :src="u.Avatar"
                        alt="Kitten"
                        height="147"
                        width="147"
                        />
                        <br>
                        <h2 class="d-inline">{{u.Name}}</h2><b-badge class="d-inline ml-2" variant="light">UID: {{u.Id}}</b-badge>
                </b-col>
                <b-col lg="9" md="7">
                    <b-tabs>
                    <b-tab v-if="u.Info.Markdown.length!=0" title="简介" class="cc-tab-border" active >
                        <br>
                        <div id="id-cc-user-home-info" class="c-cc-reader"></div>
                        <hr>
                        <small style="color:gray;">上次更新：{{u.Info.LastUpdate}}</small>
                        <br>
                    </b-tab>
                    <b-tab v-if="u.Gears.Markdown.length!=0" title="设备" class="cc-tab-border">
                        <br>
                        <div id="id-cc-user-home-gears" class="c-cc-reader"></div>
                        <hr>
                        <small style="color:gray;">上次更新：{{u.Info.LastUpdate}}</small>
                        <br>
                    </b-tab>
                    <b-tab v-if="u.Projects.Markdown.length!=0" title="项目" class="cc-tab-border">
                        <br>
                        <div id="id-cc-user-home-projects" class="c-cc-reader"></div>
                        <hr>
                        <small style="color:gray;">上次更新：{{u.Info.LastUpdate}}</small>
                        <br>
                    </b-tab>
                    <b-tab title="博客" class="cc-tab-border">
                        <cc-post-list
                            :PostUrl="postUrl()"
                            :ClientFilter="clientFilter"
                            ListTitle="文章列表 "
                        ></cc-post-list>
                        <br>
                    </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
        </b-card>

    </b-container>
</template>

<script>
import apiAddr from '../../server'
import err from "../../cc/v1x1/HttpErrReturn";
import md from "../../cc/markdown";
import postList from "../post/info/PostCardList";

export default {
    metaInfo() {
        return {
          title: this.uName + "的个人主页",
          titleTemplate: '%s - cyf-cloud',
          htmlAttrs: {
            lang: 'zh-cn',
            amp: true
            }
        }
    },
    components: {
        "cc-post-list": postList,
    },
    data() {
        return {
            id: -1,
            u: null,
            uName: "",
        }
    },
    mounted() {
        this.id = this.$route.query.id
        // 获取用户信息
        this.axios.get( apiAddr + "/v1x1/account/info/home?uid="+this.id, { withCredentials: true } )
        .then(res => {
            if (err.Check(res.data)) {
                this.u = JSON.parse( res.data.Data )
                this.uName = this.u.Name                
            } else {
                console.error(res.Desc);
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
    updated() {
        md.SetRawMarkdownToDiv(
            this.u.Info.Markdown,
            "id-cc-user-home-info"
        )
        md.SetRawMarkdownToDiv(
            this.u.Gears.Markdown,
            "id-cc-user-home-gears"
        )
        md.SetRawMarkdownToDiv(
            this.u.Projects.Markdown,
            "id-cc-user-home-projects"
        )
    },
    methods: {
        postUrl() {
            return "/v1x1/posts/info?user="+this.u.Name
        }
    },
}
</script>