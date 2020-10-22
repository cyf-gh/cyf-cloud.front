<!--
 * @Date: 2020-10-22 16:03:12
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-22 17:16:05
 * @FilePath: \cyf-cloud.front\src\components\post\info\PostCards.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
        <b-card
            class="ps-info"
            v-for="p in posts"
            :key="p.Id"
            @click="viewPost(p)"
        >
            <b-row>
                <b-col>
                    <h6>{{ p.Title }}</h6>
                </b-col>
                <b-col>
                    <small style="float: right"
                        >浏览量：{{ p.ViewedCount }}</small
                    >
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <small
                        >创建日期：<b-badge variant="light">{{
                            p.CreateDate
                        }}</b-badge></small
                    >
                </b-col>
                <b-col>
                    <small style="float: right"
                        >作者：<b-badge variant="light">{{
                            p.Author
                        }}</b-badge></small
                    >
                </b-col>
            </b-row>
            <b-row v-if="p.Tags != null">
                <b-col>
                    <small>标签：</small>
                    <b-badge
                        variant="light"
                        v-for="t in p.Tags"
                        :key="t"
                        class="mr-1"
                    >
                        {{ t }}
                    </b-badge>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        posts: Array,
    },
    name: "cc-postinfos",
    methods: {
        viewPost(p) {
            this.$router.push({ path: "/post/reader?id=" + p.Id });
        },
    },
};
</script>
