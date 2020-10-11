<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-11 03:02:24
 * @FilePath: \cyf-cloud.front\src\components\cyf\My.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container>
        <b-card-group>
        <b-card>
            <b-container style="border-style: dotted;border-width:2px">
            <img
            src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png"
            alt="cyf"
            height="300"
            width="300"
            style="filter: invert(50%)"
            class="my-auto cc-put-right"
            />
            <h2 class="mt-2">关于站长</h2>
            <h1 class="mx-4 my-3" ><strong>cyf</strong></h1>
            <br>
            <b-container>
            <h5>其他链接：</h5>
        <b-badge variant="light" class="mr-2" target="_blank" href="https://cyf-ms.gitbook.io/tans-to-cn/">Github</b-badge>
        <b-badge variant="light" class="mr-2" target="_blank" href="https://github.com/cyf-gh">GitBook</b-badge>
        <b-badge variant="light" class="mr-2" target="_blank" href="https://steamcommunity.com/id/cyfsteam/">Steam</b-badge>
        <b-badge variant="light" class="mr-2" target="_blank" href="https://space.bilibili.com/3087782">bilibili</b-badge>
        <b-badge variant="light" class="mr-2" href="/blog" >博客</b-badge>
        <b-badge variant="light" href="/donate">捐赠</b-badge>
        </b-container>
        <br>
        <b-container>
            <h5>联系方式：</h5>
            <ul class="list-unstyled text-small">
            <li>
            <a class="text-muted">QQ：<b-badge variant="light">1026279833</b-badge></a>
            </li>
            <li>
            <a class="text-muted">微信：<b-badge variant="light">cyf_tx</b-badge></a>
            </li>
            <li>
            <a class="text-muted">邮箱：<b-badge variant="light">cyf-ms@hotmail.com</b-badge></a>
            </li>
            </ul>
        </b-container>
            </b-container>
        </b-card>
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