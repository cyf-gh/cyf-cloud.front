<!--
 * @Date: 2020-09-13 13:07:33
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 22:33:39
 * @FilePath: \cyf-cloud.front\src\components\account\login.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-container class="border">
    <br />
        <h2 class="text-center">账户登录</h2>
<br>
    <div role="group">
      <b-form-input
        id="input-login"
        v-model="login"
        aria-describedby="input-phone-help input-phone-feedback"
        placeholder="用户名/邮箱/手机"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-login-feedback">请输入正确的手机号码</b-form-invalid-feedback>
    </div>
    <br />
    <div role="group">
      <b-form-input
        id="input-login-paswd"
        v-model="login"
        aria-describedby="input-phone-help input-phone-feedback"
        placeholder="密码"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-login-paswd-feedback">请输入正确的手机号码</b-form-invalid-feedback>
    </div>
    <br />
        <b-button block pill variant="info" v-on:click="goLogin">登录</b-button>
    <br />
    </b-container>
</template>

<script>
export default {
data() {
    return  {
        login: '',
    }
},
methods: {
    goLogin() {
        
    }
},
}
</script>