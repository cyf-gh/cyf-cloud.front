<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 22:17:20
 * @FilePath: \cyf-cloud.front\src\components\cyf\My.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container>
        <b-card-group>
        <b-card>
            <h2>关于站长</h2>
            <br>
            <b-container>
            <h5>其他链接：</h5>
        <b-button class="m-1 badge badge-info" href="#/blog" >博客</b-button>
        <b-button class="m-1 badge badge-info" target="_blank" href="https://github.com/cyf-gh">Github</b-button>
        <b-button class="m-1 badge badge-info" target="_blank" href="https://space.bilibili.com/3087782">哔哩哔哩</b-button>
        <b-button class="m-1 badge badge-info" href="#/music">音乐服务</b-button>
        <b-button class="m-1 badge badge-info" href="#/donate">捐赠</b-button>
        </b-container>
        <br>
        <b-container>
            <h5>联系方式：</h5>
            <ul class="list-unstyled text-small">
            <li>
            <a class="text-muted">QQ：1026279833</a>
            </li>
            <li>
            <a class="text-muted">微信：cyf_tx</a>
            </li>
            <li>
            <a class="text-muted">邮箱：cyf-ms@hotmail.com</a>
            </li>
            </ul>
        </b-container>
        </b-card>
            <h2>Github信息：</h2>
            <!--
            <ccMd :mdUrl="mrUrl" :divId="divId" :ccServer="ccServer" :mdData="infoMd" ></ccMd>
            -->
        </b-card-group>
    </b-container>
</template>

<script>
// import ccMd from '../cc-templates/markdown'
import '../../cc/css/cc-card.css'

export default {
    /*
    components: {
        ccMd
    },
    data() {
        return {
            mrUrl:"https://raw.githubusercontent.com/cyf-gh/cyf-gh/master/README.md",
            divId:"id-cc-cyf-info",
            ccServer: false,
            infoMd: "",
        }
    },
    */
    mounted() {
    },
}
</script>