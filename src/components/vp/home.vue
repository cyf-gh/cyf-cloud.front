<!--
 * @Date: 2021-01-27 15:29:17
 * @LastEditors: cyf
 * @LastEditTime: 2021-01-30 00:00:53
 * @FilePath: \cyf-cloud.front\src\components\vp\home.vue
 * @Description: What is mind? No matter. What is matter? Nevermind.

  
-->

<template>
    <b-card>
        <b-tabs content-class="mt-3" align="center">
            <b-tab title="参考打分值">
                <b-row>
                    <b-col md="8">
                        <b-card id="table-marking">
                            <tbody v-for="p in progress">
                                    <tr v-for="(c, i) in p.Childs">
                                        <td :rowspan="p.Childs.length" v-if="i == 0">
                                            {{ p.Name }}
                                        </td>
                                        <td>{{ c.Name }}</td>
                                        <td>
                                            {{c.Percent}}%
                                        </td>
                                        <td>
                                            <b-input
                                                    @change="changeDate( p, c, i )"
                                                    size="sm"
                                                    v-model="c.Date"
                                                    type="text"
                                                />
                                        </td>
                                    </tr>
                                </tbody>
                                <b-form inline>
                                    <b-form-select size="sm" v-model="pg.selectMainName" @change="selectchanged" :options="pg.mainops"></b-form-select>
                                    <b-form-select size="sm" v-if="pg.selectMainName != null" v-model="pg.selectChildName" :options="pg.childops"></b-form-select>
                                    <b-button @click="addProgress">添加流程</b-button>
                                </b-form>
                        </b-card>
                    </b-col>
                    <b-col md="4">
                        <b-card id="table-marking" style=".transformed {transform: scale(0.5);}">
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
                                <tbody v-for="p in example_marking">
                                    <tr v-for="(c, i) in p.Childs">
                                        <td :rowspan="p.Childs.length" v-if="i == 0">
                                            {{ p.Name }}
                                        </td>
                                        <td>{{ c.Name }}</td>
                                        <td>
                                            <b-form inline>
                                                <b-input
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
                            <b-card>
                            <b-form class-content="mx-2" inline>
                                <small>主步骤名：</small>
                                <b-input style="width:5rem;" size="sm" v-model="new_marking.Name"></b-input>
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
                                <b-button variant="info" size="sm" @click="addMarking"
                                    >添加一笔流程</b-button
                                >
                            </b-form>
                            <hr>
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
                                <b-button variant="info" size="sm" @click="delMarking"
                                    >删除该流程</b-button
                                >
                            </b-form>
                        </b-card>
                        </b-card>
                    </b-col>

                </b-row>

            </b-tab>
            <b-tab title="表格" active>
                <canvas id="chart"></canvas>
                <b-form inline>
                    <b-input size="sm" v-model="chartProps.XDelta"></b-input>
                    <b-button variant="info" size="sm" @click="delMarking">重新绘制</b-button>
                </b-form>
                <!-- <line-chart :chart-data="datacollection" :options="options"></line-chart> -->
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import bvu from "../../cc/bvUtil";
import cu from "./canvasUtil/Canvas";
// import LineChart from "./LineChart";

