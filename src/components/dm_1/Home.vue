<!--
 * @Date: 2021-01-06 13:00:26
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-15 14:41:36
 * @FilePath: \cyf-cloud.front\src\components\dm_1\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
    <b-container fluid>
        <b-modal id="id-modal-history-dir" title="历史路径">
            <a v-for="h in historyDirs" :key="h" @click="GoTo(h)"
                >{{ h }}<br
            /></a>
        </b-modal>

        <b-card-group deck v-if="resourceList != null">
            <b-card>
                    <b-button-group class="mb-1">
                        <b-button variant="light" size="sm" @click="Home"
                            >根目录</b-button
                        >
                        <b-button variant="light" size="sm" @click="Back"
                            >返回上一层</b-button
                        >

                    </b-button-group>
                    <b-row class="mb-1">
                        <b-col lg="8">
                            <b-form-input size="sm" v-model="currentDir">Path</b-form-input>
                        </b-col>
                        <b-col lg="4">
                            <b-button-group style="float:left;">
                            <b-button
                                class="mx-auto"
                                variant="light"
                                size="sm"
                                @click="GoToCurrentPath"
                                >前往</b-button
                            >                        <b-button
                                variant="light"
                                size="sm"
                                @click="ShowHistoryModal"
                                v-b-modal.id-modal-history-dir
                                >查看历史路径</b-button
                            >
                            </b-button-group>
                        </b-col>
                    </b-row>

                <div v-if="resourceList.length == 0 || resourceList == null">
                    <h4>该目录下无内容</h4>
                </div>
                <div class="x" v-else>
                    <b-table
                        class="table-explorer"
                        hover
                        :fields="resourceFields"
                        :items="resourceList"
                        @row-clicked="clickExplorer"
                        small
                    ></b-table>
                </div>
            </b-card>
            <div v-if="currentResource != null">
                <b-card>
                    <table class="dm-table">
                        <tr>
                            <td>
                                <small>资源名</small>
                            </td>
                            <td>
                                <strong>{{ currentResource.Name }}<b-badge class="ml-1 my-auto" v-if="currentDMResource != null" variant="info">UID: {{currentDMResource.Id}}</b-badge> </strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <small>大小 </small>
                            </td>
                            <td>
                                <strong
                                    >{{ getWellSize }} {{ getWellUnit }} (
                                    {{ currentResSize }} Bytes )</strong
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <small>MD5 </small>
                            </td>
                            <td>
                                <strong
                                    >{{currentDMResource.MD5}}</strong 
                                >
                            </td>
                        </tr>
                        <tr v-if="currentDMResource != null">
                            <td>
                                <small for="id-rating-sm-no-border">评分</small>
                            </td>
                            <td>
                                <b-form-rating
                                    id="id-rating-sm-no-border"
                                    color="#ff8800"
                                    stars="6"
                                    v-model="currentDMResource.Rating"
                                    @change="changeRating"
                                    no-border
                                    size="sm"
                                ></b-form-rating>
                            </td>
                        </tr>
                        <tr v-if="currentDMResource != null">
                            <td>
                                <small for="rating-sm-no-border">标签</small>
                            </td>
                            <td>
                                <b-form-tags
                                    tag-variant="light"
                                    size="sm"
                                    input-id="id-dm-resources-tags-separators"
                                    v-model="currentDMResTags"
                                    @input="InputTags"
                                    separator=" ,;"
                                    placeholder="使用半角逗号，分号，空格隔开"
                                    no-add-on-enter
                                    remove-on-delete
                                ></b-form-tags>
                            </td>
                        </tr>
                        <tr v-if="currentDMResource != null">
                            <td>
                                <small for="rating-sm-no-border">描述</small>
                            </td>
                            <td>
                                <b-form-textarea
                                    size="sm"
                                    @blur="descriptionBlur"
                                    rows="3"
                                    max-rows="10"
                                    v-model="currentDMResource.Description"
                                ></b-form-textarea>
                            </td>
                        </tr>
                        <tr>
                            <td><small>是否索引</small></td>
                            <td>
                                <strong v-if="currentDMResource != null"
                                    >是</strong
                                >
                                <div v-else>
                                    <strong>否</strong>
                                    <b-button
                                        variant="light"
                                        id="id-button-order-resource"
                                        size="sm"
                                        class="ml-4"
                                        @click="orderResource"
                                        >索引该资源</b-button
                                    >
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <small>系统</small>
                            </td>
                            <td>
                                <details class="ml-2"
                                    ><pre>{{
                                        resourceDetailInfo
                                    }}</pre></details
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <small>离线备份</small>
                            </td>
                            <td>
                                <b-form-checkbox id="id-is-offline-backup" switch size="sm">是否开启</b-form-checkbox>
                                <small style="color:gray" target="id-is-offline-backup">开启则将于下一次离线备份开始时进行备份。</small>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <small>备份列表</small>
                            </td>
                            <td v-if="currentDMResource.BackupIdList != null">
                                <b-badge v-for="b in currentDMResource.BackupIdList" :key="b">UID:{{b}}</b-badge>
                            </td>
                            <td v-else>
                                <strong>空</strong>
                            </td>
                        </tr>
                    </table>
                </b-card>
            </div>
        </b-card-group>
        <pre v-if="currentDMResource != null">{{ currentDMResource }}</pre>
        <div v-else></div>
    </b-container>
