<!--
 * @Date: 2020-12-04 18:32:22
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-04 23:32:07
 * @FilePath: \cyf-cloud.front\src\components\search\User.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
        <b-card>
            <b-container fluid="md">
            <p class="text-center"><strong>{{Text}}</strong> 的搜索结果为</p>
            <h5>用户<b-badge class="ml-2" v-if="Users !=null" variant="dark">{{Users.length}}</b-badge></h5>
            <div v-if="Users == null">
                <small>没有相应的结果</small>
            </div>
            <div class="text-center" v-else>
                <div class="mt-3" v-for="u in Users" :key="u.Id">
                    <b-img-lazy
                        rounded="circle"
                        class="mx-2 d-inline"
                        :src="u.Avatar"
                        alt="Kitten"
                        height="66"
                        width="66"
                        />
                    <h5 class="d-inline">{{u.Name}}</h5>
                    <b-badge variant="light" class="d-inline ml-2 my-auto">UID:{{u.Id}}</b-badge>
                </div>
            </div>
    </b-container>
        </b-card>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
    data() {
        return {
            Text: "",
            Users: null
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
        this.axios.get(apiAddr + "/v1x1/search/user",{
            params:{a:this.Text},
            withCredentials: true
        })
        .then(res => {
            if (err.Check(res.data)) {
            this.Users = JSON.parse(res.data.Data)
            } else {
                console.error(
                    "in search user mounted",
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