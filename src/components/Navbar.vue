<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-20 22:15:13
 * @FilePath: \cyf-cloud.front\src\components\Navbar.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <sp></sp>
    <b-navbar id="id-cc-navbar" fixed="top" toggleable="sm">
      <b-navbar-brand href="/">
        <img
          src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png"
          alt="Kitten"
          height="30"
          width="30"
          style="filter: invert(50%)"
          class="mb-1"
        />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-row>
        <b-col><b-nav-item href="/">主站</b-nav-item></b-col>
        <b-col><b-nav-item href="/post/bbs">博客</b-nav-item></b-col>
        </b-row>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!--左边-->
        <b-navbar-nav class="ml-auto">
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-form>
            <b-row>
              <b-col cols="8">
                <b-form-input
                  class="sm-3"
                  placeholder="你想要搜索的内容..."
                ></b-form-input>
              </b-col>
              <b-col>
                <b-button class="sm-2" variant="light">搜索</b-button>
              </b-col>
            </b-row>
          </b-nav-form>
          <b-dropdown-divider></b-dropdown-divider>
          <div v-if="!isLoginIn">
            <b-nav-item-dropdown text="账户" class="text-primary" right>
              <b-dropdown-item href="/account/login">登录</b-dropdown-item>
              <b-dropdown-item href="/account/signin">注册</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else>
            <b-row>
              <b-col cols="1">
                <b-img-lazy
                  rounded="circle"
                  class="mt-2"
                  :src="accountInfo.Avatar"
                  alt="Kitten"
                  height="30"
                  width="30"
                />
              </b-col>
              <b-col>
                <b-nav-item-dropdown
                  :text="accountInfo.Name"
                  class="text-primary"
                  right
                >
                  <b-dropdown-item href="/account/info"
                    >个人信息</b-dropdown-item
                  >
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-on:click="logout">注销</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-col>
            </b-row>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import idy from "../cc/v1x1/Identity";
import sp from "./ScrollPerview";
import apiAddr from "../server";
import err from "../cc/v1x1/HttpErrReturn";
import bvu from "../cc/bvUtil";
import theme from "../cc/v1x1/Theme";

export default {
  name: "ccNavbar",
  components: {
    sp,
  },
  data() {
    return {
      isLoginIn: false,
      accountInfo: null,
    };
  },
  created() {
    idy.InitCookie(this.$cookie);
    bvu.InitToast(this.$bvToast);
    this.isLoginIn = idy.IsLogin();
    if (this.isLoginIn) {
      idy.RefreshAccountInfo(this.axios);
      this.accountInfo = JSON.parse(localStorage.getItem("cc_account_info"));
      
      theme.SetBgUrl( this.accountInfo.BgUrl )
      theme.ReloadBgUrl()
    }
  },
  methods: {
    logout() {
      var rs = confirm("确认登出？")
      if ( rs == false ) {
        return
      }
      this.axios
        .post(apiAddr + "/v1x1/account/logout", {}, {withCredentials: true})
        .then(
          (res) => {
            if (err.Check(res.data)) {
              idy.Logout();
              bvu.Msg("成功", "已登出账户", "success");
              this.$router.push({ path: "/home" });
              location.reload();
            } else {
              bvu.Msg("错误", "登出账户错误", "danger");
              console.error( res.data );
            }
          },
          { withCredentials: true }
        )
        .catch((err) => {
          bvu.Msg("错误", err, "danger");
          console.error(err);
        });
    },
  },
};
</script>
