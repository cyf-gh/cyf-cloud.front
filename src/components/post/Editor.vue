/* eslint-disable vue/valid-v-for */
<!--
 * @Date: 2020-09-14 20:05:30
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 22:52:10
 * @FilePath: \cyf-cloud.front\src\components\post\Editor.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<div>
    <div v-if="!canNotModify">

        <b-sidebar id="cc-sidebar-draft" aria-labelledby="sidebar-no-header-title" backdrop-variant="dark" no-header backdrop shadow>
            <ccDfBox></ccDfBox>
        </b-sidebar>

    <b-container fluid v-if="this.post!=null">
        <b-card-group deck>
        <b-card title="编辑" content-class="mt-3" align="center">
            <input v-model="post.Title" placeholder="文章标题" type="text" class="form-control mb-3">
            <b-form-textarea
            id="textarea"
            v-model="post.Text"
            placeholder="Markdown"
            rows="10"
            max-rows="15"
            ></b-form-textarea>
            <br>
            <b-form-tags
            input-id="tags-separators"
            v-model="post.Tags"
            separator=" ,;"
            placeholder="使用半角逗号，分号，空格隔开"
            no-add-on-enter
            ></b-form-tags>
        </b-card>
        <b-card title="预览" v-on:click="refreshPreview">
            <b-container style="background-color:white">
                <br>
                <h2>{{post.Title}}</h2>
                <div>
                    <b-badge variant="light">作者：{{post.Author}}</b-badge>
                    <br>
                    <b-badge variant="light">最后编辑：{{post.Date}}</b-badge>
                    <br>
                    <b-badge variant="light" class="mr-1">标签：</b-badge>
                    <b-badge variant="dark" v-for="tag in post.Tags" class="mr-1">
                        {{tag}}
                    </b-badge>
                </div>
                <hr>
                <div :id="divId"></div>
                <br>
            </b-container>
        </b-card>

        </b-card-group>
        <br>
        <b-navbar fixed="bottom" toggleable="lg" type="light" variant="light" >
            <b-button variant="light" v-on:click="goPost" >发表</b-button>
            <b-button variant="light" v-on:click="refreshPreview" class="ml-2">预览刷新</b-button>
            <b-button variant="light" v-on:click="savedDraft" class="ml-2">保存草稿</b-button>
            <b-button variant="light" v-b-toggle.cc-sidebar-draft class="ml-2">显示草稿箱</b-button>
            <b-form-checkbox switch class="ml-2" v-model="isPrivate">设为隐私文章</b-form-checkbox>
            <small class="ml-5 my-auto" style="color: blue;border-style: dotted;border-width:2px" >{{status}}</small>
        </b-navbar>
    </b-container>
    </div>
    <div v-else class="text-center">
        <h1>你无法修改这篇文章<br>没有权限</h1>
    </div>
</div>
</template>

<script>
import md from "../../cc/markdown";
import apiAddr from '../../server'
import err from '../../cc/v1x1/HttpErrReturn'
import df from './Draft'
import ccDfBox from './Draftbox'

export default {
    components:{
        ccDfBox
    },
    data() {
    return {
        isDuo: true,

        divId:'cc-editor-preview',

        post: null,
        isModifiy: false,
        postId: -1,

        canNotModify: false,

        isPrivate: false,

        status: "status"
    }
    },
    methods: {
        savedDraft() {
            var res = confirm("确认保存？")
            if(res) {
                df.SaveDraft( this.post )
                this.status = "草稿已保存"
            }
        },
        refreshPreview() {
            md.SetRawMarkdownToDiv(
                this.post.Text,
                this.divId
            )
            this.getLastModifTime()
            this.status = "预览已刷新"
        },
        goPost() {
            switch (this.$route.query.mode) {
                case "modify":
                    var res = confirm("确认修改？")
                    if( !res ){
                        return;
                    }
                    this.axios.post( apiAddr + "/v1x1/post/modify", {
                        "Id": parseInt(this.postId),
                        "Title" : this.post.Title,
                        "Text" : this.post.Text,
                        "TagIds" : this.post.Tags,
                        "IsPrivate" : this.isPrivate,
                    }, {withCredentials: true})
                    .then(res => {
                        if ( err.Check( res.data ) ) {
                            this.status = "已修改！"
                            this.$router.push( { path:'/post/reader?id='+ this.postId } )
                        } else {
                            console.error("in post reader loading post", err.data.Desc)
                        }
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                    return;
                default:
                    var res = confirm("确认发布？")
                    if( !res ){
                        return;
                    }
                    this.axios.post( apiAddr + "/v1x1/post/create", {
                        "Title" : this.post.Title,
                        "Text" : this.post.Text,
                        "TagIds" : this.post.Tags,
                        "IsPrivate" : this.isPrivate, 
                    }, {withCredentials: true})
                    .then(res => {
                        if ( err.Check( res.data ) ) {
                            this.status = "已上传！"
                            this.$router.push( { path:'/post/reader?id='+ res.data.Data } )
                        } else {
                            console.error("in post reader loading post", err.data.Desc)
                        }
                    })
                    .catch(err => {
                        console.error(err); 
                    })
                    return;
            }
       },
        getLastModifTime() {
            var date = new Date("2015-03-25 12:00:00");
            this.post.Date = date.toString();
        }
    },
    created() {
        switch( this.$route.query.mode ) {
            case "modify":
                console.info("modify mode")
                this.postId = this.$route.query.id
                this.axios.get( apiAddr + "/v1x1/post", {
                    params:{id: this.postId},
                    withCredentials: true
                })
                .then(res => {
                    if ( err.Check( res.data ) ) {
                        this.post = JSON.parse( res.data.Data )
                        this.isPrivate = this.post.IsPrivate
                        this.status = "编辑模式，正在编辑文章：" + this.post.Title
                    } else {
                        if ( res.data.ErrCod == "-5" ) {
                            this.canNotModify = true
                        } else {
                            console.error("in post reader loading post", err.data.Desc)
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                })
                return;
            case "draft":
                this.status = "草稿模式"
                this.post = df.GetDraftByTitle( this.$route.query.dtitle)
                return;
            default:
                this.status = "创建了新文档"
                this.post = {
                    "Title": "",
                    "Text": "",
                    "Tags": [],
                    "Author": "我自己",
                    "Date": new Date(),
                    "MyPost": true
                }
            return;
        }
    },
}
</script>

<style scoped>
.label {
    margin-left: 5px; 
}
</style>