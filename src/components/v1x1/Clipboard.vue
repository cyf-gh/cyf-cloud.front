<!--
 * @Date: 2020-10-02 14:45:22
 * @LastEditors: cyf
 * @LastEditTime: 2020-10-06 16:11:49
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
      ></b-form-textarea>
    </b-overlay>
    <b-row class="mt-3">
        <b-col>
        <b-form-checkbox swith v-model="haste.TextHide" class="m-2">隐藏内容</b-form-checkbox>
        </b-col>
        <b-col>
        <b-button block variant="light">更新</b-button>
        </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        haste: {
            LastUpdate: "",
            Text: "",
            TextHide: false,
        }
    };
  },
};
</script>