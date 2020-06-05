<script>
import TheHeader from "@/components/index/TheHeader.vue";
import province from "@/components/homeRoute/province.vue";
import Test2 from "@/components/homeRoute/test2.vue";
import moment from 'moment'
export default {
  components: {
    TheHeader,
    province,
    // Test,
    Test2
  },
  data() {
    return {
      activeName: "second",
      deafultDate: moment().format('YYYY-MM-DD'),
      first: true,
      second: true
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === "first") {
        this.first = false;
        this.$nextTick(function() {
          this.first = true;
        });
      } else if (tab.name === "second") {
        this.second = false;
        this.$nextTick(function() {
          this.second = true;
        });
      }
    },
    onSelectDate(date) {
      if (this.activeName === "first") {
        this.first = false;
        this.$nextTick(function() {
          this.first = true;
        });
      } else if (this.activeName === "second") {
        this.second = false;
        this.$nextTick(function() {
          this.second = true;
        });
      }
    }
  }
};
</script>

<template>
  <div class="Index">
    <TheHeader />
    <div class="mainContent">
      <div class="content">
        <el-tabs class="hello" v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全国流量展示" name="first">
            <province :selectDate="deafultDate" v-if="first" />
          </el-tab-pane>
          <el-tab-pane label="访问统计展示" name="second">
            <Test2 :selectDate="deafultDate" v-if="second" />
          </el-tab-pane>
          <el-tab-pane label="实时统计展示" name="third">
            <iframe class="playRadioIframe" src="http://fangmiao.zjlup.com:33099/echarts"></iframe>
          </el-tab-pane>
        </el-tabs>
        <span class="dateSelect">
          展示数据时间选择：
          <el-date-picker
            v-model="deafultDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="onSelectDate"
          ></el-date-picker>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Index {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .mainContent {
    flex-grow: 1;
    display: flex;
    width: 100vw;
    .content {
      width: calc(100vw - 50px);
      height: calc(100vh - 65px - 30px);
      box-sizing: border-box;
      flex-grow: 1;
      margin: 15px;
      background: #ffffff;
      border-radius: 5px;
      overflow: auto;
      .hello {
        width: 100%;
        .playRadioIframe {
          width: 100%;
          height: 500px;
        }
      }
      .dateSelect {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
}
</style>


