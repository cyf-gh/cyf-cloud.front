<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-20 18:32:44
 * @FilePath: \cyf-cloud.front\src\components\Footer.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Footer.vue
<template>
<b-card>
  <footer class="navbar-fixed-bottom container py-5">
    <div class="row">
      <div class="col-6 col-md">
        <h5 style="color:gray">cyf-cloud</h5>
        <ul class="list-unstyled text-small">
          <li>
            <a class="text-muted" href="/info/about">关于站长</a>
          </li>
          <li>
            <a class="text-muted" href="/info/join">加入团队</a>
          </li>
          <li>
            <a class="text-muted" href="/info/contact">用户协议</a>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5 style="color:gray">帮助本站</h5>
        <ul class="list-unstyled text-small">
          <li></li>
          <li>
            <a class="text-muted" href="#/donate">我要捐赠&#128155;</a>
          </li>
          <li>
            <a class="text-muted" href="#/donate/rank">捐赠榜&#128511;</a>
          </li>
          <li>
            <a class="text-muted" href="#/info/fl">友情链接</a>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md">
        <h5 style="color:gray">一言</h5>
        <small class="border d-block mb-3 text-muted" id="hitokoto">正在加载一言...</small>
      </div>
      <div class="col-12 col-md">
        <b-badge pill variant="light">
          <span id="busuanzi_container_site_pv">
            访问量
            <span id="busuanzi_value_site_pv"></span>次
          </span>
        </b-badge>
      </div>
    </div>
    <hr>
    <div class="text-center" >

    <p style="color:gray;">
      cyf-cloud 2020. Designed and built with all the love in the world. Maintained by cyf.
      <br>
      Currently v1x1. Code closed-source. cyf all copyright reserved.
    </p>
      <img
          src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png"
          alt="Kitten"
          height="100"
          width="100"
          style="filter: invert(50%)"
          class="mb-1"
        />
    </div>
  </footer>
</b-card>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<script src="https://cdn.jsdelivr.net/npm/bluebird@3/js/browser/bluebird.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@2.0.3/fetch.min.js"></script>
<script>
  fetch('https://v1.hitokoto.cn')
    .then(function (res){
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.innerText = data.hitokoto + '——【' + data.from + '】';
    })
    .catch(function (err) {
      console.error(err);
    })
</script>