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
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    mounted:function(){
        axios.get("/v1/donate/rank","")
        .then(res => {
          this.donaters = res.data;
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
        ]
      }
    },
    computed: {
      rows() {
        return this.donaters.length
      }
    }
  }
</script>