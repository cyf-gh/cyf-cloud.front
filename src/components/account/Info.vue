<!--
 * @Date: 2020-09-28 23:12:53
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-29 20:51:17
 * @FilePath: \cyf-cloud.front\src\components\account\Info.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>
        <b-modal ref="upload-account-avatar" hide-footer title="修改头像">
        <imageCropper></imageCropper>
        </b-modal>
        <b-button @click="changeAvatar">修改头像</b-button>
    </div>
</template>

<script>
import imageCropper from "../cc-templates/imageCropper"

export default {
    components: {
        imageCropper
    },
    methods: {
        changeAvatar() {
        this.$refs['upload-account-avatar'].show()
      },
    },
}
</script>