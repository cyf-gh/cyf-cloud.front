<!--
 * @Date: 2020-10-14 21:08:23
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-25 18:31:02
 * @FilePath: \cyf-cloud.front\src\components\post\BBS.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div id="cc-post-bbs">
        <cc-post-list
            PostUrl="/v1x1/posts/info"
            :ClientFilter="clientFilter"
            ListTitle="文章列表"
        ></cc-post-list>
    </div>
</template>

<script>
import postList from "./info/PostCardList";

export default {
    components: {
        "cc-post-list": postList,
    },
    data() {
      return {
        clientFilter: false
      }
    },
};
</script>
