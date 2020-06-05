<script>
import "@/common/china.js";
import "echarts/map/js/china.js";
export default {
  name: "province",
  props: {
    selectDate: String
  },
  data() {
    console.log('this.selectDate ', this.selectDate )
    return {
      sourceMapData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("province"));
      const option = {
        tooltip: {
          triggerOn: "click",
          formatter: function(e, t, n) {
            const data = e.data;
            return `访问量 ${data.name}：${data.value}`;
          }
        },
        title: {
          text: "全国各省份数据统计"
        },
        visualMap: {
          min: 0,
          max: 100000,
          left: 100,
          bottom: 100,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [
            {
              gt: 50000,
              color: "#6ea397"
            },
            {
              gt: 10000,
              lte: 50000,
              color: "#4ea397"
            },
            {
              gte: 5000,
              lte: 10000,
              color: "#22c3aa"
            },
            {
              gte: 1000,
              lt: 5000,
              color: "#7bd9a5"
            },
            {
              gt: 100,
              lt: 1000,
              color: "#ffd768"
            },
            {
              lt: 100,
              color: "#cccccc"
            }
            // {
            //   value: 0,
            //   color: "#ffffff"
            // }
          ],
          show: !0
        },
        geo: {
          map: "china",
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 1
          },
          zoom: 1.23,
          top: 10,
          label: {
            normal: {
              show: !0,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: "#3fb1e3",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: "访问量",
            type: "map",
            geoIndex: 0,
            data: this.sourceMapData
          }
        ]
      };
      myChart.setOption(option);
    },
    async getData() {
      const date = this.selectDate || "2020-05-19";
      let token = await this.$http.admin.getProvinceList(date);
      const mapresu = pname => {
        if (pname.indexOf("省") > -1) {
          return pname.replace("省", "");
        } else if (pname.indexOf("市") > -1) {
          return pname.replace("市", "");
        } else if (pname.indexOf("自治区") > -1) {
          return pname.replace("自治区", "");
        } else if (pname.indexOf("省") > -1) {
          return pname.replace("特别行政区", "");
        } else {
          return pname;
        }
      };
      this.sourceMapData = token.data.result_province.map(o => {
        return {
          name: mapresu(o.province),
          value: o.cnt_province
        };
      });

      if (this.sourceMapData) {
        this.drawLine();
      }
      console.log("tokensi", this.sourceMapData);
    }
  }
};
</script>
<template>
  <div id="province" :style="{width: '900px', height: '600px', margin: '10px auto'}"></div>
</template>