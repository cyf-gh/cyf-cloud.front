<!--
 * @Date: 2021-08-05 18:47:26
 * @LastEditors: cyf
 * @LastEditTime: 2021-08-05 20:03:23
 * @FilePath: \cyf-cloud.front\src\components\practice\home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.
-->
<template>
    <b-card-group>
        <b-card>
            <b-textarea class="mb-3" disabled v-model="text"></b-textarea>
            <b-form-radio-group
                v-model="value"
                :options="options"
                :state="state"
                name="radio-validation"
            ></b-form-radio-group>
        </b-card>
        <b-card id="cc-practice-list">
            <b-form-select
                v-model="sheetSelect"
                :options="sheetOptions"
                size="sm"
                class="mt-3"
            ></b-form-select>
        </b-card>
    </b-card-group>
</template>

<script>
import idy from "../../cc/v1x1/Identity";
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";
import bvu from "../../cc/bvUtil";

export default {
    data() {
        return {
            value: null,
            text: "1231231231123123",
            options: [
                { text: "选项A", value: "A" },
                { text: "选项B", value: "B" },
                { text: "选项C", value: "C" },
            ],
        };
    },
    mounted() {
        idy.InitCookie(this.$cookie);
        if (!idy.IsLogin()) {
            this.$router.push({ path: "/account/login?from=require_login" });
            return;
        }
        // TODO
    },
};
</script>
