<!--
 * @Date: 2020-09-13 13:07:47
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-14 19:33:42
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
      <b-form-invalid-feedback id="input-pswd-feedback">请输入至少六位的密码，且密码不能与用户名一致</b-form-invalid-feedback>
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
      <b-form-text id="input-cap-help">请输入4位验证码</b-form-text>
    </div>
    <br />
    <b-button block pill variant="info" disabled v-if="show" class="text-center">{{count}} 秒后跳转</b-button>
    <b-button block pill variant="info" v-else v-on:click="goRegister">注册</b-button>
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
            if(!( this.nameState && this.emailState && this.phoneState && this.pswdState && this.pswdRpState )) {
              bvu.Msg("提示","请先填写完信息后再获取验证码！","warning")
              return
            }
          this.capTime++;
          this.countP++;
          if ( this.capTime >= 7 ) {
            bvu.Msg("刷新次数太多","请刷新页面后重新生成验证码","danger")
            return
          }
          this.capSrc = capSrcRaw + "?cid=" + ids.GetCid() + "&time=" + this.capTime + "&uni=" + this.countP
      },
      goRegister() {
          if( this.nameState && this.emailState && this.phoneState && this.pswdState && this.pswdRpState )  {
            this.axios.post( "/v1x1/account/register",this.rgst,{withCredentials: true})
            .then(res => {
              if ( res.data.ErrCod == 0 ) {
                bvu.Msg("注册成功","已成功注册，将在3秒后跳转至登陆页面","success")
                this.count = 3
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= 3) {
                    this.count--
                    this.show = true
                  } else {
                    this.show = false
                    clearInterval(this.timer)
                    this.timer = null
                    this.$router.push('/account/login')
                  }
                }, 1000)
              } else {
                bvu.Msg("注册失败","信息：\n"+res.data.Desc,"danger")
              }
            })
            .catch(err => {
                bvu.Msg("注册失败！","请查看控制台并联系网站管理员","danger")
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
      count: 3,
      countP: 0,
      show: false,
      timer: null,
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
      return this.rgst.pswd.length >= 6 && this.rgst.pswd != this.rgst.name;
    },
    pswdRpState() {
      return this.rgst.pswd == this.pswdRp && this.pswdState
    }
  },
};
</script>