// src/components/Navbar.vue
// static
<template>
    <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
        <b-navbar-brand href="/">
            <img src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png" alt="Kitten" height="30" width="30">
        </b-navbar-brand>
        <b-nav-item href="/">主页</b-nav-item>
        <b-nav-item href="/mc">我的世界</b-nav-item>
        <b-nav-item href="/music">音乐</b-nav-item>

        <b-nav-item-dropdown text="个人" right>
            <b-dropdown-item href="/blog">博客</b-dropdown-item>
            <b-dropdown-item href="https://github.com/cyf-gh">Github</b-dropdown-item>
            <b-dropdown-item href="https://space.bilibili.com/3087782">哔哩哔哩</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="/donate">捐赠</b-dropdown-item>
        </b-nav-item-dropdown>


        </b-navbar-nav>
    </b-navbar>
    </div>
</template>

<script>
export default {
    name: "ccNavbar"
}    
</script>