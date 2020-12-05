<!--
 * @Date: 2020-11-01 14:08:43
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 20:07:19
 * @FilePath: \cyf-cloud.front\src\components\post\UserHome.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<div>
    <div v-if="getUserPostInfosUrl==''">
        <cc-invalid-param></cc-invalid-param>
    </div>
    <div v-else id="cc-post-fav">
        <cc-post-list
            :PostUrl="getUserPostInfosUrl"
            :ClientFilter="clientFilter"
			:ListTitle="title"
        ></cc-post-list>
    </div>
</div>
</template>

<script>
import postList from "./info/PostCardList";
import ccInvalidParam from "../error/InvalidParam"

export default {
    components: {
        "cc-post-list": postList,
        "cc-invalid-param": ccInvalidParam,
	},
	data() {
		return {
            clientFilter: true,
            getUserPostInfosUrl: '',
            userName: '',
            title:'',
		}
    },
    mounted() {
        var curUserName = ""
        
        this.userName = this.$route.query.name // user name
        if( this.userName == undefined ) {
            return
        }
        try {
            curUserName = JSON.parse(localStorage.getItem("cc_account_info")).Name
        } catch {
            console.log("no info")
        }
        if( this.userName == curUserName ) {
            this.getUserPostInfosUrl = "/v1x1/posts/info/self"
        } else {
            this.getUserPostInfosUrl = "/v1x1/posts/info?user=" + this.userName
        }
        this.title = this.userName + " 的文章列表"
    }
};
</script>