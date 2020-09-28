<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 15:50:20
 * @FilePath: \ccfront\src\components\cyf\My.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
        <ccMd :mdUrl="mrUrl" :divId="divId" :ccServer="ccServer" :mdData="infoMd" ></ccMd>
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
            mrUrl:"https://raw.githubusercontent.com/cyf-gh/cyf-gh/master/README.md",
            divId:"id-cc-cyf-info",
            ccServer: false,
            infoMd: "",
        }
    },
    mounted() {
    },
}
</script>