<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-28 17:47:01
 * @FilePath: \ccfront\src\components\Footer.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Footer.vue
<template>
<div id="cc-footer">
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
        <small class="d-block mb-3 text-muted" id="hitokoto">正在加载一言...</small>
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
  </footer>
</div>
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

<style scoped>
#cc-footer{
  background-color:  #eee
}
</style>
