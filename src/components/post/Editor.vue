/* eslint-disable vue/valid-v-for */
<!--
 * @Date: 2020-09-14 20:05:30
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-15 15:56:09
 * @FilePath: \cyf-cloud.front\src\components\post\editor.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container>
        <br>
        <b-tabs content-class="mt-3" align="center">
        <b-tab title="编辑" active>
            <input v-model="title" placeholder="文章标题" type="text" class="form-control">
            <br>
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
        </b-tab>
        <b-tab title="预览" v-on:click="refreshPreview">
            <b-container class="border">
                <br>
                <h2>{{title}}</h2>
                <div>
                    <b-badge variant="primary" :herf="auth_href">作者：{{meta.auth_name}}</b-badge>
                    <div>&nbsp;</div>
                    <b-badge variant="secondary">最后编辑：{{meta.last_edit}}</b-badge>
                    <div>&nbsp;</div>
                    <small>标签：</small>
                     <b-badge variant="info" pill v-for="tag in tags">
                         {{tag}}
                    </b-badge>
                </div>
                <hr>
                <div :id="divId"></div>
                <br>
            </b-container>
        </b-tab>
        </b-tabs>
        <br>
        <b-button block pill variant="info" v-on:click="goPost">发表</b-button>
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
        }
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