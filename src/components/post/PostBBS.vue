<!--
 * @Date: 2020-10-14 21:08:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-14 21:48:04
 * @FilePath: \cyf-cloud.front\src\components\post\PostBBS.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-card>
        <b-table
            :items="posts"
            :fields="fields"
            hover
            small
            :current-page="curPage"
            :per-page="perPage"
            @row-clicked="onSelectedPlgCliced"
        ></b-table>
        <b-pagination
        size="sm"
        align="center"
        v-model="curPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="id-all-posts"
      ></b-pagination>
    </b-card>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
    data() {
        return {
            fields: ['Title', 'Date'],
            posts:[],
            curPage: 1,
            perPage: 7,
        }
    },
    mounted() {
         this.axios.get(apiAddr+"/v1x1/posts/info",{withCredentials: true})
        .then(res => {
            if( err.Check( res.data ) ) {
                this.posts = JSON.parse( res.data.Data )
            } else {
                console.error("in post list loading all posts", res.data.Desc)
            }
        })
        .catch(err => {
            console.error(err); 
        })
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
    computed: {
        rows(){
            return this.posts.length;
        }
    },
}
</script>