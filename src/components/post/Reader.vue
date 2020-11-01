<!--
 * @Date: 2020-10-07 19:34:34
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-01 14:06:04
 * @FilePath: \cyf-cloud.front\src\components\post\Reader.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<b-container>
    <b-card v-if="!isPrivate">
        <b-container style="background-color:white" v-if="post != null">
            <br>
            <b-row>
            <b-col><h2>{{post.Title}}</h2></b-col>
            <b-col><b-button variant="light" class="cc-put-right" v-if="post.MyPost" @click="edit">编辑</b-button></b-col>
            </b-row>
            <div>
                <b-badge :href="authHref" variant="light" v-if="post.MyPost">作者：<i>我自己</i></b-badge>
                <b-badge :href="authHref" variant="light" v-else>作者：{{post.Author}}</b-badge>
                <b-badge variant="light">阅读量：{{post.ViewedCount}}</b-badge>
                <br>
                <b-badge variant="light">最后编辑：{{post.Date}}</b-badge>
                <br>
                <b-badge variant="light" class="mr-1">标签：</b-badge>
                <b-badge variant="dark" v-for="tag in post.Tags" :key="tag" :href="tagHref(tag)" class="mr-1">
                    {{tag}}
                </b-badge>
            </div>
            <hr>
            <div id="id-cc-reader"></div>
            <br>
            <b-navbar fixed="bottom" toggleable="sm" v-if="like != null">
                <b-nav class="mr-0">
                    <small>本文共 {{postLength}} 字</small>
                </b-nav>
                <b-nav class="mx-auto">
                    <b-nav-form>
                        <b-form-checkbox @change="doLikeIt" v-model="like.Liked">
                            点赞：{{like.Count}}
                        </b-form-checkbox>
                        <b-form-checkbox class="ml-2" @change="doFav" v-model="isFav">
                            收藏
                        </b-form-checkbox>
                    </b-nav-form>
                    <!-- 收藏，点赞模块 -->
                </b-nav>
                <b-nav class="ml-0">
                    <!-- 还没有东西  -->
                </b-nav>
            </b-navbar>
        </b-container>
    </b-card>
    <b-card v-else class="text-center">
        <h2>你访问的文章不公开</h2>
        <br>
        <b-avatar size="4em" variant="warning">闭门<br>羹</b-avatar>
        <h3 class="mt-4"><b-badge href="/posts" variant="light">看看其他</b-badge> </h3>
    </b-card>
</b-container>
</template>

<script>
import apiAddr from '../../server'
import err from '../../cc/v1x1/HttpErrReturn'
import md from "../../cc/markdown";
import bvUtil from '../../cc/bvUtil';

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
        }
    },
    created() {
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
    mounted() {

    },
    updated() {
        md.SetRawMarkdownToDiv(
            this.post.Text,
            "id-cc-reader"
        )
    },
    methods: {
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
        }
    },
}
</script>