<!--
 * @Date: 2020-10-07 19:34:34
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-07 21:42:27
 * @FilePath: \cyf-cloud.front\src\components\post\Reader.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<b-container>
    <b-card v-if="!isPrivate">
        <b-container style="background-color:white" v-if="post != null">
            <br>
            <h2>{{post.Title}}</h2>
            <div>
                <b-badge :href="authHref" variant="light">作者：{{post.Author}}</b-badge>
                <br>
                <b-badge variant="light">最后编辑：{{post.Date}}</b-badge>
                <br>
                <b-badge variant="light" class="mr-1">标签：</b-badge>
                    <b-badge variant="dark" v-for="tag in post.Tags" :href="tagHref(tag)" class="mr-1">
                        {{tag}}
                </b-badge>
            </div>
            <hr>
            <div id="id-cc-reader"></div>
            <br>
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
        }
    },
    mounted() {
        this.postId = this.$route.query.id
        this.axios.get( apiAddr + "/v1x1/post", {
            params:{id: this.postId},
            withCredentials: true
        })
        .then(res => {
            if ( err.Check( res.data ) ) {
                this.post = JSON.parse( res.data.Data )
                this.authHref = "/user?name=" + this.post.Author
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
        }
    }
    
}
</script>