</template>

<script>
import apiAddr from "../../server";
import apiAddrWS from "../../serverWS";
import bvu from "../../cc/bvUtil";
import err from "../../cc/v1x1/HttpErrReturn";
export default {
    data() {
        return {
            resourceList: null,
            dmResList: null,
            resourceFields: [
                { key: "Name", label: "名字" },
                { key: "Path", label: "路径" },
                { key: "Mode", label: "权限" },
                { key: "Size", label: "大小" },
                { key: "ModTime", label: "修改时间" },
            ],
            resourceDetailInfo: "",
            currentResource: null,
            currentDMResource: null,
            currentResSize: 0,
            currentResSizeUnit: "bytes",
            dirStack: [],
            historyDirs: [],
            rootDir: "",
            allTags: [],
            allTags2: [],
            currentDMResTags: [],
            websock: null,
        };
    },
    mounted() {
        bvu.InitToast(this.$bvToast);
        this.axios
            .get(apiAddr + "/v1x1/dm/1/raw/root", { withCredentials: true })
            .then((res) => {
                this.rootDir = JSON.parse(res.data.Data);
                this.dirStack.push(this.rootDir);
                this.historyDirs.push(this.rootDir);
                this.Home();
            })
            .catch((err) => {
                console.error(err);
            });
        this.websock = new WebSocket(apiAddrWS + '/v1x1/ws/test/echo');
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
    },
    methods: {
        websocketonopen(){ //连接建立之后执行send方法发送数据
            let actions = {"test":"12345"};
            this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror(){//连接建立失败重连
            // this.initWebSocket();
        },
        websocketonmessage(e){ //数据接收
            const redata = JSON.parse(e.data);
        },
        websocketsend(Data){//数据发送
            this.websock.send(Data);
        },
        websocketclose(e){  //关闭
            console.log('断开连接',e);
        },
        GetAllTags() {
            this.axios
                .get(apiAddr + "/v1x1/dm/1/tags/all", { withCredentials: true })
                .then((res) => {
                    var tags = JSON.parse(res.data.Data);
                    this.allTags = new Map();
                    tags.forEach((el) => {
                        this.allTags[el.Id] = el.Name;
                        this.allTags2[el.Name] = el.Id;
                    });
                    this.UpdateCurrentDMResTags();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        UpdateCurrentDMResTags() {
            this.currentDMResTags = [];
            if (this.currentDMResource == null) return;
            if (this.currentDMResource.TagIds != null) {
                this.currentDMResource.TagIds.forEach((el) => {
                    this.currentDMResTags.push(this.allTags[el]);
                });
            }
        },
        ShowHistoryModal() {
            this.historyDirs = [...new Set(this.historyDirs)];
            this.historyDirs.reverse();
        },
        descriptionBlur() {
            this.UpdateDMRes();
            console.log("updated description");
        },
        Home() {
            this.axios
                .get(apiAddr + "/v1x1/dm/1/raw/dir/root", {
                    withCredentials: true,
                })
                .then((res) => {
                    this.resourceList = JSON.parse(res.data.Data);
                })
                .catch((err) => {
                    console.error(err);
                });
            this.axios
                .get(apiAddr + "/v1x1/dm/1/query/dir", {
                    params: { d: this.rootDir },
                    withCredentials: true,
                })
                .then((res) => {
                    this.dmResList = JSON.parse(res.data.Data);
                })
                .catch((err) => {
                    console.error(err);
                });

            this.dirStack.push(this.rootDir);
            this.historyDirs.push(this.rootDir);
            this.currentDir = this.rootDir;
        },
        Back() {
            console.log(this.dirStack);
            if (this.dirStack.length > 1) {
                this.dirStack.pop();
                this.GoTo(this.dirStack[this.dirStack.length - 1]);
            }
        },
        Forward(path) {
            this.GoTo(path);
            this.dirStack.push(path);
            this.historyDirs.push(path);
        },
        changeRating() {
            console.log("rating changed");
            this.UpdateDMRes();
        },
        GoToCurrentPath() {
            this.Forward(this.currentDir);
        },
        GoTo(path) {
            this.currentDir = path;
            console.log("Goto: ", path);
            this.axios
                .get(apiAddr + "/v1x1/dm/1/raw/dir", {
                    params: { d: path },
                    withCredentials: true,
                })
                .then((res) => {
                    if (err.IsOk(res.data)) {
                        this.resourceList = JSON.parse(res.data.Data);
                    } else {
                        bvu.Msg("错误 - 路径", res.data.Desc, "danger");
                    }
                })
                .catch((err) => {
                    bvu.Msg("错误 - 路径", err, "danger");
                });
            this.axios
                .get(apiAddr + "/v1x1/dm/1/query/dir", {
                    params: { d: path },
                    withCredentials: true,
                })
                .then((res) => {
                    if (err.IsOk(res.data)) {
                        this.dmResList = JSON.parse(res.data.Data);
                    } else {
                        bvu.Msg("错误 - 资源索引", res.data.Desc, "danger");
                    }
                })
                .catch((err) => {
                    bvu.Msg("错误 - 资源索引", err, "danger");
                });
        },
        orderResource() {
            this.axios
                .post(
                    apiAddr + "/v1x1/dm/1/order",
                    [{ Path: this.currentResource.Path }],
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    if (err.IsOk(res.data)) {
                        bvu.Msg(
                            "成功 - 添加资源至索引",
                            res.data.Desc,
                            "success"
                        );
                    } else {
                        bvu.Msg(
                            "成功 - 添加资源至索引",
                            res.data.Desc,
                            "danger"
                        );
                    }
                })
                .catch((err) => {
                    bvu.Msg("错误 - 资源索引", err, "danger");
                    console.error(err);
                });
        },
        InputTags(value) {
            console.log(value);
            this.currentDMResource.TagIds = [];
            var newTags = [];
            value.forEach((el) => {
                if (this.allTags2[el] == null) {
                    console.log("new tag:", el);
                    newTags.push(el);
                } else {
                    this.currentDMResource.TagIds.push(this.allTags2[el]);
                }
            });
            if (newTags.length == 0) {
                this.UpdateDMRes();
                return;
            } else {
                this.axios
                    .post(apiAddr + "/v1x1/dm/1/tags/add", newTags, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log(res);
                        JSON.parse(res.data.Data).forEach((el) => {
                            this.currentDMResource.TagIds.push(el);
                        });
                        console.log(this.currentDMResource);
                        this.UpdateDMRes();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        UpdateDMRes() {
            this.axios
                .post(
                    apiAddr + "/v1x1/dm/1/info/modifies",
                    this.currentDMResource,
                    { withCredentials: true }
                )
                .then((res) => {
                    console.log(res);
                    this.GetAllTags();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        GetDirSize(path) {
            this.axios
                .get(apiAddr + "/v1x1/dm/1/raw/recruit/dir/size", {
                    params: { d: path },
                    withCredentials: true,
                })
                .then((res) => {
                    this.currentResSize = JSON.parse(res.data.Data);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        clickExplorer(record, index) {
            console.log(record, index);
            this.resourceDetailInfo = record.Sys;
            this.currentResource = record;
            this.QueryDMResource();
            if (record.IsDir == true) {
                this.GetDirSize(record.Path);
                this.Forward(record.Path);
            } else {
                this.currentResSize = record.Size;
            }
        },
        QueryDMResource() {
            this.currentDMResource = null;
            this.dmResList.forEach((el) => {
                if (el.Path == this.currentResource.Path) {
                    this.currentDMResource = el;
                    return;
                }
            });
            this.GetAllTags();
        },
    },
    computed: {
        getWellSize() {
            if (this.currentResSize > 1024 * 1024 * 1024) {
                return (this.currentResSize / 1024 / 1024 / 1024).toFixed(2);
            }
            if (this.currentResSize > 1024 * 1024) {
                return (this.currentResSize / 1024 / 1024).toFixed(2);
            }
            if (this.currentResSize > 1024) {
                return (this.currentResSize / 1024).toFixed(2);
            }
            return this.currentResSize;
        },
        getWellUnit() {
            if (this.currentResSize > 1024 * 1024 * 1024) {
                return "GB";
            }
            if (this.currentResSize > 1024 * 1024) {
                return "MB";
            }
            if (this.currentResSize > 1024) {
                return "KB";
            }
            return "Byte";
        },
    },
};
</script>

<style>
.x {
    overflow-x: auto;
}
.dm-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}
.dm-table,
th,
td {
    border: 1px solid whitesmoke;
    padding: 10px;
}
.x {
    overflow-x: auto;
}
/* Table Head */
.table-explorer table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
}

.table-explorer thead th {
    background-color: whitesmoke;
    color: gray;
    border-bottom-width: 0;
}

/* Column Style */
.table-explorer td {
    color: #000;
}
/* Heading and Column Style */
.table-explorer tr,
th {
    border-width: 1px;
    border-style: solid;
    border-color: whitesmoke;
}

/* Padding and font style */
.table-explorer td,
th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: sans-serif;
    font-weight: bold;
}
.b-form-tag {
    margin: 1px;
}
</style>
