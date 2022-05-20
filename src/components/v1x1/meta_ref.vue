<!--
 * @Date: 2021-02-06 16:53:11
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-06 17:51:32
 * @FilePath: \cyf-cloud.front\src\components\v1x1\meta_ref.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <b-container v-if="apiList != null" id="table-api">
        <h2 class="text-center mt-3">API 大全<b-badge class="ml-2" variant="info" pill>v1x1</b-badge> </h2>
        <b-card v-for="aGroup in apiList" :key="aGroup.path">
                            <h6>{{ aGroup.path }}  <b-badge v-if="aGroup.desc=='Deprecated'" variant="warning" pill>Deprecated</b-badge></h6>
                            
                            <p v-if="aGroup.desc!=''&&aGroup.desc!='Deprecated'">{{ aGroup.desc }}</p>
                            <small>{{ aGroup.file }}</small>
            <details class="x">
                <table>
                    <thead>
                            <td>路径</td>
                            <td>类型</td>
                            <td>描述</td>
                            <td>参数</td>
                            <td>注意</td>
                            <td>返回</td>
                            <td>需要登陆验证</td>
                    </thead>
                    <tbody v-for="c in aGroup.childs" :key="c.Name">
                        <tr>
                            <td>{{ c.path }}</td>
                            <td>{{ c.type }}</td>
                            <td>{{ c.brief }}</td>
                            <td>
                                <table v-if="c.args != null">
                                    <thead>
                                        <td>名称</td>
                                        <td>描述</td>
                                    </thead>
                                    <tbody>
                                        <tr v-for="arg in c.args" :key="arg.name">
                                            <td><strong style="color: red;">{{ arg.name }}</strong></td>
                                            <td>{{ arg.desc }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td>{{ c.note }}</td>
                            <td>{{ c.return }}</td>
                            <td v-if="c.needValidation == true">是</td>
                            <td v-else>否</td>
                        </tr>
                    </tbody>
                </table>
            </details>
        </b-card>
    </b-container>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";
import bvu from "../../cc/bvUtil";

export default {
    mounted() {
        this.axios
            .get(apiAddr + "/v1x1/meta/api/ref", {})
            .then((res) => {
                if (err.Check(res.data)) {
                    this.apiList = JSON.parse(res.data.Data);
                    console.log(this.apiList);
                } else {
                    console.error("in (meta ref)", res.data.Desc);
                    bvu.Msg("错误", res.data.Desc, "danger");
                }
                console.log(res);
            })
            .catch((err) => {
                bvu.Msg("错误", err, "danger");
                console.error(err);
            });
    },
    methods: {},
    data() {
        return {
            apiList: null,
        };
    },
};
</script>

<style>
details > summary {
  padding: 4px;
  width: 200px;
  background-color: #eeeeee;
  border: none;
  box-shadow: 1px 1px 2px #bbbbbb;
  cursor: pointer;
}

details > p {
  background-color: #eeeeee;
  padding: 4px;
  margin: 0;
  box-shadow: 1px 1px 2px #bbbbbb;
}
.x {
    overflow-x: auto;
}
/* Table Head */
#table-api table {
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
}

#table-api thead th {
    background-color: rgb(81, 130, 187);
    color: #fff;
    border-bottom-width: 0;
}

/* Column Style */
#table-api td {
    border-color: rgba(81, 130, 187, 100);
    border-style: solid;
    border-width: 1px;
    color: #000;
}
/* Heading and Column Style */
#table-api tr,
#table-api th {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(81, 130, 187);
}

/* Padding and font style */
#table-api td,
#table-api th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana;
    font-weight: bold;
}

.text-input {
    length: 100%;
}

</style>
