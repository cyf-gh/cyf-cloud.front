<!--
 * @Date: 2021-02-02 16:29:39
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-03 00:00:17
 * @FilePath: \cyf-cloud.front\src\components\vp\home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <div>
        <b-card>
            <b-form inline>
                <small>新建项目名</small>
            <b-input size="sm" class="mx-2 my-1" v-model="newTitle"></b-input>
            <b-button size="sm" @click="newProject" v-if="newTitle!=''">新建项目模板</b-button>
            <b-button size="sm" v-else disabled>新建项目模板</b-button>
            <b-button size="sm" class="mx-2 my-1" variant="info" @click="importExcelProject">导入已有的项目（Excel）</b-button>
            </b-form>
        </b-card>
        <b-card>
            <b-table
            small
            striped
            :items="pList"
            @row-clicked="editProject"
            :fields="fields"
            ></b-table>
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
                { key: "Title", label: "项目名称" },
            ],
            newTitle: "",
        }
    },
    methods: {
        newProject() {
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