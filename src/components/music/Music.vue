<template>
<div class="container">
    <b-alert show variant="warning">由于浏览器跨域访问的限制，本页面只提供歌曲预览而无法播放。<br>如需要完整的服务请点击<a href="https://se.cyf-cloud.cn:5555/login.view" class="alert-link" target="_blank" security="restricted" sandbox="">这里</a>
    </b-alert>
    <iframe class="cc-iframe" src="https://se.cyf-cloud.cn:5555/login.view" frameborder="no"  security="restricted" sandbox="allow-scripts allow-forms allow-popups"></iframe>
    <b-badge pill variant="info" href="http://www.subsonic.org/">Powered by Subsonic©</b-badge>
    <b-badge pill variant="warning" href="https://jq.qq.com/?_wv=1027&k=isIw44iL">加入QQ群以获取账户密码</b-badge>
    <br>
    <b-badge pill variant="primary" href="#/music/upload">上传歌曲</b-badge>

</div>
</template>

<script>
export default {
    name: "ccMusicServe"
};
</script>


<style scoped>
    .cc-iframe {
        width: 100%;
        height: 40rem;
    }
</style>