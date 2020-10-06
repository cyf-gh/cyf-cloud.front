<!--
 * @Date: 2020-10-06 19:38:56
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 20:19:42
 * @FilePath: \cyf-cloud.front\src\components\ScrollPerview.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <div id="posTop" class="cc-pos-top"></div>
    <div id="pos" class="cc-pos"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  data() {
    return {
      value: 0,
      max: 100,
    };
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let total = document.documentElement.scrollHeight - window.innerHeight;
      let persentage = parseInt((scrollTop / total) * 100);
      // console.log(scrollTop);

      document.getElementById("pos").style.display =
        scrollTop === 0 ? "none" : "block";
      document.getElementById("pos").innerHTML = `${persentage}%`;
      document.getElementById("posTop").style.width = `${persentage}%`;
    },
  },
};
</script>

<style>
.cc-pos-top {
    position: fixed;
    top: 0;
    height: 8px;
    background: rgb(0,0,0,0.3);
    z-index: 999999;
}
.cc-pos {
    display: none;
    position: fixed;
    bottom: 100px;
    right: 20px;
    padding: 10px;
    background: rgb(0,0,0,0.3);
    color: white;
    width: 40px;
    text-align: center;
    border-radius: 5px;
}
</style>