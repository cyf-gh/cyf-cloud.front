<!--
 * @Date: 2020-12-05 12:21:10
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 13:24:25
 * @FilePath: \cyf-cloud.front\src\components\account\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <b-container fluid="md">
        <div>
<!-- 头像 -->
        <b-img-lazy
            rounded="circle"
            class="mx-2 d-inline"
            :src="u.Avatar"
            alt="Kitten"
            height="66"
            width="66"
            />
<!-- 他的文章 -->
<!-- table -->
    <!-- 文章数量 -->
<!-- 特殊文章的展示 -->

        </div>
    </b-container>
</template>

<script>
export default {
    data() {
        return {
            id: -1,
            u: null,
        }
    },
    mounted() {
        this.id = this.$route.query.id
        // 获取用户信息

    },
}
</script>