<!--
 * @Date: 2020-10-07 19:34:34
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-12 19:39:22
 * @FilePath: \cyf-cloud.front\src\components\post\Reader.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<div class="mt-4 mx-2">
    <b-sidebar id="sidebar-reader-index" title="目录" right shadow>
        <div v-if="IndexList != null">
            <b-container>
            <p @click="jumpTop" style='color:darkblue;'>开始</p>
            <div v-for="i in IndexList" :key="i.Name">
                <p @click="jumpTo(i.Name, i.Text)" :class="i.Class"> {{i.Text}}</p>
            </div>
            <p @click="jumpBottom" style='color:darkblue;'>结束</p>
            <hr>
                <p @click='jumpTo("#id-cc-by-tag")'>标签检索</p>
                <p @click='jumpTo("#id-cc-by-date")'>日期检索</p>
                <p @click='jumpTo("#id-cc-by-recent")'>最近文章</p>
            <br>
            </b-container>
        </div>
    </b-sidebar>
    <b-container class="cc-md-card" v-if="!isPrivate" fluid="sm">
        <b-row>
            <b-col class="cc-md-col" lg="9">
                <div v-if="post != null" >
                <div class="BlogAnchor">
                    <div class="AnchorContent" id="AnchorContent"></div>
                </div>
                <b-card class="text-center">
                    <h4 id="aaaTop">{{post.Title}}</h4>
                    <b-badge :href="authHref" variant="primary" v-if="post.MyPost">作者：<i>我自己</i></b-badge>
                    <b-badge :href="authHref" variant="primary" v-else>作者：{{post.Author}}</b-badge>
                    <b-badge variant="light">阅读量：{{post.ViewedCount}}</b-badge>
                    <b-badge variant="light">最后编辑：{{post.Date}}</b-badge>
                    <br>
                    <b-badge variant="light" class="mr-1">标签：</b-badge>
                    <b-badge variant="light" v-for="tag in post.Tags" :key="tag.Post" :href="tagPostHref(tag)" class="mr-1">
                        {{tag}}
                    </b-badge>
                    <br>
                    <b-badge variant="light">原始链接：</b-badge> <b-badge variant="light">{{location}}</b-badge>
                    <br>
                    <b-badge variant="primary" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">署名-非商业性使用-禁止演绎 4.0 国际</b-badge><b-badge variant="light">转载请保留原文链接及作者</b-badge>
                </b-card>
                <b-card class="cc-md-1">
                    <div id="id-cc-reader" class="c-cc-reader"></div>
                    <br>
                </b-card>
                <div id="aaaBottom"/>
                <br>
                <b-navbar fixed="bottom" toggleable="sm">
                    <b-nav class="mr-0">
                        <small>本文共 {{postLength}} 字</small>
                    </b-nav>
                    <b-nav class="mx-auto">
                        <b-nav-form v-if="like != null">
                            <b-form-checkbox size="sm" class="my-auto" @change="doLikeIt" v-model="like.Liked">
                                点赞：{{like.Count}}
                            </b-form-checkbox>
                            <b-form-checkbox size="sm" class="ml-2 my-auto" @change="doFav" v-model="isFav">
                                收藏
                            </b-form-checkbox>
                            <b-badge href="#" class="ml-3 my-auto" variant="light" v-if="post.MyPost" @click="edit">编辑</b-badge>
                        </b-nav-form>
                        <!-- 收藏，点赞模块 -->
                    </b-nav>
                    <b-nav class="ml-0">
                        <b-badge variant="light" v-b-toggle.sidebar-reader-index size="sm">目录</b-badge>
                        <!-- 还没有东西  -->
                    </b-nav>
                </b-navbar>
                </div>
            </b-col>
            <b-col class="cc-md-col" lg="3">
                <b-card id="id-cc-by-tag" class="mb-2">
                    <h4>标签检索</h4>
                    <hr>
                    <tagList :tags="cateTag"></tagList>
                </b-card>
                <b-card id="id-cc-by-date" class="mb-2">
                    <h4>日期检索</h4>
                    <hr>
                    <div v-for="date in cateDate" :key="date.Text">
                        <a :href="dateHref(date.Text)">{{date.Text}} ({{date.Count}})</a>
                        <br>
                    </div>
                </b-card>
                <b-card id="id-cc-by-recent">
                    <h4>最近文章</h4>
                    <hr>
                    <div v-for="recent in cateRecent" :key="recent.Id">
                        <a :href="recentPostHref(recent.Id)">{{recent.Title}}</a>
                        <br>
                    </div>
                </b-card>
            </b-col>
        </b-row>

    </b-container>
    <div v-else class="text-center">
        <h2>你访问的文章不公开</h2>
        <br>
        <b-avatar size="4em" variant="warning">闭门<br>羹</b-avatar>
        <h3 class="mt-4"><b-badge href="/posts" variant="light">看看其他</b-badge> </h3>
    </div>
</div>
</template>
<script>
import apiAddr from '../../server'
import err from '../../cc/v1x1/HttpErrReturn'
import md from "../../cc/markdown";
import bvUtil from '../../cc/bvUtil';
import '../../cc/css/markdown-cc-style.css'
import tagList from "./TagList"
import idy from "../../cc/v1x1/Identity";
// import Viewer from 'v-viewer'
// import Vue from 'vue'
// Vue.use(Viewer)

