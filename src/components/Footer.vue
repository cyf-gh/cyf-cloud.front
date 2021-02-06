<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-06 16:58:57
 * @FilePath: \cyf-cloud.front\src\components\Footer.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Footer.vue
<template>
<b-card>
<b-container fluid="lg">
  <footer class="navbar-fixed-bottom container py-5" >
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
          <li>
            <a class="text-muted" href="/info/api/ref">API 手册</a>
          </li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5 style="color:gray">帮助本站</h5>
        <ul class="list-unstyled text-small">
          <li></li>
          <li>
            <a class="text-muted" href="/donate">我要捐赠 &#128155;</a>
          </li>
          <li>
            <a class="text-muted" href="/donate/rank">捐赠榜单</a>
          </li>
          <li>
            <a class="text-muted" href="/info/fl">友情链接</a>
          </li>
        </ul>
      </div>
      <div class="col-12 col-md">
        <h5 style="color:gray">一言</h5>
        <small class="border d-block mb-3 text-muted px-2 py-1" id="hitokoto">正在加载一言...</small>
      </div>

    </div>
    <hr>
    <div>
      <b-row>
        <b-col class="text-center" md="6">
        <img
            src="https://gitee.com/cyf-my/imgs/raw/master/assets/icon.png"
            alt="Kitten"
            height="100"
            width="100"
            style="filter: invert(50%)"
            class="mb-1"
          />
        </b-col>
        <b-col md="6">
          <small style="color:gray;">
            <br>
            | cyf-cloud 2020 - 当前版本v1x1 - 闭源 <span id="busuanzi_container_site_pv">
            - 访问量 <span id="busuanzi_value_site_pv"></span>
              次 |
            <br>
            | 版权 cyf 所有 - 由 cyf 维护 |
            <br>
            | 在互联网发表言论与文字请遵守中华人民共和国的法律法规 |
            </span>
          </small>
        </b-col>
      </b-row>
      <div class="text-center mt-4">
      <small>
        <b-badge variant="light" href="https://se.cyf-cloud.cn:8888">国内节点</b-badge>
        <b-badge variant="light" class="ml-1" href="https://www.cyf-cloud.cn">国外节点</b-badge></small>
      </div>
    </div>
  </footer>
</b-container>
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