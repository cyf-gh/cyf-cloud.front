<!--
 * @Date: 2020-10-07 19:34:34
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-29 16:28:17
 * @FilePath: \cyf-cloud.front\src\components\post\Reader.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<div class="mt-4 mx-2" style="background-color:#fff;">
    <br id="aaaTop"></br>
    <b-sidebar id="sidebar-reader-index" title="目录" right shadow>
        <div v-if="IndexList != null">
            <b-container>
            <p @click="jumpTop">开始</p>
            <div v-for="i in IndexList" :key="i.Name">
                <p @click="jumpTo(i.Name, i.Text)" :class="i.Class"> {{i.Text}}</p>
            </div>
            <p @click="jumpBottom">结束</p>
            </b-container>
        </div>
    </b-sidebar>
    <div v-if="!isPrivate">
        <div v-if="post != null" fluid>
            <div class="BlogAnchor">
                <div class="AnchorContent" id="AnchorContent"></div>
            </div>
            <b-container class="cc-md-info text-center">
                <br>
                <h4>{{post.Title}}</h4>
                <b-badge :href="authHref" variant="primary" v-if="post.MyPost">作者：<i>我自己</i></b-badge>
                <b-badge :href="authHref" variant="primary" v-else>作者：{{post.Author}}</b-badge>
                <b-badge variant="light">阅读量：{{post.ViewedCount}}</b-badge>
                <b-badge variant="light">最后编辑：{{post.Date}}</b-badge>
                <br>
                <b-badge variant="light" class="mr-1">标签：</b-badge>
                <b-badge variant="primary" v-for="tag in post.Tags" :key="tag.Post" :href="tagHref(tag)" class="mr-1">
                    {{tag}}
                </b-badge>
                <br>
                <b-badge variant="light">原始链接：</b-badge> <b-badge variant="light">{{location}}</b-badge>
                <br>
                <b-badge variant="primary" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">署名-非商业性使用-禁止演绎 4.0 国际</b-badge><b-badge variant="light">转载请保留原文链接及作者</b-badge>
            </b-container>
            <b-container class="cc-md-1">
                <hr>
                <div id="id-cc-reader" class="c-cc-reader"></div>
                <br>
            </b-container>
            <hr id="aaaBottom"></hr>
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
    </div>
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
// import Viewer from 'v-viewer'
// import Vue from 'vue'
// Vue.use(Viewer)

export default {
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

            isFav: false,
            like: null,
            IndexList: null,
        }
    },
    created() {

    },
    mounted() {
        localStorage.setItem("cc-reader-index", "[]")

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
                this.doView()
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
        this.checkFav()
        this.checkLikeIt()
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
        jumpTo( id, name ) {
            document.querySelector( id ).scrollIntoView(true);
            console.log( document.documentElement.scrollTop||document.body.scrollTop )
            var val = ( document.documentElement.scrollTop||document.body.scrollTop ) - 60
            console.log(val)
            $("body,html").animate({ scrollTop: val});
        },
        jumpTop() {
            document.querySelector( "#aaaTop" ).scrollIntoView(true);
        },
        jumpBottom() {
            document.querySelector( "#aaaBottom" ).scrollIntoView(true);
        },
        tagHref( tagName ) {
            return "/post?tag=" + tagName
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