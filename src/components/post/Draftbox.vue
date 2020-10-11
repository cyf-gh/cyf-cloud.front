<!--
 * @Date: 2020-10-11 00:35:16
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 21:42:43
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
                <b-col>
                <b-button variant="light" size="sm" @click="modify(d)">修改</b-button>
                <b-button variant="light" size="sm" @click="deleteD(d)">删除</b-button>
                </b-col>
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
            var res = confirm("确认编辑？\n当前未保存的文字会全部消失")
            if ( res ) {
                this.$router.push({path:'/post/editor?mode=draft&dtitle='+d.Title})
                location.reload()
            }
        },
        deleteD( d ) {
            var res = confirm("确认删除？")
            if ( res ) {
                df.DeleteDraftByTitle( d.Title )
            }
            this.refresh()
        },
        refresh() {
            this.ds = df.GetAllDrafts()
        }
    },
}
</script>