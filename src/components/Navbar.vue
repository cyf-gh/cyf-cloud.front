<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-12-05 20:30:52
 * @FilePath: \cyf-cloud.front\src\components\Navbar.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <sp></sp>
    <b-navbar fixed="top" toggleable="sm">
      <b-navbar-brand href="/home">
        <img
          src="/favicon.ico"
          alt="cyf-cloud"
          height="25"
          width="25"
          style="filter: invert(50%)"
          class="mb-1"
        />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-row>
          <b-col><b-nav-item href="/home">主页</b-nav-item></b-col>
          <b-col><b-nav-item href="/post/home">博客</b-nav-item></b-col>
        </b-row>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!--左边-->
        <b-navbar-nav class="ml-auto">
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-form>
                <b-form-input
                  class="mr-sm-2 mr-2"
                  placeholder="文章/用户"
                  v-model="searchText"
                  @keydown.enter.native="doSearch"
                   style="width:12rem;"
                ></b-form-input>
                <b-button class="my-2 my-sm-0 mr-4" @click="doSearch" variant="light">搜索</b-button>
          </b-nav-form>
          <b-dropdown-divider></b-dropdown-divider>
          <div v-if="!isLoginIn">
            <b-nav-item-dropdown text="账户" class="text-primary" right>
              <b-dropdown-item href="/account/login">登录</b-dropdown-item>
              <b-dropdown-item href="/account/signin">注册</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else-if="isLoginIn && accountInfo!=null">
            <b-row>
              <b-col cols="1">
                <b-img-lazy
                  rounded="circle"
                  class="mt-2"
                  :src="accountInfo.Avatar"
                  alt="Kitten"
                  height="25"
                  width="25"
                />
              </b-col>
              <b-col>
                <b-nav-item-dropdown
                  :text="accountInfo.Name"
                  class="text-primary"
                  right
                >
                  <b-dropdown-item :href="userHomeUrl()">我的主页</b-dropdown-item>
                  <b-dropdown-item href="/account/info">个人信息</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item href="/account/fav">收藏夹</b-dropdown-item>
                  <b-dropdown-item href="/post/editor">发表文章</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item v-on:click="logout">登出</b-dropdown-item>
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
import sh from "../cc/searchHistory"

export default {
  name: "ccNavbar",
  components: {
    sp,
  },
  data() {
    return {
      isLoginIn: false,
      accountInfo: null,
      searchText: "",
    };
  },
  mounted() { 
  },
  created() {
    idy.InitCookie(this.$cookie);
    bvu.InitToast(this.$bvToast);
    this.isLoginIn = idy.IsLogin();
    if ( this.isLoginIn ) {
      try {
        this.accountInfo = JSON.parse(localStorage.getItem("cc_account_info"));
      } catch {
        console.log( "parse failed" )
        this.relog();
      }
      if ( this.accountInfo == null ) {
          this.axios.get(apiAddr+"/v1x1/account/private/info", { withCredentials: true })
          .then(res => {
            localStorage.setItem( "cc_account_info", res.data.Data )
              this.accountInfo = JSON.parse(localStorage.getItem("cc_account_info"));
              theme.SetBgUrl(this.accountInfo.BgUrl);
              theme.ReloadBgUrl();
          })
          .catch(err => {
              console.error(err);
              this.relog();
          })
      }
    }
    this.isLoginIn = ( this.accountInfo != null );
    console.log( this.accountInfo )
  },
  methods: {
    relog() {
      this.isLoginIn = ( this.accountInfo != null );
      if ( !this.isLoginIn ) {
        idy.ClearAccountInfo();
        localStorage.clear();
        bvu.Msg("提示", "账户信息已失效，请重新登录", "warning");
      }
    },
    doSearch(event) {
        console.log("searching...")
        sh.AddSearchHistory(this.searchText)
        let routeUrl = this.$router.resolve({
              path: "/search?text=" + this.searchText,
        });
        window.open(routeUrl .href, '_blank');
    },
    logout() {
      var rs = confirm("确认登出？");
      if (rs == false) {
        return;
      }
      this.axios
        .post(apiAddr + "/v1x1/account/logout", {}, { withCredentials: true })
        .then(
          (res) => {
            if (err.Check(res.data)) {
              idy.Logout();
              bvu.Msg("成功", "已登出账户", "success");
              this.$router.push({ path: "/home/nl" });
              location.reload();
            } else {
              bvu.Msg("错误", "登出账户错误", "danger");
              console.error(res.data);
            }
          },
          { withCredentials: true }
        )
        .catch((err) => {
          bvu.Msg("错误", err, "danger");
          console.error(err);
        });
    },
    userHomeUrl() {
      return "/user/home?id=" + this.accountInfo.Id
    }
  },
};
</script>
