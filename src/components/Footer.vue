<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-13 21:50:25
 * @FilePath: \cyf-cloud.front\src\components\Footer.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
// src/components/Footer.vue
<template>
  <footer class="navbar-fixed-bottom container py-5">
    <hr>
    <div class="row">
      <div class="col-6 col-md">
        <h5>关于我</h5>
        <ul class="list-unstyled text-small">
          <li>
            <a class="text-muted">QQ：1026279833</a>
          </li>
          <li>
            <a class="text-muted">微信：cyf_tx</a>
          </li>
          <li>
            <a class="text-muted">邮箱：cyf-ms@hotmail.com</a>
          </li>
          <li>

          <b-dropdown id="dropdown-dropup" dropup text="更多" variant="outline-secondary" class="m-2">
            <b-dropdown-item href="#/blog">博客</b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://github.com/cyf-gh">Github</b-dropdown-item>
            <b-dropdown-item target="_blank" href="https://space.bilibili.com/3087782">哔哩哔哩</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#/music">音乐服务</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#/donate">捐赠</b-dropdown-item>
  </b-dropdown>
          </li>

        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>帮助我</h5>
        <ul class="list-unstyled text-small">
          <li></li>
          <li>
            <a class="text-muted" href="#/donate">&#128155;我要捐赠</a>
          </li>
          <li>
            <a class="text-muted" href="#/donate/rank">&#128511;  捐赠榜</a>
          </li>

        </ul>
      </div>
      <div class="col-12 col-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="d-block mb-2"
          role="img"
          viewBox="0 0 24 24"
          focusable="false"
        >
          <title>Product</title>
          <circle cx="12" cy="12" r="10" />
          <path
            d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
          />
        </svg>
        <small class="d-block mb-3 text-muted">cyf 2020</small>
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
