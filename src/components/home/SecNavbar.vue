<!--
 * @Date: 2021-01-27 15:21:20
 * @LastEditors: cyf
 * @LastEditTime: 2021-08-05 19:23:02
 * @FilePath: \cyf-cloud.front\src\components\home\SecNavbar.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-card-group deck>
        <b-card style="z-index: 999;">
            <b-button href="/post/reader?id=46" variant="light">我的世界</b-button>
            <b-dropdown
                id="cc-home-dropdown-coo"
                class="p-1 upper"
                variant="light"
                text="企业辅助"
            >
                <b-dropdown-item href="/practice/home"
                    >做题小助手</b-dropdown-item
                >
            </b-dropdown>
            <b-dropdown
                id="cc-home-dropdown-cloud-app"
                class="p-1 upper"
                variant="light"
                text="云应用"
            >
                <b-dropdown-item href="/cloudApp/util/mcdrPlg"
                    >MCDR插件安装助手</b-dropdown-item
                >
                <b-dropdown-item href="/cloudApp/vt"
                    >开黑看视频（预览版）</b-dropdown-item
                >
            </b-dropdown>
            <b-dropdown
                id="cc-home-dropdown-annouce-cyf"
                class="p-1 upper"
                variant="light"
                text="公告"
            >
                <b-dropdown-item href="/post/reader?id=52">开发日志</b-dropdown-item>
            </b-dropdown>
        </b-card>
    </b-card-group>
</template>
