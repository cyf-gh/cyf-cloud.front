<!--
 * @Date: 2020-10-02 14:45:22
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-10 23:16:12
 * @FilePath: \cyf-cloud.front\src\components\v1x1\Clipboard.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
  <div>
    <h4>快速剪切板</h4>
    <b-overlay
      :show="haste.TextHide"
      rounded="sm"
      class="mt-3"
      spinner-variant="light"
      spinner-type="grow"
      spinner-small
    >
      <b-form-textarea
        id="id-cc-haste-textarea"
        v-model="haste.Text"
        placeholder="复制你需要备忘的文字在这里..."
        rows="10"
        max-rows="15"
        @input="modify"
      ></b-form-textarea>
    </b-overlay>
    <b-row class="mt-3">
        <b-col>
        <b-form-checkbox swith v-model="haste.TextHide" @change="modify" class="m-2">隐藏内容</b-form-checkbox>
        </b-col>
        <b-col>
        <b-form-checkbox swith v-model="autoUpdate" @change="switchAutoupdate" class="m-2">自动同步</b-form-checkbox>
        </b-col>
        <b-col>
        <b-button block variant="light" @click="update">更新</b-button>
        </b-col>
    </b-row>
    <small class="cc-detail-text">上次更新：{{haste.LastUpdate}}</small>
  </div>
</template>

<script>
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
  data() {
    return {
        haste: {
            LastUpdate: "",
            Text: "",
            TextHide: false,
        },
        autoUpdate: true,
        lastModify: null,
        timer: null,
        intvl: 4000,
    };
  },
  created() {
    this.timer = setInterval(this.update, this.intvl)
    this.fetch()
  },
  mounted() {
    this.autoUpdate = false
  },
  methods:{
    modify() {
      this.lastModify = new Date()
    },
    fetch() {
     this.axios.get( apiAddr+"/v1x1/clipboard/fetch", {withCredentials: true})
        .then(res => {
          if( err.Check( res.data ) ) {
            var ch = JSON.parse( res.data.Data )
            this.haste = ch;
            return;
          } else {
            this.modify()
            this.haste.LastUpdate = this.lastModify.toString()
            this.push()
            return;
          }
        })
        .catch(err => {
          console.error(err); 
        })
    },
    switchAutoupdate() {
      if ( ! this.autoUpdate ) {
        this.timer = this.timer == null ? setInterval(this.update, this.intvl) : this.timer
        console.log("on")
      } else {
        clearInterval( this.timer )
        this.timer = null
        console.log("off")
      }
    },
    update(){
      this.axios.get( apiAddr+"/v1x1/clipboard/fetch", {withCredentials: true})
        .then(res => {
          if( err.Check( res.data ) ) {
            var ch = JSON.parse( res.data.Data )
            var cDate = this.toDate( ch.LastUpdate )

            // 如果没有上次更改的时间，则直接pull
            if ( this.lastModify == null ) {
              this.haste = ch;
              return;
            }
            if ( cDate == null ) {
              cDate = new Date()
            }
            // 比本地新，拉取
            if( cDate.getTime() > this.lastModify.getTime() ) {
              this.haste = ch;
              return;
            } else {
              // 比本地旧，推送
              this.haste.LastUpdate = this.lastModify.toString()
              this.push()
            }
          }
        })
        .catch(err => {
          console.error(err); 
        })
    },
    toDate( date ) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
          return new Date(Date.parse(date.replace(/-/g, "/")));
      } else {
          return new Date();
      }
    },
    push() {
      this.axios.post( apiAddr+"/v1x1/clipboard/push", this.haste, {withCredentials: true})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err); 
      })
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>