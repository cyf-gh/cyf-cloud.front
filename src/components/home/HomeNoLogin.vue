<!--
 * @Date: 2020-11-01 14:46:55
 * @LastEditors: cyf
 * @LastEditTime: 2020-11-07 12:42:00
 * @FilePath: \cyf-cloud.front\src\components\home\HomeNoLogin.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div id="full-page">
        <full-page ref="fullpage" :options="options" id="fullpage">
            <div class="section">
                <b-container>
                </b-container>
            </div>
            <div class="section">
            </div>
            <div class="section">
            </div>
        </full-page>
    </div>
</template>


<script>
import Vue from 'vue'
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);

export default {
    data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        anchors: [],
        sectionsColor: ['#FAFAFA', '#F5F5F5', '#9E9E9E'],
        scrollBar: true,
      },
    }
  }
}
</script>
