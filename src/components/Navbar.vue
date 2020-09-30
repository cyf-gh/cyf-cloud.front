<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-30 21:45:42
 * @FilePath: \cyf-cloud.front\src\components\Navbar.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Navbar.vue
// static
<template>
  <div>
    <b-navbar id="id-cc-navbar" fixed="top" toggleable="lg" small type="light" variant="light">
      <b-navbar-brand href="/">
        <img
          src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png"
          alt="Kitten"
          height="30"
          width="30"
          style="filter: invert(100%);"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-item href="/">主站</b-nav-item>
          <b-nav-item href="/bbs">论坛</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
        <b-dropdown-divider></b-dropdown-divider>
        <b-nav-form>
          <b-form-input class="mr-sm-2" placeholder="手气不错"></b-form-input>
          <b-button class="my-2 my-sm-0" variant="light">搜索</b-button>
        </b-nav-form>
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-item-dropdown v-if="!isLoginIn" text="账户" class="text-primary" right>
            <b-dropdown-item href="/account/login">登录</b-dropdown-item>
            <b-dropdown-item href="/account/signin">注册</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown v-else text="账户" class="text-primary" right>
            <b-dropdown-item href="/account/info">个人信息</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">注销</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import idy from "../cc/v1x1/Identity"
export default {
  name: "ccNavbar",
  data() {
    return {
      initing: true
    }
  },
  mounted() {
      idy.InitCookie(this.$cookie)
      this.initing = false;
  },
  methods: {
    logout() {
      idy.Logout();
    }
  },
  computed: {
    isLoginIn() {
      if ( this.initing ) {
        return false
      } else {
        return idy.IsLogin()
      }
    }
  },
};
</script>