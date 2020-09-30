/* eslint-disable vue/valid-v-for */
<!--
 * @Date: 2020-09-14 20:05:30
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 22:37:49
 * @FilePath: \cyf-cloud.front\src\components\post\Editor.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container fluid>
        <b-card-group deck>
        <b-card title="编辑" content-class="mt-3" align="center">
            <input v-model="title" placeholder="文章标题" type="text" class="form-control mb-3">
            <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Markdown"
            rows="10"
            max-rows="15"
            ></b-form-textarea>
            <br>
            <b-form-tags
            input-id="tags-separators"
            v-model="tags"
            separator=" ,;"
            placeholder="使用半角逗号，分号，空格隔开"
            no-add-on-enter
            ></b-form-tags>
        </b-card>
        <b-card title="预览" v-on:click="refreshPreview">
            <b-container style="background-color:white">
                <br>
                <h2>{{title}}</h2>
                <div>
                    <b-badge variant="light" :herf="auth_href">作者：{{meta.auth_name}}</b-badge>
                    <br>
                    <b-badge variant="light">最后编辑：{{meta.last_edit}}</b-badge>
                    <br>
                    <b-badge variant="light" class="mr-1">标签：</b-badge>
                     <b-badge variant="dark" v-for="tag in tags" class="mr-1">
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
        </b-navbar>
    </b-container>
</template>

<script>
import md from "../../cc/markdown";

export default {
    data() {
      return {
        title: "",
        text: "# Markdown Here!",
        divId:"id-cc-post-editor",
        tags: ['aaa', 'bbb'],

        meta: {
            auth_name: "cyf",
            auth_href: "#",
            last_edit: '',
        },
        isDuo: true
      }
    },  
    props: {
        modifText: String,
        modifTitle: String,
    },
    methods: {
        refreshPreview() {
            md.SetRawMarkdownToDiv(
                this.text,
                this.divId
            )
            this.getLastModifTime()
        },
        goPost() {
            
        },
        getLastModifTime() {
            var date = new Date();
            this.meta.last_edit = date.toLocaleTimeString();
        }
    },
}
</script>

<style scoped>
.label {
    margin-left: 5px; 
}
</style>