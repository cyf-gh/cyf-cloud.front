<!--
 * @Date: 2020-12-04 17:01:13
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-04 17:04:45
 * @FilePath: \cyf-cloud.front\src\components\post\TagList.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<div>
    <b-badge variant="light" :href="tagPostHref(tag.Text)" v-for="tag in tags" :key="tag.Text"> {{tag.Text}} </b-badge>
</div>
</template>

<script>
export default {
    props:{
        tags: null
    },
    methods: {
        tagPostHref( tagName ) {
            return "/posts?tags=" + tagName
        },
    },
}
</script>