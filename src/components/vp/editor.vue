<!--
 * @Date: 2021-01-27 15:29:17
 * @LastEditors: cyf
 * @LastEditTime: 2021-02-04 16:17:27
 * @FilePath: \cyf-cloud.front\src\components\vp\editor.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.

  
-->

<template>
<div>
    <b-alert show variant="warning" v-if="showBanner == true" dismissible>当前新建的项目还未保存，如确定该项目请先点击右下角的<strong>保存</strong>按钮或<a href="#" @click="updateData">这里</a>进行云端保存。</b-alert>
    <b-card>
        <b-tabs content-class="mt-3" align="center">
            <b-tab title="基本信息" active @click="calDays">
                <b-card>
                    <small>项目名称：</small>
                    <b-form-input size="sm" v-model="meta.Title"
                        >保存</b-form-input
                    >
                </b-card>
                <b-row>
                    <b-col md="6">
                        <b-card v-for="i in basicInfos" :key="i.Title">
                            <h1>{{ i.Title }}</h1>
                            <tbody>
                                <tr v-for="c in i.Childs" :key="c.k">
                                    <!-- <b-form inline></b-form> -->
                                    <td>
                                        <small>{{ c.k }}</small>
                                    </td>
                                    <td>
                                        <b-form-textarea
                                            v-model="c.v"
                                            rows="1"
                                            max-rows="6"
                                            size="sm"
                                            @change="printinfo"
                                        ></b-form-textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </b-card>
                    </b-col>
                    <b-col md="6">
                        <b-card v-for="i in basicInfos2" :key="i.Title">
                            <h1>{{ i.Title }}</h1>
                            <tbody v-for="c in i.Childs" :key="c.Title">
                                <h2>{{ c.Title }}</h2>
                                <tr v-for="cc in c.Childs" :key="cc.k">
                                    <td>
                                        <small>{{ cc.k }}</small>
                                    </td>
                                    <td>
                                        <b-form-input
                                            v-if="c.Title == '时长统计'"
                                            disabled
                                            v-model="cc.v"
                                            size="sm"
                                        ></b-form-input>
                                        <b-form-textarea
                                            v-else
                                            v-model="cc.v"
                                            rows="1"
                                            max-rows="6"
                                            size="sm"
                                        ></b-form-textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </b-card>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab title="参考打分值">
                <b-row>
                    <b-col md="6">
                        <b-card id="table-marking" v-if="progress != undefined">
                            <tbody v-for="(p, pi) in progress" :key="p.Name">
                                <tr v-for="(c, i) in p.Childs" :key="c.Name">
                                    <td
                                        :rowspan="p.Childs.length"
                                        v-if="i == 0"
                                    >
                                        {{ p.Name }}
                                    </td>
                                    <td>{{ c.Name }}</td>
                                    <td>{{ c.Percent }}%</td>
                                    <td>
                                        <b-form inline>
                                            <b-form-input
                                                @change="
                                                    changeDate(p, c, i, pi)
                                                "
                                                size="sm"
                                                v-model="c.Date"
                                                type="text"
                                                :state="
                                                    vaildDate(c) &&
                                                        validDateNextPrev(c, pi)
                                                "
                                            />
                                            <b-form-invalid-feedback
                                                :state="vaildDate(c)"
                                            >
                                                日期不合法，请输入 yyyy/mm/dd
                                                的格式
                                            </b-form-invalid-feedback>
                                            <b-form-invalid-feedback
                                                :state="
                                                    validDateNextPrev(c, pi)
                                                "
                                            >
                                                主流程的日期不可大于下一个流程的日期或小于上一个流程的日期
                                            </b-form-invalid-feedback>
                                            <b-button
                                                size="sm"
                                                variant="light"
                                                @click="delProgress(p, i, pi)"
                                                >X</b-button
                                            >
                                            <b-button
                                                size="sm"
                                                v-if="
                                                    p.Childs.length == 1 &&
                                                        pi != 0
                                                "
                                                variant="warning"
                                                @click="upProgress(p, pi)"
                                                >↑</b-button
                                            >
                                            <b-button
                                                size="sm"
                                                v-if="
                                                    p.Childs.length == 1 &&
                                                        pi !=
                                                            progress.length - 1
                                                "
                                                variant="warning"
                                                @click="downProgress(p, pi)"
                                                >↓</b-button
                                            >
                                            <div
                                                v-if="i != p.Childs.length - 1"
                                            >
                                                <b-button
                                                    v-if="
                                                        p.Childs[i + 1].Date ==
                                                            c.Date
                                                    "
                                                    @click="swapSame(p, i)"
                                                    >调换</b-button
                                                >
                                            </div>
                                            <small v-if="p.Childs.length == 1"
                                                >只有大流程中有一个步骤时可以移动大流程</small
                                            >
                                        </b-form>
                                    </td>
                                    <td
                                        :rowspan="p.Childs.length"
                                        v-if="i == 0"
                                    >
                                        耗时：{{ sumDay(p) }}天
                                    </td>
                                </tr>
                            </tbody>
                            <hr />
                            <b-form inline>
                                <b-form-select
                                    size="sm"
                                    v-model="pg.selectMainName"
                                    @change="selectchanged"
                                    :options="pg.mainops"
                                ></b-form-select>
                                <b-form-select
                                    size="sm"
                                    v-if="pg.selectMainName != null"
                                    v-model="pg.selectChildName"
                                    :options="pg.childops"
                                ></b-form-select>
                                <b-button
                                    variant="info"
                                    size="sm"
                                    @click="addProgress"
                                    >添加流程</b-button
                                >
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col md="6">
                        <b-card
                            id="table-marking"
                            style=".transformed {transform: scale(0.5);}"
                        >
                            <table>
                                <thead>
                                    <tr>
                                        <th colspan="3">参考流程打分值</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th colspan="2">步骤</th>
                                        <th>进度</th>
                                    </tr>
                                </tbody>
                                <tbody v-for="p in example_marking" :key="p.Name">
                                    <tr v-for="(c, i) in p.Childs" :key="c.Name">
                                        <td
                                            :rowspan="p.Childs.length"
                                            v-if="i == 0"
                                        >
                                            {{ p.Name }}
                                        </td>
                                        <td>{{ c.Name }}</td>
                                        <td>
                                            <b-form inline>
                                                <b-input
                                                    @change="
                                                        changeMarkingPercent(
                                                            p,
                                                            c
                                                        )
                                                    "
                                                    style="width:5rem;"
                                                    size="sm"
                                                    v-model="c.Percent"
                                                    type="number"
                                                />%
                                            </b-form>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <b-form class-content="mx-2" inline>
                                <small>主步骤名：</small>
                                <b-input
                                    style="width:5rem;"
                                    size="sm"
                                    v-model="new_marking.Name"
                                ></b-input>
                                <small>步骤名：</small>
                                <b-input
                                    style="width:5rem;"
                                    size="sm"
                                    v-model="new_marking.ChildName"
                                ></b-input>
                                <small>完成百分比：</small>
                                <b-input
                                    style="width:5rem;"
                                    size="sm"
                                    v-model="new_marking.Percent"
                                    type="number"
                                ></b-input>
                                %
                                <b-button
                                    variant="info"
                                    size="sm"
                                    @click="addMarking"
                                    >添加一笔流程</b-button
                                >
                            </b-form>
                            <hr />
                            <b-form class-content="mx-2" inline>
                                <small>主步骤名：</small>
                                <b-input
                                    style="width:5rem;"
                                    size="sm"
                                    v-model="delete_marking.Name"
                                ></b-input>
                                <small>步骤名：</small>
                                <b-input
                                    style="width:5rem;"
                                    size="sm"
                                    v-model="delete_marking.ChildName"
                                ></b-input>
                                <b-button
                                    variant="info"
                                    size="sm"
                                    @click="delMarking"
                                    >删除该流程</b-button
                                >
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab
                title="表格"
                @click="drawChart(chartProps.w, chartProps.h)"
            >
                <div class="x">
                    <canvas id="chart"></canvas>
                </div>
                <b-form inline>
                    <small>横坐标分割数量</small>
                    <b-input
                        size="sm"
                        type="number"
                        v-model="chartProps.XDelta"
                    ></b-input>
                    <small>表格宽</small>
                    <b-input
                        size="sm"
                        type="number"
                        v-model="chartProps.w"
                    ></b-input>
                    <small>表格长</small>
                    <b-input
                        size="sm"
                        type="number"
                        v-model="chartProps.h"
                    ></b-input>
                    <small>文字旋转角度</small>
                    <b-input
                        size="sm"
                        type="number"
                        v-model="chartProps.TagAng"
                    ></b-input>
                    <b-button
                        variant="info"
                        size="sm"
                        @click="drawChart(chartProps.w, chartProps.h)"
                        >重新绘制</b-button
                    >
                </b-form>
                <h5>项目总耗时{{ chartProps.totalDays }}天</h5>
                <!-- <line-chart :chart-data="datacollection" :options="options"></line-chart> -->
            </b-tab>
        </b-tabs>
        <b-navbar fixed="bottom">
            <b-nav class="mr-0"> 
                <b-button size="sm" variant="light" @click="back2Home">返回项目列表</b-button>
            </b-nav>
            <b-nav class="mx-auto"> 
            </b-nav>
            <b-nav class="ml-0">
                <b-button class="mr-2" v-if="showBanner == false" size="sm" variant="primary" @click="exportExcelProject">生成Excel表格</b-button>
                <b-button size="sm" variant="info" @click="updateData">保存</b-button>
            </b-nav>
        </b-navbar>
    </b-card>
    </div>
