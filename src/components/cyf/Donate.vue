<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 16:24:51
 * @FilePath: \cyf-cloud.front\src\components\cyf\Donate.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>

<div class="container text-center">
  <b-card>

    <b-alert show >您的捐赠能更好的帮助我进行网络服务建设！感谢各位衣食父母！</b-alert>
    <b-row class= "text-center">
    <b-col>
      <b-img thumbnail fluid src="https://s1.ax1x.com/2020/07/13/UJB7ff.jpg" width="200" height="200"></b-img>
      <small class="d-block mb-3 text-muted">支付宝</small>
    </b-col>
    <b-col>
      <b-img thumbnail fluid src="https://s1.ax1x.com/2020/07/13/UJBokt.jpg" width="200" height="200"></b-img>
      <small class="d-block mb-3 text-muted">微信</small>
    </b-col>
    </b-row>
    <div class="container text-center">
      <br>
      <b-button href="#/donate/rank" size="lg" pill variant="outline-warning">查看捐赠榜</b-button>
    </div>
    <br>
  </b-card>

  </div>
</template>

<script>
export default {};
</script>