// src/components/Navbar.vue
// static
<template>
    <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
        <b-navbar-brand>cyf-cloud</b-navbar-brand>
        <b-nav-item href="#">个人博客</b-nav-item>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Minecraft" right>
            <b-dropdown-item href="http://lod.tpddns.cn:8123">1.14.4 纯净服网页地图</b-dropdown-item>
            <b-dropdown-item href="http://lod.tpddns.cn:8124">1.12.2 Mod 服网页地图</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="音乐服务" right>
            <b-dropdown-item href="http://lod.tpddns.cn:5555/">Web站点</b-dropdown-item>
            <b-dropdown-item href="http://lod.tpddns.cn:5225/">上传音乐文件</b-dropdown-item>
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