</template>

<script>
import bvu from "../../cc/bvUtil";
import cu from "./canvasUtil/Canvas";
// import LineChart from "./LineChart";
import idy from "../../cc/v1x1/Identity";
import apiAddr from "../../server";
import err from "../../cc/v1x1/HttpErrReturn";

export default {
    components: {
        // LineChart,
    },
    created() {
        // this.fillData();
        cu.Init();
        window.onbeforeunload = function (e) {
            e = e || window.event
            if (e) {
                e.returnValue = '关闭提示'
            }
            return '关闭提示'
        }
    },
    mounted() {
        idy.InitCookie(this.$cookie);
        bvu.InitToast(this.$bvToast);

        this.accountInfo = JSON.parse(localStorage.getItem("cc_account_info"));
        this.meta.OwnerId = this.accountInfo.Id;
        console.log(this.accountInfo);
        if (!idy.IsLogin()) {
            this.$router.push({ path: "/account/login?from=require_login" });
        }
        switch (this.$route.query.mode) {
            case "new":
                // id = 0
                this.meta.Id = 0;
                this.meta.Title = this.$route.query.title;
                this.showBanner = true
                break;
            case "modify":
                // get by id
                var id = this.$route.query.id;
                if (id == undefined) {
                    bvu.Msg("错误", "参数中未指定id，无法获取数据", "danger");
                    return;
                } else {
                    this.axios
                        .get(apiAddr + "/v1x1/vp/project?id=" + id, {
                            withCredentials: true,
                        })
                        .then((res) => {
                            if (err.Check(res.data)) {
                                var data = JSON.parse(res.data.Data);
                                var dd = JSON.parse(data.Data);
                                this.meta.Title = data.Title;
                                this.meta.OwnerId = data.OwnerId;
                                this.meta.Id = data.Id;
                                this.chartProps = dd.chartProps;
                                this.example_marking = dd.marking;
                                this.basicInfos = dd.basicInfo;
                                this.basicInfos2 = dd.basicInfo2;
                                this.progress = dd.progress;
                                bvu.Msg(
                                    "载入项目数据",
                                    "成功获取《" + this.meta.Title + "》的数据",
                                    "success"
                                );
                            } else {
                                console.error(
                                    "in vp get project data",
                                    res.data.Desc
                                );
                                bvu.Msg("错误", res.data.Desc, "danger");
                            }
                            console.log(res);
                        })
                        .catch((err) => {
                            bvu.Msg("错误", err, "danger");
                            console.error(err);
                        });
                }
                break;
        }
        this.drawChart(this.chartProps.w, this.chartProps.h);
        this.refreshSelect();
    },
    data() {
        return {
            showBanner: false,
            accountInfo: null,
            meta: {
                OwnerId: 0,
                Id: 0,
                Title: "",
            },
            pg: {
                selectMainName: null,
                selectChildName: null,
                mainops: [],
                childops: [],
            },
            example_marking: [
                {
                    Name: "营销",
                    Childs: [
                        { Name: "拜访", Percent: "6" },
                        { Name: "确定方案", Percent: "10" },
                        { Name: "收集资料", Percent: "15" },
                    ],
                },
                {
                    Name: "评级",
                    Childs: [
                        { Name: "撰写评级", Percent: "20" },
                        { Name: "交支行", Percent: "25" },
                        { Name: "退回", Percent: "21" },
                        { Name: "交分行", Percent: "30" },
                        { Name: "评级完成", Percent: "35" },
                    ],
                },
                {
                    Name: "授信",
                    Childs: [
                        { Name: "撰写授信", Percent: "40" },
                        { Name: "交支行", Percent: "45" },
                        { Name: "退回", Percent: "40" },
                        { Name: "交分行", Percent: "50" },
                        { Name: "上会", Percent: "55" },
                        { Name: "授信批复", Percent: "60" },
                    ],
                },
                {
                    Name: "提款",
                    Childs: [
                        { Name: "撰写提款", Percent: "61" },
                        { Name: "交支行", Percent: "70" },
                        { Name: "退回", Percent: "62" },
                        { Name: "提款批复", Percent: "78" },
                    ],
                },
                {
                    Name: "放款",
                    Childs: [
                        { Name: "提交", Percent: "80" },
                        { Name: "退回", Percent: "81" },
                        { Name: "放行", Percent: "100" },
                    ],
                },
            ],
            new_marking: {
                Name: "",
                ChildName: "",
                Percent: "",
            },
            delete_marking: {
                Name: "",
                ChildName: "",
            },
            chartProps: {
                XDelta: 20,
                nodes: [],
                totalDays: 0,
                h: 600,
                w: 1400,
                TagAng: -Math.PI / 3,
            },
            progress: [
                {
                    Name: "营销",
                    Childs: [
                        { Name: "拜访", Percent: "6", Date: "2020/5/25" },
                        { Name: "确定方案", Percent: "10", Date: "2020/5/26" },
                        { Name: "收集资料", Percent: "15", Date: "2020/6/25" },
                    ],
                },
                {
                    Name: "评级",
                    Childs: [
                        { Name: "撰写评级", Percent: "20", Date: "2020/7/25" },
                        { Name: "交支行", Percent: "25", Date: "2020/7/26" },
                        { Name: "退回", Percent: "21", Date: "2020/7/28" },
                        { Name: "交分行", Percent: "30", Date: "2020/10/25" },
                        { Name: "评级完成", Percent: "35", Date: "2020/11/25" },
                    ],
                },
                {
                    Name: "授信",
                    Childs: [
                        { Name: "撰写授信", Percent: "40", Date: "2021/1/5" },
                        { Name: "交支行", Percent: "45", Date: "2021/1/15" },
                        { Name: "退回", Percent: "40", Date: "2021/1/25" },
                        { Name: "交分行", Percent: "50", Date: "2021/1/26" },
                        { Name: "上会", Percent: "55", Date: "2021/1/27" },
                        { Name: "授信批复", Percent: "60", Date: "2021/1/28" },
                    ],
                },
                {
                    Name: "提款",
                    Childs: [
                        { Name: "撰写提款", Percent: "61", Date: "2021/2/28" },
                        { Name: "交支行", Percent: "70", Date: "2021/3/28" },
                        { Name: "退回", Percent: "62", Date: "2021/4/28" },
                        { Name: "提款批复", Percent: "78", Date: "2021/5/28" },
                    ],
                },
                {
                    Name: "放款",
                    Childs: [
                        { Name: "提交", Percent: "80", Date: "2021/6/28" },
                        { Name: "退回", Percent: "81", Date: "2021/7/28" },
                        { Name: "放行", Percent: "100", Date: "2021/8/28" },
                    ],
                },
            ],
            basicInfos: [
                {
                    Title: "客户营销/需求",
                    Childs: [
                        { k: "客户名", v: "" },
                        { k: "种类", v: "" },
                        { k: "金额(万元)", v: "" },
                        { k: "特殊套用", v: "" },
                        { k: "价格", v: "" },
                        { k: "时间节点", v: "" },
                        { k: "项目提要", v: "" },
                        { k: "他行竞争/续作情况", v: "" },
                        { k: "可能风险点", v: "" },
                        { k: "材料清单", v: "" },
                    ],
                },
                {
                    Title: "风险审批",
                    Childs: [
                        { k: "评级撰写质量", v: "" },
                        { k: "调查报告质量", v: "" },
                        { k: "需与分行确认的问题", v: "" },
                        { k: "营销部门未发现的瑕疵", v: "" },
                        { k: "其他风险-非实质性", v: "" },
                        { k: "其他风险-实质性", v: "" },
                        { k: "补充材料要求", v: "" },
                    ],
                },
            ],
            basicInfos2: [
                {
                    Title: "部门尽调",
                    Childs: [
                        {
                            Title: "尽调发现风险",
                            Childs: [
                                { k: "非实质性", v: "无" },
                                { k: "实质性", v: "无" },
                            ],
                        },
                        {
                            Title: "需协调问题",
                            Childs: [
                                { k: "柜面&账务", v: "无" },
                                { k: "授信政策", v: "无" },
                                { k: "其他", v: "无" },
                            ],
                        },
                        {
                            Title: "风险审批发现问题是否已解决",
                            Childs: [
                                { k: "非实质性", v: "无" },
                                { k: "实质性", v: "无" },
                            ],
                        },
                    ],
                },
                {
                    Title: "流程干预",
                    Childs: [
                        {
                            Title: "行长室意见",
                            Childs: [
                                { k: "非实质性风险", v: "" },
                                { k: "实质性风险", v: "" },
                                { k: "其他", v: "" },
                            ],
                        },
                        {
                            Title: "时长统计",
                            Childs: [
                                { k: "营销评级", v: "" },
                                { k: "营销授信", v: "" },
                                { k: "风险评级", v: "" },
                                { k: "风险授信", v: "" },
                                { k: "总流程时长", v: "" },
                            ],
                        },
                        { Title: "流程干涉", Childs: [{ k: "", v: "无" }] },
                    ],
                },
            ],
        };
    },
    methods: {
        exportExcelProject() {
            const canvas = document.getElementById("chart");

            this.axios
                .post(
                    apiAddr + "/v1x1/vp/export",
                    {
                        Id: this.meta.Id,
                        Title: this.meta.Title,
                        Base64: canvas.toDataURL('image/png')
                    },
                    { withCredentials: true,
                      responseType: 'blob'
                     }).then((response) => {
                        const url = URL.createObjectURL(new Blob([response.data], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        }))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', this.meta.Title+".xlsx")
                        document.body.appendChild(link)
                        link.click()
                    });
        },
        back2Home() {
            this.$router.push({
                path: "/vp/home",
            });
        },
        printinfo() {
        },
        updateData() {
            this.basicInfos2[1].Childs[1].Childs.forEach( el => {
                console.log(el)
                el.v = el.v.toString()
            } )
            this.axios
                .post(
                    apiAddr + "/v1x1/vp/update",
                    {
                        Id: this.meta.Id,
                        OwnerId: this.meta.OwnerId,
                        Title: this.meta.Title,
                        Data: JSON.stringify({
                            chartProps: this.chartProps,
                            marking: this.example_marking,
                            basicInfo: this.basicInfos,
                            basicInfo2: this.basicInfos2,
                            progress: this.progress
                        }),
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    if (err.Check(res.data)) {
                        var retId = JSON.parse(res.data.Data);
                        if (retId != 0) {
                            bvu.Msg( "成功","已成功第一次保存数据，正在跳转页面","success")
                            this.$router.push({
                                path: "/vp/editor?mode=modify&id=" + retId,
                            });
                            window.onbeforeunload = null
                            location.reload()
                            this.$router.go(0)
                            return;
                        }
                        bvu.Msg( "成功","已成功保存数据","success")
                    } else {
                        console.error("in vp update", res.data.Desc);
                        bvu.Msg("错误", res.data.Desc, "danger");
                    }
                    console.log(res);
                })
                .catch((err) => {
                    bvu.Msg("错误", err, "danger");
                    console.error(err);
                });
        },
        calDays() {
            this.setValueInfo2("营销评级", this.getSumdayOf("评级"));
            this.setValueInfo2("营销授信", this.getSumdayOf("授信"));
            this.setValueInfo2("风险评级", this.getSumdayOf("提款"));
            this.setValueInfo2("风险授信", this.getSumdayOf("放款"));
            this.getTotalDays();
        },
        getSumdayOf(p_name) {
            for (var i = 0; i < this.progress.length; ++i) {
                if (p_name == this.progress[i].Name) {
                    return this.sumDay(this.progress[i]);
                }
            }
            return "/";
        },
        lastProgress() {
            return this.progress[this.progress.length - 1];
        },
        getTotalDays() {
            var start = new Date(this.progress[0].Childs[0].Date);
            var end = new Date(
                this.lastProgress().Childs[
                    this.lastProgress().Childs.length - 1
                ].Date
            );
            this.setValueInfo2(
                "总流程时长",
                Math.ceil((end - start) / (1000 * 60 * 60 * 24))
            );
        },
        setValueInfo2(k, v) {
            this.basicInfos2.forEach((el) => {
                if (el.Title == "流程干预") {
                    el.Childs.forEach((eell) => {
                        if (eell.Title == "时长统计") {
                            eell.Childs.forEach((eeelll) => {
                                if (eeelll.k == k) {
                                    eeelll.v = v;
                                    return;
                                }
                            });
                            return;
                        }
                    });
                    return;
                }
            });
        },
        getValueInfo(t, k) {
            var res = "";
            this.basicInfos.forEach((el) => {
                if (el.Title == t) {
                    el.Childs.forEach((eell) => {
                        if (eell.k == k) {
                            res = eell.v;
                            return;
                        }
                    });
                    return;
                }
            });
            return res;
        },
        sumDay(p) {
            try {
                var start = Date.parse(p.Childs[0].Date);
                var end = Date.parse(p.Childs[p.Childs.length - 1].Date);
                if (p.Childs.length == 1) {
                    return 1;
                }
                return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            } catch {
                return 0;
            }
        },
        swapSame(p, i) {
            this.array_move(p.Childs, i, i + 1);
        },
        refreshSelect() {
            this.pg.mainops = [];
            for (var i = 0; i < this.example_marking.length; ++i) {
                this.pg.mainops.push(this.example_marking[i].Name);
            }
        },
        /**
         * https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
         */
        array_move(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing
        },
        delProgress(p, i, pi) {
            var res = confirm("确认删除该流程？");
            if (!res) {
                return;
            }
            if (p.Childs.length == 1) {
                this.progress.splice(pi, 1);
                return;
            }
            p.Childs.splice(i, 1);
        },
        upProgress(p, pi) {
            this.array_move(this.progress, pi, pi - 1);
        },
        downProgress(p, pi) {
            this.array_move(this.progress, pi, pi + 1);
        },
        changeDate(p, c, i, pi) {
            console.log(p, c, i, pi);
            try {
                var newDate = Date.parse(c.Date);
                if (isNaN(newDate)) {
                    throw "非法的日期 =>" + c.Date + "<= 请检查";
                }
                if (pi == 0) {
                    var nextFirst = Date.parse(
                        this.progress[pi + 1].Childs[0].Date
                    ); // 必须小于等于这个
                    if (newDate > nextFirst) {
                        throw "主流程的日期不可大于下一个流程的日期";
                    }
                    return;
                }
                if (pi == this.progress.length - 1) {
                    var prevLast = Date.parse(
                        this.progress[pi - 1].Childs[
                            this.progress[pi - 1].Childs.length - 1
                        ].Date
                    ); // 必须大于等于
                    if (newDate < prevLast) {
                        throw "主流程的日期不可小于上一个流程的日期";
                    }
                    return;
                }
                nextFirst = Date.parse(this.progress[pi + 1].Childs[0].Date); // 必须小于等于这个
                prevLast = Date.parse(
                    this.progress[pi - 1].Childs[
                        this.progress[pi - 1].Childs.length - 1
                    ].Date
                ); // 必须大于等于
                if (newDate > nextFirst || newDate < prevLast) {
                    console.log(newDate, nextFirst, prevLast);
                    throw "主流程的日期不可大于下一个流程的日期或小于上一个流程的日期";
                }
                this.rerangeProgressByDate(p, c, i);
            } catch (ex) {
                bvu.Msg("修改日期时发生错误", ex, "danger");
                console.error(ex);
            }
        },
        addProgress() {
            for (var i = 0; i < this.progress.length; ++i) {
                if (this.progress[i].Name == this.pg.selectMainName) {
                    this.progress[i].Childs.push({
                        Name: this.pg.selectChildName,
                        Percent: this.getPercent(
                            this.pg.selectMainName,
                            this.pg.selectChildName
                        ),
                        Date: "",
                    });
                    return;
                }
            }
            this.progress.push({
                Name: this.pg.selectMainName,
                Childs: [
                    {
                        Name: this.pg.selectChildName,
                        Percent: this.getPercent(
                            this.pg.selectMainName,
                            this.pg.selectChildName
                        ),
                        Date: "",
                    },
                ],
            });
        },
        // 可以修改为冒泡
        rerangeProgressByDate(p, c, ii) {
            console.log(p);
            var curDate = new Date(c.Date);
            var lastI = p.Childs.length - 1;
            for (var i = 0; i < p.Childs.length - 1; ++i) {
                if (p.Childs[i + 1].Date == "") {
                    // 日期为空白的元素总在最后
                    // 最后一个元素的index为第一个空白元素的index-1
                    lastI = i;
                    break;
                }
                var prevDate = new Date(p.Childs[i].Date);
                var nextDate = new Date(p.Childs[i + 1].Date);
                // insert i+1
                if (curDate > prevDate && curDate <= nextDate) {
                    if (i + 1 == ii) {
                        continue;
                    }
                    this.array_move(p.Childs, ii, i > ii ? i : i + 1);
                    console.log("move to between", i, i + 1);
                    return;
                }
            }
            if (curDate < new Date(p.Childs[0].Date)) {
                this.array_move(p.Childs, ii, 0);
                console.log("move to first");
            } else if (curDate > new Date(p.Childs[lastI].Date)) {
                this.array_move(p.Childs, ii, lastI);
                console.log("move to last");
            }
            return;
        },
        getPercent(mn, cn) {
            var percent = "0";
            this.example_marking.forEach((el) => {
                if (el.Name == mn) {
                    el.Childs.forEach((elel) => {
                        if (elel.Name == cn) {
                            percent = elel.Percent;
                            return;
                        }
                    });
                }
            });
            return percent;
        },
        selectchanged() {
            for (var i = 0; i < this.example_marking.length; ++i) {
                if (this.example_marking[i].Name == this.pg.selectMainName) {
                    this.pg.childops = [];
                    for (
                        var j = 0;
                        j < this.example_marking[i].Childs.length;
                        ++j
                    ) {
                        this.pg.childops.push(
                            this.example_marking[i].Childs[j].Name
                        );
                    }
                    return;
                }
            }
        },
        drawChart(w, h) {
            const canvas = document.getElementById("chart");
            // canvas.clear(0, 0, canvas.width, canvas.height);
            canvas.height = h;
            canvas.width = w;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0,0,w,h);
            ctx.fillStyle = "#000000";
            var left = 0;
            var right = left + w;
            var top = 0;
            var bottom = top + h;

            ctx.font = "1.2rem arial";
            ctx.fillTextCenterX("业务流程时点", w / 2, 20);
            ctx.font = "0.8rem arial";
            ctx.fillTextCenterX(
                this.getValueInfo("客户营销/需求", "客户名") +
                    " - " +
                    this.getValueInfo("客户营销/需求", "种类"),
                w / 2,
                40
            );
            var zero = {
                x: left + ctx.r(70),
                y: bottom - ctx.r(100),
            };
            var ctop = top + ctx.r(50);
            var cright = right - ctx.r(80);
            var cxcenter = (cright - zero.x) / 2;
            var cycenter = (zero.y - ctop) / 2;
            ctx.drawLine(zero.x, ctop, zero.x, zero.y);
            ctx.drawLine(zero.x, zero.y, cright, zero.y);
            // 绘制横纵轴标注
            ctx.fillTextCenterX(
                "时间（年/月/日）",
                cxcenter,
                zero.y + ctx.r(70)
            );
            ctx.fillTextVerticalRaw("进度（%）", zero.x - ctx.r(50), cycenter);
            // 绘制纵向刻度
            var delta = (zero.y - ctop) / 10;
            for (var i = 1; i < 11; i++) {
                var c = (255 - i * 25).toString();
                ctx.strokeStyle = "rgb(" + c + "," + c + "," + c + ")";
                var ymetery = zero.y - i * delta;
                ctx.drawLine(zero.x, ymetery, cright, ymetery, 0.8);
                ctx.fillTextCenter(
                    (i * 10).toString() + "%",
                    zero.x - 20,
                    ymetery
                );
            }
            // 绘制横向刻度
            var minDate = Date.parse(this.progress[0].Childs[0].Date);
            var maxDate = Date.parse(this.progress[0].Childs[0].Date);
            for (i = 0; i < this.progress.length; ++i) {
                for (var j = 0; j < this.progress[i].Childs.length; ++j) {
                    var curDate = Date.parse(this.progress[i].Childs[j].Date);
                    console.log(curDate);
                    minDate = curDate < minDate ? curDate : minDate;
                    maxDate = curDate > maxDate ? curDate : maxDate;
                }
            }
            const diffDays = Math.ceil(
                (maxDate - minDate) / (1000 * 60 * 60 * 24)
            );
            this.chartProps.totalDays = diffDays;
            console.log(diffDays);

            var deltaUnix = (maxDate - minDate) / this.chartProps.XDelta;
            var curUnix = minDate;
            var deltaWidth = (cright - zero.x) / this.chartProps.XDelta;
            console.log(this.chartProps.XDelta, deltaWidth, cright);
            for (i = 0; i < Number(this.chartProps.XDelta) + 1; i++) {
                var curDate2 = new Date(curUnix);
                var xmerterx = zero.x + deltaWidth * i;
                ctx.strokeStyle = "rgb(80,80,80)";
                ctx.fillTextVerticalRaw(
                    curDate2.getFullYear().toString() +
                        "/" +
                        (curDate2.getMonth() + 1).toString() +
                        "/" +
                        curDate2.getDate().toString(),
                    xmerterx,
                    zero.y + ctx.r(50),
                    -Math.PI / 4
                );
                ctx.drawLine(xmerterx, zero.y, xmerterx, ctop, 0.5);
                curUnix += deltaUnix;
            }
            console.log(i);
            var color_list = [
                "#D2691E",
                "#7FFFD4",
                "#DEB887",
                "#5F9EA0",
                "#7FFF00",
                "#00FFFF",
                "#D2651E",
                "#7F3FD4",
                "#DE5887",
                "#5F92A0",
            ];
            // 绘制曲线
            var updown = false; // false 向下
            var prevX = zero.x,
                prevY = zero.y;
            ctx.fillRect(zero.x - 4, zero.y - 4, 8, 8);
            ctx.fillTextCenterX(
                this.progress[0].Childs[0].Name,
                zero.x - 20,
                zero.y + 20
            );
            this.chartProps.nodes = [];

            for (i = 0; i < this.progress.length; ++i) {
                ctx.strokeStyle = color_list[i];
                ctx.fillStyle = color_list[i];
                ctx.fillRect(
                    zero.x +
                        20 +
                        i * 50 +
                        ctx.getTextWidth(this.progress[i].Name),
                    40,
                    8,
                    8
                );
                ctx.fillTextCenterX(
                    this.progress[i].Name,
                    zero.x + 20 + i * 50,
                    40
                );
                for (j = 1; j < this.progress[i].Childs.length; ++j) {
                    ctx.strokeStyle = color_list[i];
                    var curChild = this.progress[i].Childs[j];
                    // 获取坐标并记录
                    var curX =
                        ((Date.parse(curChild.Date) - minDate) /
                            (maxDate - minDate)) *
                            (cright - zero.x) +
                        zero.x;
                    var curY =
                        zero.y - (curChild.Percent / 100) * (zero.y - ctop);
                    this.chartProps.nodes.push({
                        name: curChild.Name,
                        x: curX,
                        y: curY,
                    });
                    // 绘制折线
                    ctx.drawLine(curX, curY, prevX, prevY, 3);
                    ctx.strokeStyle = color_list[5];
                    // 画点
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(curX - 4, curY - 4, 8, 8);
                    prevX = curX;
                    prevY = curY;
                }
            }
            // 写上流程名
            for (i = 0; i < this.chartProps.nodes.length; ++i) {
                ctx.strokeStyle = "#808080";
                curX = this.chartProps.nodes[i].x;
                curY = this.chartProps.nodes[i].y;
                var curName = this.chartProps.nodes[i].name;
                if (curName == "退回") {
                    updown = false;
                }
                var tw = ctx.getTextWidth(curChild.Name);
                tw =
                    i == 0 || i == this.chartProps.nodes.length - 1
                        ? tw - 18
                        : tw;
                var textY = updown ? curY - tw : curY + tw + 10;
                var textX = updown ? curX - tw : curX + tw + 10;
                ctx.fillTextVerticalRaw(
                    curName,
                    textX,
                    textY,
                    this.chartProps.TagAng
                );
                ctx.drawLine(curX, curY, textX, textY, 1);
                updown = !updown;
            }
        },
        vaildDate(c) {
            var newDate = Date.parse(c.Date);
            return !isNaN(newDate);
        },
        validDateNextPrev(c, pi) {
            var newDate = Date.parse(c.Date);
            if (pi == 0) {
                var nextFirst = Date.parse(
                    this.progress[pi + 1].Childs[0].Date
                ); // 必须小于等于这个
                return !(newDate > nextFirst);
            }
            if (pi == this.progress.length - 1) {
                var prevLast = Date.parse(
                    this.progress[pi - 1].Childs[
                        this.progress[pi - 1].Childs.length - 1
                    ].Date
                ); // 必须大于等于
                return !(newDate < prevLast);
            }
            nextFirst = Date.parse(this.progress[pi + 1].Childs[0].Date); // 必须小于等于这个
            prevLast = Date.parse(
                this.progress[pi - 1].Childs[
                    this.progress[pi - 1].Childs.length - 1
                ].Date
            ); // 必须大于等于
            return !(newDate > nextFirst || newDate < prevLast);
        },
        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
        },
        changeMarkingPercent(p, c) {
            var totalModify = 0;
            for (var i = 0; i < this.progress.length; ++i) {
                if (this.progress[i].Name == p.Name) {
                    for (var j = 0; j < this.progress[i].Childs.length; ++j) {
                        var e = this.progress[i].Childs[j];
                        if (e.Name == c.Name) {
                            ++totalModify;
                            e.Percent = c.Percent;
                        }
                    }
                    bvu.Msg(
                        "修改成功",
                        "已有" + totalModify.toString() + "项流程的进度被更新",
                        "success"
                    );
                    return;
                }
            }
        },
        addMarking() {
            if (
                this.new_marking.Name == "" ||
                this.new_marking.ChildName == ""
            ) {
                bvu.Msg("添加失败", "流程名不可为空", "danger");
                return;
            }

            for (var i = 0; i < this.example_marking.length; ++i) {
                if (this.new_marking.Name == this.example_marking[i].Name) {
                    for (
                        var j = 0;
                        j < this.example_marking[i].Childs.length;
                        ++j
                    ) {
                        if (
                            this.new_marking.ChildName ==
                            this.example_marking[i].Childs[j].Name
                        ) {
                            bvu.Msg("添加失败", "已存在该流程", "danger");
                            return;
                        }
                    }
                    console.log(this.new_marking);
                    // 代码执行到这里说明不存在相同的元素，可以添加
                    this.example_marking[i].Childs.push({
                        Name: this.new_marking.ChildName,
                        Percent: this.new_marking.Percent,
                    });
                    return;
                }
            }
            this.example_marking.push({
                Name: this.new_marking.Name,
                Childs: [
                    {
                        Name: this.new_marking.ChildName,
                        Percent: this.new_marking.Percent,
                    },
                ],
            });
            this.refreshSelect();
        },
        delMarking() {
            for (var i = 0; i < this.example_marking.length; ++i) {
                if (this.delete_marking.Name == this.example_marking[i].Name) {
                    for (
                        var j = 0;
                        j < this.example_marking[i].Childs.length;
                        ++j
                    ) {
                        if (
                            this.delete_marking.ChildName ==
                            this.example_marking[i].Childs[j].Name
                        ) {
                            this.example_marking[i].Childs.splice(j, 1);
                            bvu.Msg(
                                "删除成功",
                                this.delete_marking.Name +
                                    " =>" +
                                    this.delete_marking.ChildName,
                                "success"
                            );
                            this.refreshSelect();
                            return;
                        }
                    }
                    break;
                }
            }
            bvu.Msg("删除失败", "无符合流程", "danger");
        },
    },
};
</script>

<style>
.x {
    overflow-x: auto;
}
/* Table Head */
#table-marking table {
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
}

#table-marking thead th {
    background-color: rgb(81, 130, 187);
    color: #fff;
    border-bottom-width: 0;
}

/* Column Style */
#table-marking td {
    border-color: rgba(81, 130, 187, 100);
    border-style: solid;
    border-width: 1px;
    color: #000;
}
/* Heading and Column Style */
#table-marking tr,
#table-marking th {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(81, 130, 187);
}

/* Padding and font style */
#table-marking td,
#table-marking th {
    padding: 5px 10px;
    font-size: 12px;
    font-family: Verdana;
    font-weight: bold;
}

.text-input {
    length: 100%
}
</style>
