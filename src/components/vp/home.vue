<!--
 * @Date: 2021-02-02 16:29:39
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-06 17:11:00
 * @FilePath: \cyf-cloud.front\src\components\vp\home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <div>
        <b-card>
            <h4>可视化项目流程</h4>
            <br>
                <h6>新建项目</h6>
            <b-form inline>
            <b-input placeholder="项目名称" size="sm" class="mx-2 my-1" v-model="newTitle"></b-input>
            <b-button size="sm" @click="newProject" v-b-popover.hover.top="'请注意项目的名字全局唯一，不可重复'" title="提示" variant="light" >新建模板</b-button>
            <!-- <b-button size="sm" class="mx-2 my-1" variant="info" @click="importExcelProject">导入已有的项目（Excel）</b-button> -->
            </b-form>
            <br>
            <h6>项目一览</h6>
            <b-table
                v-if="pList.length!=0"
                small
                hover
                :items="pList"
                @row-clicked="editProject"
                :fields="fields"
                style="border:rgba(0,0,0,.125) 1px solid;    background: rgb(248,248,248, 0.6);"
            ></b-table>
            <small v-else>无已有的项目，请先创建一个</small>
        </b-card>
    </div>
</template>

<script>
import idy from "../../cc/v1x1/Identity";
import apiAddr from "../../server"
import err from "../../cc/v1x1/HttpErrReturn";
import bvu from "../../cc/bvUtil";

export default {
    mounted() {
        idy.InitCookie(this.$cookie);
        if (!idy.IsLogin()) {
            this.$router.push({ path: "/account/login?from=require_login" });
            return
        }
        this.axios.get(apiAddr+"/v1x1/vp/projects/list", { withCredentials: true })
        .then(res => {
            if (err.Check(res.data)) {
                this.pList = JSON.parse(res.data.Data)
                this.pList = this.pList == null || this.pList == undefined ? [] : this.pList
            } else {
                console.error(
                    "in vp get project list",
                    res.data.Desc
                );
                bvu.Msg( "错误", res.data.Desc, "danger" )
            }
            console.log(res)
        })
        .catch(err => {
            bvu.Msg( "错误", err, "danger" )
            console.error( err );
        })
    },
    data() {
        return {
            pList :[],
            fields: [
                { key: "Title", label: "名称" },
            ],
            newTitle: "",
        }
    },
    methods: {
        newProject() {
            if ( this.newTitle == "" ) {
                bvu.Msg("错误","项目名不能为空","danger")
                return
            }
            this.$router.push({ path: "/vp/editor?mode=new&title="+this.newTitle});
        },
        editProject(p, index) {
            console.log( p, index )
            this.$router.push({ path: "/vp/editor?mode=modify&id="+p.Id });
        },
        importExcelProject() {
            
        }
    },
}
</script>