export default {
    components: {
        tagList
    },
    metaInfo() {
        return {
          title: this.postTitle,
          titleTemplate: '%s - 博客 - cyf-cloud',
          htmlAttrs: {
            lang: 'zh-cn',
            amp: true
            }
        }
    },
    data() {
        return {
            /**
                Title string
                Text string
                Tags[] string
                Author string
                Date string
             */
            post: null,
            postId: -1,
            authHref: '',
            isPrivate: false,
            postTitle: "",
            isFav: false,
            like: null,
            IndexList: null,

            cateDate: null,
            cateTag: null,
            cateRecent: null,
        }
    },
    created() {

    },
    mounted() {
        localStorage.setItem("cc-reader-index", "[]")
        idy.InitCookie(this.$cookie);
        this.postId = this.$route.query.id
        this.axios.get( apiAddr + "/v1x1/post", {
            params:{id: this.postId},
            withCredentials: true
        })
        .then(res => {
            if ( err.Check( res.data ) ) {
                this.post = JSON.parse( res.data.Data )
                this.authHref = "/user?name=" + this.post.Author
                // 只有在文章为公开时才增加阅读数量
                this.getAchieveDate()
                this.getAchieveRecent()
                this.getAchieveTag()
                this.doView()
                this.postTitle = this.post.Title
            } else {
                if ( res.data.ErrCod == "-5" ) {
                    this.isPrivate = true
                } else {
                    console.error("in post reader loading post", err.data.Desc)
                }
            }
        })
        .catch(err => {
            console.error(err);
        })

        if ( idy.IsLogin() ) {
            this.checkFav()
            this.checkLikeIt()
        } 
    },
    updated() {
        if ( this.IndexList == null ){
            md.SetRawMarkdownToDiv(
                    this.post.Text,
                "id-cc-reader"
            )
            this.IndexList = JSON.parse( localStorage.getItem("cc-reader-index") )
            console.log(this.IndexList)
        }
    },
    methods: {
        tagPostHref( tagName ) {
            return "/posts?tags=" + tagName
        },
        getAchieveDate() {
             this.axios.get( apiAddr + "/v1x1/posts/achieve/date", {
                params:{au: this.post.Author},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    this.cateDate = JSON.parse( res.data.Data )
                    return;
                } else {
                    console.error("in post achieve date get", err.data.Desc)
                }
            })
        },
        getAchieveRecent() {
             this.axios.get( apiAddr + "/v1x1/posts/achieve/recent", {
                params:{au: this.post.Author},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    this.cateRecent = JSON.parse( res.data.Data )
                    this.cateRecent.reverse();
                    return;
                } else {
                    console.error("in post achieve recent get", err.data.Desc)
                }
            })
        },
        getAchieveTag() {
             this.axios.get( apiAddr + "/v1x1/posts/achieve/tag", {
                params:{au: this.post.Author},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    this.cateTag = JSON.parse( res.data.Data )
                    return;
                } else {
                    console.error("in post achieve tag get", err.data.Desc)
                }
            })
        },
        jumpTo( id ) {
            document.querySelector( id ).scrollIntoView(true);
            console.log( document.documentElement.scrollTop||document.body.scrollTop )
            var val = ( document.documentElement.scrollTop||document.body.scrollTop ) - 60
            console.log(val)
            $("body,html").animate({ scrollTop: val});
        },
        jumpTop() {
            this.jumpTo( "#aaaTop" );
        },
        jumpBottom() {
            this.jumpTo( "#aaaBottom" );
        },
        dateHref( date ) {
            return "/posts?date=" + date
        },
        recentPostHref( id ) {
            return "/post/reader?id=" + id
        },

        edit() {
            this.$router.push({path:'/post/editor?mode=modify' +'&id='+ this.postId})
        },
        doView() {
            this.axios.get( apiAddr + "/v1x1/post/view", {
                params:{id: this.postId},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    return;
                } else {
                    console.error("in post reader do view", err.data.Desc)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        doFav() {
            var favApi = this.isFav ? "/v1x1/post/fav/remove" : "/v1x1/post/fav/add"
            var info = this.isFav ? "移除收藏成功" : "添加收藏成功"
                this.axios.get( apiAddr + favApi, {
                    params:{id: this.postId},
                    withCredentials: true
                })
                .then(res => {
                    if ( err.Check( res.data ) ) {
                        bvUtil.Msg( "成功", info, "success" )
                        this.checkFav()
                    } else {
                        console.error("in post reader add fav", err.data.Desc)
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
        },
        doLikeIt() {
            var info = this.like.Liked ? "移除点赞成功" : "点赞成功"

            this.axios.get( apiAddr + "/v1x1/post/like", {
                params:{id: this.postId},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    bvUtil.Msg( "成功", info, "success" )
                    this.checkLikeIt()
                } else {
                    console.error("in post reader do view", err.data.Desc)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        checkLikeIt() {
            this.axios.get( apiAddr + "/v1x1/post/like/count", {
                params:{id: this.postId},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    console.log( res.data.Data )
                    this.like = JSON.parse( res.data.Data )
                } else {
                    console.error("in post reader check like it", err.data.Desc)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        checkFav() {
            this.axios.get( apiAddr + "/v1x1/post/fav/check", {
                params:{id: this.postId},
                withCredentials: true
            })
            .then(res => {
                if ( err.Check( res.data ) ) {
                    this.isFav = res.data.Data == "1"
                } else {
                    console.error("in post reader check fav it", err.data.Desc)
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
    },
    computed: {
        postLength() {
            return this.post == null ? 0 : this.post.Text.length;
        },
        location() {
            return window.location
        }
    },
}
</script>
