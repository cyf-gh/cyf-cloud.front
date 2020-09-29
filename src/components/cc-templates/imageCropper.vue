<!--
 * @Date: 2020-09-29 16:12:04
 * @LastEditors: cyf
 * @LastEditTime: 2020-09-29 21:35:21
 * @FilePath: \cyf-cloud.front\src\components\cc-templates\imageCropper.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <div>

    <!-- 图片格子 -->
    <!-- 

    <div class="img-box">
      <div
        v-for="(item, key) in imgList"
        :key="key"
        class="img-item">
        <img :src="item" alt="图片">
      </div>
    </div>
    -->
    <b-container class="text-center">
    <b-img v-bind="mainProps" :src="inputImgSrc" blank-color="#F8F8F8" alt="你上传的图片会显示在这里" rounded height="200" width="200"></b-img>
    <br>
    <p>{{uploadInfo}}</p>
    <b-button-group>
        <b-button variant="light" @click="inputImg()" v-show="!isMultiFile">选择图片</b-button>
        <b-button variant="dark" :disabled="inputImgSrc==''"  @click="upload">上传图片</b-button>
    </b-button-group>
    </b-container>


    <!-- 用于唤起图片选择 -->
    <input
      v-show="false"
      ref="input"
      type="file"
      accept="image/*"
      @change="inputImgChange($event)">

    <!-- 上传按钮 -->

    <transition name="slim-fade">
      <b-card id="id-cc-cropshow" v-show="cropShow" class="container text-center mt-3">
        <SlimCropper class="mb-1" ref="cropper" :src="inputImgSrc"></SlimCropper>
        <b-button-group>
          <b-button variant="light" @click="hideCrop">取消</b-button>
          <b-button variant="light" @click="submitCrop">使用</b-button>
        </b-button-group>
      </b-card>
    </transition>
    </div>
</template>

<script>
import SlimCropper from 'vue-slim-cropper'
import ccImg from '../../cc/Image'

export default {
components:{
    SlimCropper
},
data () {
    return {
        inputImgSrcList: [],
        cropShow: false, // 裁剪弹窗显示
        inputImgSrc: '', // input 选中的图片 url
        loading: false,
        mainProps: { blank: true, width: 200, height: 200, class: 'mb-3' },
        uploadInfo: "还没有选择图片",
    }
},
props: {
    uploadApi: String,
    isMultiFile: Boolean,
},
methods: {
    
    async inputImgChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
          this.uploadInfo= "还没有选择图片"
          return
      }
      this.inputImgSrc = await ccImg.toBase64( files[0] )
      // console.log( this.inputImgSrc )
      this.uploadInfo = "图片载入完成"
      this.showCrop()
    },
            // 裁剪页确认
    showCrop () {
      this.cropShow = true
    },
    hideCrop () {
      this.cropShow = false
      this.$refs.input.value = ''
    },
    async submitCrop () {
        this.hideCrop()
        this.inputImgSrc = ccImg.CompressBase64( 
            await ccImg.toBase64( await this.$refs.cropper.getCroppedBlob() ),
            200, 200, function( data ) {})
        this.mainProps.blank = false
        // console.debug( this.inputImgSrc )
    },
    async inputImg () {
      this.uploadInfo = "正在载入"
      this.$refs.input.click()
    },
    upload() {
        if ( this.isMultiFile ) {
            this.$axios.post(this.uploadApi,{
                "b64s": this.inputImgSrcList
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        } else {
            this.$axios.post(this.uploadApi,{
                "b64": this.inputImgSrc
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
},
}
</script>
<style scoped>
.card {
    border: none;
    background-color: #F8F8F8;
}
</style>