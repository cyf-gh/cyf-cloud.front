<template>
    <div class="container text-center">
        <br>
        <b-alert show variant="warning"><a>请不要使用国产浏览器进行注册！请使用诸如Edge Chrome等浏览器进行网站操作！</a></b-alert>
              <b-button
        href="http://se.cyf-cloud.cn:8228"
        target="_blank"
        security="restricted"
        sandbox
        pill
        variant="warning"
      >前往注册官网</b-button>
        <div class="mask">
        <br>
        <iframe class="cc-iframe" src="http://discuz.cyf-cloud.cn:8233/forum.php?mod=viewthread&tid=3&extra=page%3D1"  frameborder="no" security="restricted" sandbox="allow-scripts allow-same-origin allow-popups" disabled></iframe>
        </div>
    </div>
</template>

<style scoped>
    .cc-iframe {
        width: 100%;
        height: 40rem;
    }
</style>