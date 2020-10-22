<template>
    <div id="cc-post-fav">
        <cc-post-list
            PostUrl="/v1x1/account/fav/post/info"
            :ClientFilter="clientFilter"
			ListTitle="收藏夹"
        ></cc-post-list>
    </div>
</template>

<script>
import postList from "../post/info/PostCardList";

export default {
    components: {
        "cc-post-list": postList,
	},
	data() {
		return {
			clientFilter: true
		}
	},
};
</script>
