<!--
 * @Date: 2020-12-04 15:00:59
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-04 23:32:19
 * @FilePath: \cyf-cloud.front\src\components\search\Post.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
        <b-card>
    <b-container fluid="md">
            <p class="text-center"><strong>{{Text}}</strong>的搜索结果为</p>
            <h5>标签<b-badge class="ml-2" v-if="Posts.Tags !=null" variant="dark">{{Posts.Tags.length}}</b-badge></h5>
            <div v-if="Posts.Tags == null">
                <small>没有相应的结果</small>
            </div>
            <div v-else>
                <cc-tag-list :tags="Posts.Tags"></cc-tag-list>
            </div>

            <br>

            <h5>文章<b-badge class="ml-2" v-if="Posts.PostInfos !=null" variant="dark">{{Posts.PostInfos.length}}</b-badge></h5>
            <div v-if="Posts.PostInfos == null">
                <small>没有相应的结果</small>
            </div>
            <div v-else>
                <cc-post-cards :posts="Posts.PostInfos"></cc-post-cards>
            </div>
    </b-container>
        </b-card>
</template>

<script>
import apiAddr from "../../server";
import postCards from "../post/info/PostCards";
import err from "../../cc/v1x1/HttpErrReturn";
import tagList from "../post/TagList"

export default {
    components:{
        "cc-post-cards": postCards,
        "cc-tag-list": tagList,
    },
    data() {
        return {
            Text: "",
            Posts: []
        }
    },
    props: {
        text: String,
    },
    mounted() {
        this.Text = ( this.text == undefined ) ? ( this.$route.query.text == undefined ? Text : this.$route.query.text ) : this.text;
        if ( this.Text == "" ) {
            return;
        }
        this.axios.get(apiAddr + "/v1x1/search/post",{
            params:{a:this.Text},
            withCredentials: true
        })
        .then(res => {
            if (err.Check(res.data)) {
            this.Posts = JSON.parse(res.data.Data)
            } else {
                console.error(
                    "in search post mounted",
                    res.data.Desc
                );
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
}
</script>

<style scoped>
small {
    color: gray;
}
</style>