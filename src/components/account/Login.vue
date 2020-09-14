<!--
 * @Date: 2020-09-13 13:07:33
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-14 19:51:06
 * @FilePath: \cyf-cloud.front\src\components\account\login.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <b-container class="border">
    <br />
    <h2 class="text-center">账户登录</h2>
    <br />
    <div role="group">
      <b-form-input id="input-login-login" v-model="login" :state="getType" placeholder="用户名/邮箱/手机" trim></b-form-input>
      <small>{{loginTypeShowText}}</small>
    </div>
    <br />
    <div role="group">
      <b-form-input id="input-login-paswd" type="password" v-model="pswd" placeholder="密码" trim></b-form-input>
    </div>
    <br />
    <b-button block pill variant="info" v-on:click="goLogin">登录</b-button>
    <br />
  </b-container>
</template>

<script>
import vld from "../../cc/validate";
import bvu from "../../cc/bvUtil";
export default {
  data() {
    return {
      login: "",
      loginType: "",
      pswd :"", 
      loginTypeShowText: "",
    };
  },
  methods: {
    goLogin() {
      if( !this.getType ) {
        bvu.Msg( "错误", "登陆用户名/邮箱/电话输入有误", "danger" )
        return;
      } else {
        this.axios.post("/v1x1/account/login",{
          "login":this.login,
          "loginType": this.loginType,
          "pswd": this.pswd
        }, {withCredentials: true})
        .then(res => {
          if ( res.data.ErrCod == 0 ) {
            bvu.Msg("登录成功","已成功登录，将在3秒后跳转至登陆页面","success")
            console.log( res.data )
            return;
          } else {
            console.error( res.data )
            bvu.Msg("登录失败","信息：\n"+res.data.Desc,"danger")
          }
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        })
      }
    },
  },
  mounted() {
    bvu.InitToast(this.$bvToast)
  },
  computed: {
    getType() {
      if ( this.login.length <= 3 ) {
        this.loginTypeShowText =  ""
        this.loginType = ""
        return false;
      } else {
        var isEmail = vld.ValidateStr(
            /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            this.login )
        
        var isPhone = vld.ValidateStr(
            /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            this.login )
        if( isEmail ) {
          this.loginTypeShowText =  "邮箱"
          this.loginType = "email"
        }
        if ( isPhone ) {
          this.loginTypeShowText =  "手机"
          this.loginType = "phone"
        }
        if ( !isEmail && !isPhone ) {
          this.loginTypeShowText =  "昵称"
          this.loginType = "name"
        }
        return true;
      }
    }
  }
};
</script>