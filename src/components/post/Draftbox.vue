<!--
 * @Date: 2020-10-11 00:35:16
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 01:37:37
 * @FilePath: \cyf-cloud.front\src\components\post\Draftbox.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div class="container">
        <h2 class="mt-2">草稿箱</h2>
        <b-row>
        <b-col><p class="my-auto">有 {{ds.length}} 篇草稿</p></b-col>
        <b-col><b-button block variant="light" @click="refresh">刷新</b-button></b-col>
        </b-row>
        <hr>
        <div v-for="d in ds">
            <b-row>
                <b-col class="my-auto">{{d.Title}}</b-col>
                <b-col><b-button variant="light" size="sm">修改</b-button><b-button variant="light" size="sm">删除</b-button></b-col>
            </b-row>
            <hr>
        </div>
    </div>
</template>

<script>
import df from './Draft'

export default {
    mounted() {
        this.ds = df.GetAllDrafts()
    },
    data() {
        return {
            ds: []
        }
    },
    methods: {
        modify( d ) {
            // push to d router
        },
        delete( d ) {
            // localStorageDelete
        },
        refresh() {
            this.ds = df.GetAllDrafts()
        }
    },
}
</script>