<!--
 * @Date: 2020-09-28 23:12:53
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-07 18:27:54
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
            <imageCropper :isMultiFile="false"></imageCropper>
          </b-modal>
          <b-img-lazy id="id-cc-user-avatar"></b-img-lazy>
          <h6>昵称</h6>
          <b-form-input
            id="input-pswdRp"
            v-model="accountInfo.Name"
            aria-describedby="cc-input-r-name"
            trim
            disabled
          ></b-form-input>
          <b-form-text id="cc-input-r-name">不可更改</b-form-text>
          <br />
          <h6>邮箱</h6>
          <b-form-input
            id="input-pswdRp"
            v-model="accountInfo.Email"
            aria-describedby="cc-input-r-email"
            trim
            disabled
          ></b-form-input>
          <b-form-text id="cc-input-r-email">不可更改</b-form-text>
          <br />
          <h6>手机</h6>
          <b-form-input
            id="input-pswdRp"
            v-model="accountInfo.Phone"
            aria-describedby="cc-input-wr-phonel"
            trim
            :disabled="phoneExist"
          ></b-form-input>
          <b-form-text id="cc-input-wr-phone"
            >可填写信息，提交后无法更改</b-form-text
          >
          <b-button variant="light" v-if="!phoneExist">更新手机信息</b-button>
        </div>
      </b-card>
      <b-card>
        <h4>头像</h4>
        <br />
        <b-img-lazy
          v-bind="avatarProps"
          :src="accountInfo.Avatar"
          blank-color="#F8F8F8"
          rounded
          height="260"
          width="260"
        ></b-img-lazy>
        <br />
        <b-button variant="light" @click="changeAvatar">修改头像</b-button>
      </b-card>
    </b-card-group>
    <b-card-group deck>
      <b-card>
        <h4>个性化</h4>
        <br>
        <h6>站点背景图片</h6>
        <b-form-input
          id="input-pswdRp"
          v-model="accountInfo.BgUrl"
          placeholder="图片的Url"
          trim
        ></b-form-input>
        <div class="mt-2">

        <b-button variant="light" class="mr-2" @click="changeBgUrl">预览</b-button>
        <b-button variant="light" @click="changeBgUrl">上传</b-button>
        </div>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import imageCropper from "../cc-templates/imageCropper";
import theme from "../../cc/v1x1/Theme";
import idy from "../../cc/v1x1/Identity";
import bvu from "../../cc/bvUtil";

export default {
  mounted(){
    idy.InitCookie(this.$cookie);
    bvu.InitToast(this.$bvToast);
    this.isLoginIn = idy.IsLogin();
    if (this.isLoginIn) {
      idy.RefreshAccountInfo(this.axios);
      this.accountInfo = JSON.parse(localStorage.getItem("cc_account_info"));
    }
  },
  components: {
    imageCropper,
  },
  methods: {
    changeAvatar() {
      this.$refs["upload-account-avatar"].show();
    },
    changeBgUrl() {
      theme.ChangeBgUrl(this.accountInfo.BgUrl);
      localStorage.setItem("bgurl", this.infoEx.bgUrl);
    },
  },
  data() {
    return {
      accountInfo: null,
      avatarProps: { blank: true, width: 200, height: 200, class: "mb-3" },
    };
  },
  computed: {
    phoneExist() {
      return this.accountInfo.Phone != "";
    },
  },
};
</script>