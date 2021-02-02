<!--
 * @Date: 2020-10-07 19:01:48
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-02 23:32:25
 * @FilePath: \cyf-cloud.front\src\components\post\List.vue
 * @Description: 文章列表
-->
<template>
    <div class="cc-my-posts-list-bg mt-2">
        <b-table
            :items="posts"
            :fields="fields"
            hover
            small
            :current-page="curPage"
            :per-page="perPage"
            @row-clicked="onSelectedPlgCliced"
            style="border:rgba(0,0,0,.125) 1px solid;"
        ></b-table>
        <b-pagination
        size="sm"
        align="center"
        v-model="curPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="id-my-posts"
        pills
    ></b-pagination>
    </div>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
    data() {
        return {
            fields: ['Title'],
            posts:[],
            curPage: 1,
            perPage: 20,
        }
    },
    methods: {
        onSelectedPlgCliced(clicked) {
            for (var i in this.posts) {
                if (this.posts[i].Id == clicked.Id) {
                    this.$router.push({path:'/post/reader?id='+clicked.Id})
                    return;
                }
            }
        },
    },
    mounted() {
        this.axios.get(apiAddr+"/v1x1/posts/info/self",{withCredentials: true})
        .then(res => {
            if( err.Check( res.data ) ) {
                this.posts = JSON.parse( res.data.Data )
            } else {
                console.error("in post list loading posts", res.data.Desc)
            }
        })
        .catch(err => {
            console.error(err); 
        })
    },
    computed: {
        rows(){
            return this.posts.length;
        }
    },
}
</script>


<style scoped>
.cc-my-posts-list-bg{
    transition:all 0.6s;
    transition-timing-function:ease-in-out;
    background: rgb(248,248,248, 0.6);
}
.cc-my-posts-list-bg:hover{
    background: white; 
}
</style>