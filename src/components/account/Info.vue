<!--
 * @Date: 2020-09-28 23:12:53
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 22:17:28
 * @FilePath: \cyf-cloud.front\src\components\account\Info.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
<b-container>

<b-card-group deck>
<b-card id="id-cc-basic-infos">
    <div>
        <h4>基本信息</h4>
        <!-- 弹窗部分 -->
        <b-modal ref="upload-account-avatar" hide-footer title="修改头像">
        <imageCropper></imageCropper>
        </b-modal>
        <b-img-lazy id="id-cc-user-avatar"></b-img-lazy>
        <h6>昵称</h6>
        <b-form-input
        id="input-pswdRp"
        v-model="info.name"
        aria-describedby="cc-input-r-name"
        trim disabled
      ></b-form-input>
        <b-form-text id="cc-input-r-name">不可更改</b-form-text>
        <br>
        <h6>邮箱</h6>
        <b-form-input
        id="input-pswdRp"
        v-model="info.email"
        aria-describedby="cc-input-r-email"
        trim disabled
      ></b-form-input>
        <b-form-text id="cc-input-r-email">不可更改</b-form-text>
        <br>
        <h6>手机</h6>
        <b-form-input
        id="input-pswdRp"
        v-model="info.phone"
        aria-describedby="cc-input-wr-phonel"
        trim :disabled="phoneExist"
        ></b-form-input>
        <b-form-text id="cc-input-wr-phone">可填写信息，提交后无法更改</b-form-text>
        <b-button variant="light" v-if="!phoneExist">更新手机信息</b-button>
    </div>
</b-card>
<b-card>
    <h4>头像</h4>
    <br>
    <b-img-lazy v-bind="avatarProps" :src="avaSrc" blank-color="#F8F8F8" rounded  height="260" width="260"></b-img-lazy>
    <br>
    <b-button variant="light" @click="changeAvatar">修改头像</b-button>
</b-card>
</b-card-group>
<b-card-group deck>
        <ccMd :mdUrl="mrUrl" :divId="divId" :ccServer="ccServer" :mdData="infoMd" ></ccMd>
</b-card-group>
</b-container>

</template>

<script>
import ccMd from '../cc-templates/markdown'
import imageCropper from "../cc-templates/imageCropper"

export default {
    components: {
        imageCropper,
        ccMd
    },
    methods: {
        changeAvatar() {
        this.$refs['upload-account-avatar'].show()
      },
    },
    data() {
        return{ 
            info: {
                name: "cc-name",
                email: "cc@cyf-cloud.cn",
                phone: "10086"
            },
            infoEx: {
                avaSrc: "",
            },
            avatarProps: { blank: true, width: 200, height: 200, class: 'mb-3' },
            mrUrl:"https://raw.githubusercontent.com/cyf-gh/cyf-gh/master/README.md",
            divId:"id-cc-cyf-info",
            ccServer: false,
            infoMd: "",
        }
    },
    computed: {
        phoneExist() {
            return this.info.phone!=""
        }
    }
}
</script>