<!--
 * @Date: 2020-08-13 20:58:42
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-23 15:32:10
 * @FilePath: \cyf-cloud.front\src\components\cyf\DonateRank.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div class="container text-center">
    <br>
    <h2>捐赠榜 &#128511;</h2>
    <br>
    <b-table
      striped
      rank="my-table"
      :items="donaters"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    <b-pagination
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    <p>共计：{{totalRmb}} </p>
  </div>
</template>

<script>
  import apiServer from "../../server"
  export default {
    metaInfo() {
        return {
          title: "❤捐赠榜单",
          titleTemplate: '%s - cyf-cloud',
          htmlAttrs: {
            lang: 'zh-cn',
            amp: true
            }
        }
    },
    mounted:function(){
        this.axios.get( apiServer + "/v1/donate/rank")
        .then(res => {
          this.donaters = res.data;
          this.donaters.forEach( el => {
            if( !isNaN( el["RMB"] ) ) {
              this.totalRmb += parseFloat( el["RMB"] );
            }
          });
          this.totalRmb = this.totalRmb.toFixed(2);
        })
        .catch(err => {
            console.error(err);
        })
    },
    data() {
      return {
        perPage: 10,
        currentPage: 1,
        donaters: [
        ],
        totalRmb:0
      }
    },
    computed: {
      rows() {
        return this.donaters.length
      }
    }
  }
</script>