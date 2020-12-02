<!--
 * @Date: 2020-11-29 16:07:30
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-29 16:31:49
 * @FilePath: \cyf-cloud.front\src\components\post\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <b-card>
        <h4>博客</h4>
        <div class="mt-3">
        <b-button variant="light" class="mr-2" @click="newPost">写一篇</b-button>
        <b-button variant="light" @click="haveALook">随便看看</b-button>
        </div>
        <div class="mt-3">
          <h6>我的文章</h6>
          <div id="id-cc-my-posts-list"><ccPostList></ccPostList></div>
        </div>
    </b-card>
</template>

<script>
import ccPostList from "../post/List"
import '../../cc/css/cc-card.css'

export default {
    components:{
      ccPostList
    },
    name: "ccPostHome",
    methods: {
      newPost() {
        this.$router.push( { path:'/post/editor'} )
      },
      haveALook() {
        this.$router.push( { path:'/post/bbs'} )
      }
    },
}    
</script>