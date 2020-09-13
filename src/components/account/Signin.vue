<!--
 * @Date: 2020-09-13 13:07:47
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 20:05:28
 * @FilePath: \cyf-cloud.front\src\components\account\SignIn.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <b-container class="border">
    <br>
    <h2 class="text-center">账户注册</h2>
    <p class="text-center">立马注册享受更多在线服务！</p>
    <br />
    <div role="group">
      <b-form-input
        id="input-name"
        v-model="rgst.name"
        :state="nameState"
        aria-describedby="input-name-help input-name-feedback"
        placeholder="昵称"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-name-feedback">昵称至少三个字符</b-form-invalid-feedback>
      <b-form-text id="input-name-help">输入你的昵称</b-form-text>
    </div>
    <br />
    <div role="group">
      <b-form-input
        id="input-email"
        v-model="rgst.email"
        :state="emailState"
        aria-describedby="input-email-help input-email-feedback"
        placeholder="邮箱"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-email-feedback">请输入正确的邮箱</b-form-invalid-feedback>
      <b-form-text id="input-email-help">输入你的邮箱</b-form-text>
    </div>
    <br />
    <div role="group">
      <b-form-input
        id="input-phone"
        v-model="rgst.phone"
        :state="phoneState"
        aria-describedby="input-phone-help input-phone-feedback"
        placeholder="+86"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-phone-feedback">请输入正确的手机号码</b-form-invalid-feedback>
      <b-form-text id="input-phone-help">输入你的手机号码（可选项）</b-form-text>
    </div>
    <br />
    <div role="group">
      <b-form-input
        id="input-pswd"
        v-model="rgst.pswd"
        :state="pswdState"
        aria-describedby="input-pswd-help input-pswd-feedback"
        placeholder="密码"
        type="password"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-pswd-feedback">请输入至少六位的密码</b-form-invalid-feedback>
      <b-form-text id="input-pswd-help">输入你的密码</b-form-text>
    </div>
    <br>
        <div role="group">
      <b-form-input
        id="input-pswdRp"
        v-model="pswdRp"
        :state="pswdRpState"
        aria-describedby="input-pswdRp-help input-pswdRp-feedback"
        placeholder="再次输入密码"
        type="password"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-pswdRp-feedback">请输入一致的密码</b-form-invalid-feedback>
      <b-form-text id="input-pswdRp-help">再次输入你的密码</b-form-text>
    </div>
    <br>
    <div role="group">
      <b-form-input
        id="input-cap"
        v-model="rgst.cap"
        aria-describedby="input-cap-help"
        placeholder="验证码"
        trim
      ></b-form-input>
      <br>
      <b-img :src="capSrc"></b-img>
      <b-button v-on:click="getNewCap" variant="primary" pill>点击获取新验证码</b-button>
    </div>
    <br />
    <b-button block pill variant="info" v-on:click="goRegister">注册</b-button>
    <br>
  </b-container>
</template>

<script>
import vld from "../../cc/validate";
import bvu from "../../cc/bvUtil";
import apiSe from "../../server"
import ids from "../../cc/v1x1/Identity"
const capSrcRaw = apiSe + "/v1x1/security/captcha";
export default {
  methods: {
      getNewCap() {
          this.capTime++;
          this.capSrc = capSrcRaw + "?cid=" + ids.GetCid() + "&time=" + this.capTime
      },
      goRegister() {
          if( this.nameState && this.emailState && this.phoneState && this.pswdState && this.pswdRpState )  {
            this.axios.withCredentials = true
            this.axios.post( "/v1x1/account/register/",this.rgst)
            .then(res => {
              if ( res.data.err_cod == 0 ) {
                alert("ok")
              } else {
                console.log(res)
              }
            })
            .catch(err => {
                console.error(err); 
            })
          } else {
            bvu.Msg("错误","有信息错误，请检查后重新点击注册","danger")
          }
      }
  },
  data() {
    return {
      rgst: {
          name: "",
          email: "",
          phone: "",
          pswd: "",
          cap:"",
      },
      pswdRp:"",
      capSrc: "",
      capTime: 0,
    };
  },
  mounted() {
    bvu.InitToast(this.$bvToast)
  },
  computed: {
    nameState() {
      return this.rgst.name.length > 3 ? true : false;
    },
    emailState() {
      return vld.ValidateStr(
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
        this.rgst.email
      );
    },
    phoneState() {
      if (this.rgst.phone.length == 0) {
        return true;
      } else {
        return vld.ValidateStr(
          /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
          this.rgst.phone
        );
      }
    },
    pswdState() {
      return this.rgst.pswd.length >= 6 ? true : false;
    },
    pswdRpState() {
        return this.rgst.pswd == this.pswdRp && this.rgst.pswd.length >= 6
    }
  },
};
</script>