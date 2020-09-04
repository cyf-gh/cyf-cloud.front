<!--
 * @Date: 2020-09-05 00:56:07
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-05 02:01:46
 * @FilePath: \cyf-cloud.front\src\components\cyf\My.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container>
    <div id="id-cc-cyf-info"></div>
    </b-container>
</template>

<script>

var marked = require('marked');
export default {
    data() {
        return {
            infoMd:""
        }
    },
    mounted() {
        this.axios.get("https://raw.githubusercontent.com/cyf-gh/cyf-gh/master/README.md")
        .then(res => {
            this.infoMd = res.data
            document.getElementById('id-cc-cyf-info').innerHTML = (marked(this.infoMd))
        })
        .catch(err => {
            console.error(err); 
        })
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
    },
}
</script>