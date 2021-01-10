
<!--
 * @Date: 2021-01-06 13:00:26
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-10 16:18:44
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

        <b-row v-if="resourceList != null">
            <b-col lg="6">
                <b-card>
                    <b-button size="sm" @click="Home">根目录</b-button>
                    <b-button size="sm" @click="Back">返回上一层</b-button>
                    <b-button size="sm"
                        @click="ShowHistoryModal"
                        v-b-modal.id-modal-history-dir
                        >查看历史路径</b-button
                    >
                    <b-form-input size="sm" v-model="currentDir">Path</b-form-input
                    ><b-button size="sm" @click="GoToCurrentPath">前往</b-button>
                    <div
                        v-if="
                            resourceList.length == 0 ||
                            resourceList == null
                        "
                    >
                        <h4>空文件夹</h4>
                    </div>
                    <div class="x" v-else>
                        <b-table
                            hover
                            :fields="resourceFields"
                            :items="resourceList"
                            @row-clicked="clickExplorer"
                            small
                        ></b-table>
                    </div>
                </b-card>
            </b-col>
            <b-col lg="6" v-if="currentResource != null">
                <b-card>
                    <div>

                                        <small
                        >资源名:
                        <strong>{{ currentResource.Name }}</strong></small
                    >
                    <br />
                    <small
                        >大小:
                        <strong
                            >{{ getWellSize }} {{ getWellUnit }} ( {{currentResSize}} Bytes )</strong
                        ></small
                    >
                    <br />
                    <small>系统</small>
                    <details
                        ><pre>{{ resourceDetailInfo }}</pre></details
                    >
                    </div>
                    <div v-if="currentDMResource != null">
                    <b-form-tags
                        size="sm"
                        input-id="id-dm-resources-tags-separators"
                        v-model="currentDMResTags"
                        @input="InputTags"
                        separator=" ,;"
                        placeholder="使用半角逗号，分号，空格隔开"
                        no-add-on-enter
                        remove-on-delete
                    ></b-form-tags>
                    <b-form-textarea
                    size="sm"
                        @blur="descriptionBlur"
                        rows="3"
                        max-rows="10"
                        v-model="currentDMResource.Description"
                    ></b-form-textarea>
                    </div>

                </b-card>
            </b-col>
        </b-row>
        <pre v-if="currentDMResource != null">{{ currentDMResource }}</pre>
        <div v-else>
            <b-button size="sm">索引该资源</b-button>
        </div>
    </b-container>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/no-side-effects-in-computed-properties */
import apiAddr from "../../server";
import bvu from "../../cc/bvUtil";
import err from "../../cc/v1x1/HttpErrReturn";
export default {
    data() {
        return {
            resourceList: null,
            dmResList: null,
            resourceFields: ["Name", "Path", "Mode", "Size", "ModTime"],
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
    },
    methods: {
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
        // 进栈目前只有两种行为：url框与点击资源管理table
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
                return ( this.currentResSize / 1024 / 1024 / 1024 ).toFixed(2);
            }
            if (this.currentResSize > 1024 * 1024) {
                return ( this.currentResSize / 1024 / 1024  ).toFixed(2);
            }
            if (this.currentResSize > 1024) {
                return ( this.currentResSize / 1024 ).toFixed(2);
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
            return "Byte"
        }
    },
};
</script>

<style scoped>
.x {
    overflow-x:auto;
}
</style>
