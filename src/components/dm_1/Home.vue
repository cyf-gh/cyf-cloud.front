<!--
 * @Date: 2021-01-06 13:00:26
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-07 14:52:11
 * @FilePath: \cyf-cloud.front\src\components\dm_1\Home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->

<template>
<b-container fluid="md">
    <b-row v-if="this.resourceList != null">
        <b-col lg="6">
            <b-button @click="Home">Home</b-button>
            <b-button @click="Back">Back</b-button>
            <b-input :value="this.dirStack[this.dirStack.length - 1]">Path</b-input>
            <div v-if="this.resourceList.length == 0">
                <h4>Nothing here</h4>
            </div>
            <div v-else>
                <b-table hover :fields="this.resourceFields" :items="this.resourceList" @row-clicked="clickExplorer" small></b-table>
            </div>
        </b-col>
        <b-col lg="6" v-if="this.currentResource!=null">
            <b-form-tags
                input-id="id-dm-resources-tags-separators"
                v-model="currentDMResTags"
                @input="InputTags"
                separator=" ,;"
                placeholder="使用半角逗号，分号，空格隔开"
                no-add-on-enter
                remove-on-delete
            ></b-form-tags>
            <b-input :value="this.currentDMResource.Description"></b-input>
            <pre v-if="this.currentDMResource!=null">{{this.currentDMResource}}</pre>
            <div v-else>
            <b-button>Order It</b-button>
            </div>
            <h5>Name</h5>
            <pre>{{this.currentResource.Name}}</pre>
            <h5>Size</h5>
            <pre>{{this.currentResSize}}</pre>
            <h5>Sys</h5>
            <details><pre>{{this.resourceDetailInfo}}</pre></details>
        </b-col>

    </b-row>
</b-container>
</template>


<script>
import apiAddr from "../../server";

export default {
    data() {
        return {
            resourceList: null,
            dmResList: null,
            resourceFields: ['Name', 'Path', 'Mode', 'Size', 'ModTime'],
            resourceDetailInfo: "",
            currentResource: null,
            currentDMResource: null,
            currentResSize: 0,
            dirStack: [],
            rootDir: "",
            allTags: [],
            allTags2: [],
            currentDMResTags: [],
        }
    },
    mounted() {
        this.axios.get(apiAddr+"/v1x1/dm/1/raw/root", { withCredentials: true })
        .then(res => {
            this.rootDir = JSON.parse(res.data.Data);
            this.dirStack.push( this.rootDir )
            this.Home()
        })
        .catch(err => {
            console.error(err);
        })  
    },
    methods: {
        GetAllTags() {
            this.axios.get(apiAddr+"/v1x1/dm/1/tags/all", { withCredentials: true })
                .then(res => {
                    var tags = JSON.parse(res.data.Data);
                    this.allTags = new Map()
                    tags.forEach( el => {
                        this.allTags[el.Id] = el.Name
                        this.allTags2[el.Name] = el.Id
                    } )
                    this.UpdateCurrentDMResTags()
                })
                .catch(err => {
                    console.error(err);
            })
        },
        UpdateCurrentDMResTags() {
            this.currentDMResTags = []
            if ( this.currentDMResource.TagIds != null ) {
                this.currentDMResource.TagIds.forEach( el => {
                    this.currentDMResTags.push( this.allTags[el] )
                } )
            }
        },
        Home() {
            this.axios.get(apiAddr+"/v1x1/dm/1/raw/dir/root", { withCredentials: true })
                .then(res => {
                    this.resourceList = JSON.parse(res.data.Data);
                })
                .catch(err => {
                    console.error(err);
            })
            this.axios.get(apiAddr+"/v1x1/dm/1/query/dir", { 
                params:{ d: this.rootDir },
                withCredentials: true })
            .then(res => {
                this.dmResList = JSON.parse(res.data.Data);
            })
            .catch(err => {
                console.error(err);
            })
            this.dirStack.push( this.rootDir )
        },
        Back() {
            console.log( this.dirStack )
            if ( this.dirStack.length > 1 ) {
                this.dirStack.pop()
                this.GoToCurrentPath()
            }
        },
        Forward( path ) {
            this.dirStack.push( path )
            this.GoTo( path )
        },
        GoToCurrentPath() {
            this.GoTo( this.dirStack[this.dirStack.length - 1] )
        },
        GoTo( path ) {
            this.currentDir = path
            this.axios.get(apiAddr+"/v1x1/dm/1/raw/dir", { 
                params:{ d: path },
                withCredentials: true })
                .then(res => {
                    this.resourceList = JSON.parse(res.data.Data);
                })
                .catch(err => {
                    console.error(err);
                })
            this.axios.get(apiAddr+"/v1x1/dm/1/query/dir", { 
                params:{ d: path },
                withCredentials: true })
            .then(res => {
                this.dmResList = JSON.parse(res.data.Data);
            })
            .catch(err => {
                console.error(err);
            })
        },
        InputTags( value ) {
            console.log( value )
            this.currentDMResource.TagIds = []
            var newTags = []
            value.forEach( el => {
                if ( this.allTags2[el] == null ) {
                    console.log( "new tag:", el )
                    newTags.push(el)
                } else {
                    this.currentDMResource.TagIds.push( this.allTags2[el] )
                }
            } )
            if ( newTags.length == 0 ) {
                this.UpdateDMRes()
                return
            } else {
                this.axios.post(apiAddr+"/v1x1/dm/1/tags/add", newTags, { withCredentials: true })
                .then(res => {
                    console.log( res )
                    JSON.parse( res.data.Data ).forEach( el => {
                        this.currentDMResource.TagIds.push( el )
                    } )
                    console.log( this.currentDMResource )
                    this.UpdateDMRes()
                })
                .catch(err => {
                    console.error(err);
                 })
            }
        },
        UpdateDMRes() {
            this.axios.post(apiAddr+"/v1x1/dm/1/info/modifies", this.currentDMResource, {withCredentials: true})
            .then(res => {
                console.log(res)
                this.GetAllTags()
            })
            .catch(err => {
                console.error(err);
            })
        },
        getDirSize( path ) {
                this.axios.get(apiAddr+"/v1x1/dm/1/raw/recruit/dir/size", { 
                    params:{ d: path },
                    withCredentials: true })
                .then(res => {
                    this.currentResSize = JSON.parse(res.data.Data);
                })
                .catch(err => {
                    console.error(err);
                })
        },
        // 进栈目前只有两种行为：url框与点击资源管理table
        clickExplorer(record, index) {
            console.log( record, index )
            this.resourceDetailInfo = record.Sys
            this.currentResource = record
            this.queryDMResource()
            if ( record.IsDir == true ) {
                this.getDirSize( record.Path )
                this.Forward( record.Path )
            } else {
                this.currentResSize = record.Size
            }
        },
        queryDMResource() {
            this.currentDMResource = null
            this.dmResList.forEach( el => {
                if ( el.Path == this.currentResource.Path ) {
                    this.currentDMResource = el
                    return
                }
            });
            this.GetAllTags()
        },
    },
}
</script>