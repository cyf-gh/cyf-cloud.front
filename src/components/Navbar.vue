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
          <b-nav-item href="#/mc">我的世界</b-nav-item>
          <b-nav-item disabled href="#/vt">开黑看视频</b-nav-item>
          <b-nav-item target="_blank" href="http://discuz.cyf-cloud.cn:8233/">论坛</b-nav-item>
          <b-nav-item-dropdown text="个人" right>
            <b-dropdown-item href="#/blog">博客</b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://github.com/cyf-gh">Github</b-dropdown-item>
            <b-dropdown-item target="_blank" href="#/music">哔哩哔哩</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item target="_blank" href="https://space.bilibili.com/3087782">音乐服务</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#/donate">捐赠</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
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