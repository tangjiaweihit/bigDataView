<style>
.echartsbase {
  width: 400px;
  height: 400px;
}
.Line {
  width: 500px !important;
  height: 400px !important;
}
.pie {
  width: 400px !important;
  height: 400px !important;
}
.statusLine {
  width: 1200px !important;
  height: 400px !important;
}
</style>

<template>
  <div class="StatisticsCharts">
    <v-chart class="Line" :options="polar" theme="myMacarons" />
    <v-chart class="Line" :options="polar2" theme="myMacarons" />
    <v-chart class="pie" :options="polar4" theme="myMacarons" />
    <v-chart class="pie" :options="polar5" theme="myMacarons" />
    <v-chart class="pie" :options="polar6" theme="myMacarons" />
    <v-chart class="statusLine" :options="polar3" theme="myMacarons" />
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import groupBy from "lodash/groupBy";
export default {
  components: {
    "v-chart": ECharts
  },
  props: {
    selectDate: String
  },
  data() {
    return {
      polar: {
        title: {
          text: "PV数据统计"
          // x: "center"
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "访问量",
            type: "line",
            data: []
          }
        ]
      },
      polar2: {
        title: {
          text: "UV数据统计"
          // x: "center"
        },
        xAxis: {
          data: []
        },
        yAxis: {
          // max: 7000,
          // min: 3000
        },
        series: [
          {
            name: "访问量",
            type: "line",
            data: []
          }
        ]
      },
      polar3: {
        title: {
          text: "访问状态数据统计"
          // x: "center"
        },
        legend: {
          data: ["200访问量", "404访问量", "500访问量"]
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: []
        },
        yAxis: {
          // max: 2300,
          min: 1000
        },
        series: [
          {
            name: "200访问量",
            type: "bar",
            data: []
          },
          {
            name: "404访问量",
            type: "bar",
            data: []
          },
          {
            name: "500访问量",
            type: "bar",
            data: []
          }
        ]
      },
      polar4: {
        title: {
          text: "TOP3课程"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   show: true,
        //   orient: "vertical",
        //   left: "left",
        //   data: ["微信访问", "公众号访问", "扫码进入", "分享进入", "搜索访问"]
        // },
        series: [
          {
            name: "访问量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              // { value: 335, name: "微信访问" },
              // { value: 310, name: "公众号访问" },
              // { value: 234, name: "扫码进入" },
              // { value: 135, name: "分享进入" },
              // { value: 1548, name: "搜索访问" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
        // animationDuration: 2000
      },
      polar5: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   show: true,
        //   orient: "vertical",
        //   left: "left",
        //   data: ["微信访问", "公众号访问", "扫码进入", "分享进入", "搜索访问"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              // { value: 335, name: "微信访问" },
              // { value: 310, name: "公众号访问" },
              // { value: 234, name: "扫码进入" },
              // { value: 135, name: "分享进入" },
              // { value: 1548, name: "搜索访问" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
        // animationDuration: 2000
      },
      polar6: {
        title: {
          text: "用户使用过的操作系统种类"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   show: true,
        //   orient: "vertical",
        //   left: "left",
        //   data: ["微信访问", "公众号访问", "扫码进入", "分享进入", "搜索访问"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              // { value: 335, name: "微信访问" },
              // { value: 310, name: "公众号访问" },
              // { value: 234, name: "扫码进入" },
              // { value: 135, name: "分享进入" },
              // { value: 1548, name: "搜索访问" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
        // animationDuration: 2000
      },
      result_pv: [],
      result_uv: [],
      result_status: [],
      result_top3: [],
      result_province: [],
      result_course: [],
      result_search: [],
      result_os_cnt: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const date = this.selectDate || "2020-05-19";
      let result = await this.$http.admin.getStatisticsData(date);
      this.result_pv = result.data.result_pv;
      this.result_uv = result.data.result_uv;
      this.result_status = result.data.result_status;
      this.result_top3 = result.data.result_top3;
      this.result_course = result.data.result_course;
      this.result_search = result.data.result_search;
      this.result_os_cnt = result.data.result_os_cnt;
      console.log("tokensithis.selectDate", this.selectDate, result.data);
      this.drawLine();
    },
    drawLine() {
      if (this.result_pv.length > 0) {
        // const group = groupBy(this.result_pv, 'day')
        // console.log('group',group)
        const xData = this.result_pv.map(o => `${o.day}日${o.HOUR}点`);
        const yData = this.result_pv.map(o => o.cnt_pv);
        this.polar.xAxis.data = xData;
        this.polar.series[0].data = yData;
      }
      if (this.result_uv.length > 0) {
        const xData = this.result_uv.map(o => `${o.day}日${o.HOUR}点`);
        const yData = this.result_uv.map(o => o.cnt_uv);
        this.polar2.xAxis.data = xData;
        this.polar2.series[0].data = yData;
      }
      if (this.result_status.length > 0) {
        const group = groupBy(this.result_status, "STATUS");
        const xData = group["200"].map(o => `${o.day}日${o.HOUR}点`);
        let j = 0;
        for (let i in group) {
          this.polar3.series[j].data = group[i].map(o => o.cnt_status);
          j++;
        }
        this.polar3.xAxis.data = xData;
      }
      if (this.result_top3.length > 0) {
        console.log("this.result_course", this.result_course);
        const mapCOurseName = courseid => {
          const course = this.result_course.filter(o => o.pageid === courseid);
          if (course[0]) {
            return course[0].course;
          } else {
            return courseid;
          }
        };
        const yData = this.result_top3.map(o => {
          return {
            value: o.cnt_pageid,
            name: mapCOurseName(o.pageid)
          };
        });
        this.polar4.series[0].data = yData;
      }
      if (this.result_search.length > 0) {
        const mapSearch = {
          "cn.bing": "必应",
          "www.baidu": "百度",
          "www.so": "搜搜",
          "www.sogou": "搜狗"
        };
        const yData = this.result_search.map(o => {
          return {
            value: o.cnt_search,
            name: o.search == "-" ? "其他" : mapSearch[o.search]
          };
        });
        this.polar5.series[0].data = yData;
      }
      if (this.result_os_cnt.length > 0) {
        const yData = this.result_os_cnt.map(o => {
          return {
            value: o.cnt,
            name: `${o.cnt_os}种`
          };
        });
        this.polar6.series[0].data = yData;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.StatisticsCharts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
