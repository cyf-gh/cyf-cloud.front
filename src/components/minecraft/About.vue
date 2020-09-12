<!--
 * @Date: 2020-09-05 00:55:58
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 17:38:38
 * @FilePath: \cyf-cloud.front\src\components\minecraft\About.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
        <ccMd :mdUrl="mrUrl" :divId="divId" :ccServer="ccServer" ></ccMd>
    </div>
</template>

<script>
import ccMd from '../cc-templates/markdown'
export default {
    components: {
        ccMd
    },
    data() {
        return {
            mrUrl:"mc-about.md",
            divId:"id-cc-md-about",
            ccServer: true,
        }
    },
    mounted() {
    },
}
</script>