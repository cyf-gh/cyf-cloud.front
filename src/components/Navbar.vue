<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-12 18:56:52
 * @FilePath: \cyf-cloud.front\src\components\Navbar.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Navbar.vue
// static
<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
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
          <b-nav-item href="#/">主页</b-nav-item>
           <b-nav-item-dropdown text="我的世界" right>
            <b-dropdown-item href="#/mc">主页</b-dropdown-item>
            <b-dropdown-item href="#/mc/skin">外置登录</b-dropdown-item>
            <b-dropdown-item href="#/mc/map">卫星地图</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#/mc/about">关于</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item target="_blank" href="http://discuz.cyf-cloud.cn:8233/" disabled>论坛</b-nav-item>

          <b-nav-item-dropdown text="云应用" right>
            <b-dropdown-item href="#/util/mcdrPlg">MCDR插件安装助手</b-dropdown-item>
            <b-dropdown-item href="#/vt">开黑看视频（预览版）</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-dropdown-divider></b-dropdown-divider>
          <b-nav-item-dropdown text="账户" class="text-primary" right>
            <b-dropdown-item disabled href="#/">登录</b-dropdown-item>
            <b-dropdown-item disabled href="#/">注册</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "ccNavbar",
};
</script>