export default {
    components: {
        // LineChart,
    },
    created() {
        // this.fillData();
        cu.Init()
    },
    mounted() {
        bvu.InitToast(this.$bvToast);
        this.drawChart( 1400, 600 );

        this.pg.mainops = []
        for ( var i = 0; i < this.example_marking.length; ++i ) {
            this.pg.mainops.push( this.example_marking[i].Name )
        }
    },
    data() {
        return {
            pg:{
                selectMainName: null,
                selectChildName: null,
                mainops: [],
                childops: [],
            },
            datacollection: null,
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
                XDelta : 20,
                nodes: [],
            },
            progress: [                {
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
                        { Name: "撰写授信", Percent: "40", Date: "2021/1/5"  },
                        { Name: "交支行", Percent: "45", Date: "2021/1/15"  },
                        { Name: "退回", Percent: "40", Date: "2021/1/25"  },
                        { Name: "交分行", Percent: "50", Date: "2021/1/26"  },
                        { Name: "上会", Percent: "55", Date: "2021/1/27"  },
                        { Name: "授信批复", Percent: "60", Date: "2021/1/28"  },
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
        };
    },
    methods: {
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

        changeDate( p, c, i ) {
            console.log( p, c, i )
            try {
                var newDate = Date.parse( c.Date )
                if ( isNaN( newDate ) ) {
                    throw("非法的日期 =>" + c.Date + "<= 请检查")
                }
                this.rerangeProgressByDate( p, c, i )
            } catch( ex ) {
                bvu.Msg( "修改日期时发生错误", ex, "danger")
                console.error( ex )
            }
        },
        addProgress() {
            for ( var i = 0; i < this.example_marking.length; ++i ) {
                if ( this.progress[i].Name == this.pg.selectMainName ) {
                    this.progress[i].Childs.push( { Name: this.pg.selectChildName, Percent: this.getPercent( this.pg.selectMainName, this.pg.selectChildName ), Date: "" })
                    return;
                }
            }
        },
        rerangeProgressByDate( p, c, ii ) {
            console.log( p )
            var curDate = new Date( c.Date )
            for ( var i = 0; i < p.Childs.length - 1; ++i ) {
                var prevDate = new Date(p.Childs[i].Date)
                var nextDate = new Date(p.Childs[i+1].Date)
                // insert i+1
                if ( curDate > prevDate && curDate <= nextDate ) {
                    if ( i+1 == ii ) {
                        continue
                    }
                    this.array_move( p.Childs, ii, i > ii ? i : i + 1 )
                    console.log( "move to between", i, i + 1)
                    return
                }
            }
            if ( curDate < new Date(p.Childs[0].Date) ) {
                this. array_move( p.Childs, ii, 0)
                console.log( "move to first" )
            } else if ( curDate > new Date(p.Childs[p.Childs.length - 1].Date ) ) {
                this. array_move( p.Childs, ii, p.Childs.length - 1)
                console.log( "move to last" )
            }
            return;
        },
        getPercent( mn, cn ) {
            var percent = "0"
            this.example_marking.forEach( el => {
                if ( el.Name == mn ) {
                    el.Childs.forEach( elel => {
                        if ( elel.Name == cn ) {
                            percent = elel.Percent
                            return
                        }
                    } )
                }
            })
            return percent
        },
        selectchanged() {
            for ( var i = 0; i < this.example_marking.length; ++i ) {
                if ( this.example_marking[i].Name == this.pg.selectMainName ) {
                    this.pg.childops = []
                    for ( var j = 0; j < this.example_marking.length; ++j ) {
                        this.pg.childops.push(this.example_marking[i].Childs[j].Name)
                    }
                    return;
                }
            }
        },
        drawChart( w, h ) {
            const canvas = document.getElementById('chart');
            // canvas.clear(0, 0, canvas.width, canvas.height);
            canvas.height = h;
            canvas.width = w;
            const ctx = canvas.getContext('2d');

            var left = 0
            var right = left + w
            var top = 0
            var bottom = top + h

            ctx.font = "0.8rem arial";
            ctx.fillTextCenterX( "hello world", w / 2, 10 )
            var zero = {
                x : left + ctx.r( 70 ),
                y : bottom - ctx.r( 100 ),
            }
            var ctop =  top + ctx.r( 20 )
            var cright = right - ctx.r( 80 )
            var cxcenter = ( cright - zero.x ) / 2
            var cycenter = ( zero.y - ctop ) / 2
            ctx.drawLine(zero.x, ctop, zero.x, zero.y )
            ctx.drawLine( zero.x, zero.y, cright, zero.y )
            // 绘制横纵轴标注
            ctx.fillTextCenterX( "时间（年/月/日）", cxcenter, zero.y + ctx.r( 70 ) )
            ctx.fillTextVerticalRaw( "进度（%）", zero.x - ctx.r( 50 ), cycenter )
            // 绘制纵向刻度
            var delta = ( zero.y - ctop ) / 10
            for( var i = 1; i < 11; i ++ ) {
                var c = (100 - i*10).toString()
                ctx.strokeStyle = "rgb("+c+","+c+","+c+")"
                var ymetery = zero.y - i * delta
                ctx.drawLine( zero.x, ymetery, cright, ymetery, 0.8 )
                ctx.fillTextCenter( (i*10).toString()+"%", zero.x - 20, ymetery )
            }
            // 绘制横向刻度
            var minDate = Date.parse( this.progress[0].Childs[0].Date )
            var maxDate = Date.parse( this.progress[0].Childs[0].Date )
            for ( i = 0; i < this.progress.length; ++i ) {
                for( var j = 0; j < this.progress[i].Childs.length; ++j ) {
                    var curDate = Date.parse( this.progress[i].Childs[j].Date )
                    console.log( curDate )
                    minDate = curDate < minDate ? curDate : minDate;
                    maxDate = curDate > maxDate ? curDate : maxDate;
                }
            }
            const diffDays = Math.ceil( ( maxDate - minDate ) / ( 1000 * 60 * 60 * 24 ) );
            console.log( diffDays )

            var deltaUnix = (  maxDate - minDate ) / this.chartProps.XDelta
            var curUnix = minDate
            var deltaWidth = ( (cright - zero.x) / this.chartProps.XDelta )
            for ( i = 0; i < this.chartProps.XDelta + 1; i++ ) {
                var curDate2 = new Date( curUnix )
                var xmerterx = zero.x + deltaWidth * i
                ctx.strokeStyle = "rgb(80,80,80)"
                ctx.fillTextVerticalRaw( curDate2.getFullYear().toString() + "/" + (curDate2.getMonth() + 1).toString() + "/" + curDate2.getDate().toString(), xmerterx, zero.y + ctx.r( 50 ), - Math.PI / 4 )
                ctx.drawLine( xmerterx, zero.y, xmerterx, ctop, 0.5 )
                curUnix += deltaUnix
            }

            var color_list = ["#D2691E","#7FFFD4","#DEB887","#5F9EA0","#7FFF00","#00FFFF"]

            // 绘制曲线
            var updown = true
            var prevX = zero.x, prevY = zero.y
            ctx.fillRect( zero.x - 4, zero.y - 4, 8,8)
            ctx.fillTextCenterX( this.progress[0].Childs[0].Name, zero.x-20, zero.y + 20 )
            this.chartProps.nodes = []
            for ( i = 0; i < this.progress.length; ++i ) {
                ctx.strokeStyle = color_list[i]
                for( j = 1; j < this.progress[i].Childs.length; ++j ) {
                    ctx.strokeStyle = color_list[i]
                    
                    var curChild = this.progress[i].Childs[j]
                    // 获取坐标并记录
                    var curX = ( Date.parse( curChild.Date ) - minDate ) / ( maxDate - minDate ) * ( cright - zero.x ) + zero.x
                    var curY = zero.y - ( curChild.Percent / 100 * ( zero.y - ctop ) )
                    this.chartProps.nodes.push( { name: curChild.Name,x: curX, y: curY } )
                    // 绘制折线
                    ctx.drawLine( curX, curY, prevX, prevY, 3 )
                    ctx.strokeStyle = color_list[5]
                    // 画点
                    ctx.fillRect( curX - 4, curY - 4, 8,8)
                    prevX = curX; prevY = curY
                }
            }
            // 写上流程名
            for ( i = 0; i < this.chartProps.nodes.length; ++i ) {
                curX = this.chartProps.nodes[i].x
                curY = this.chartProps.nodes[i].y
                var curName = this.chartProps.nodes[i].name
                var textY = updown ? curY - 10 : curY + ctx.getTextWidth( curChild.Name ) + 10

                ctx.fillTextVerticalRaw( curName, curX, textY, - Math.PI / 3 )
                updown = !updown
            }
        },

        getRandomInt() {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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

</style>
