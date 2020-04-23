<script>
import CardCell from "@/components/homeRoute/CardCell.vue";

export default {
  components: {
    CardCell
  },
  data() {
    let messData = JSON.parse(localStorage.getItem("data"));
    console.log("-aaa", messData);
    return {
      messData,
      resolutionResult:
        messData && messData.DPI ? `DPI: ${messData.DPI}` : "--",
      visionResult: "",
      visionButton: [
        {
          name: "开始检测",
          route: "vision"
        }
      ],
      balanceButton: [
        {
          name: "开始检测",
          route: "balance"
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const result = await this.$http.admin.getAllLastedTestResult();
      if (result && result.data) {
        if (result.data.leftEyeVision || result.data.rightEyeVision) {
          this.visionResult = `右眼：${result.data.rightEyeVision ||
            "--"}  左眼：${result.data.leftEyeVision || "--"}`;
        }
      }
    }
  }
};
</script>

<template>
  <div class="HomeRoute">
    <div class="titleView">
      <span class="line" />
      <span class="routeTitle">系统校准</span>
      <span class="line" />
    </div>
    <div class="contentView">
      <CardCell
        iconImg="resolution"
        title="分辨率校准"
        route="resolution"
        :lastedResult="resolutionResult"
      />
    </div>
    <div class="titleView">
      <span class="line" />
      <span class="routeTitle">视功能检测</span>
      <span class="line" />
    </div>
    <div class="contentView">
      <CardCell
        iconImg="vision"
        :buttonArray="visionButton"
        title="视力"
        route="vision"
        :lastedResult="visionResult"
      />
      <CardCell iconImg="balance" :buttonArray="balanceButton" title="双眼视觉平衡点" route="balance" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.HomeRoute {
  .titleView {
    // width: 100%;
    text-align: center;
    margin: 15px auto;

    .routeTitle {
      width: 8%;
      display: inline-block;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(46, 46, 46, 1);
      line-height: 25px;
      margin: 10px 20px;
    }

    .line {
      width: 42%;
      display: inline-block;
      height: 1px;
      background-color: #e4e8eb;
      margin-bottom: 5px;
    }
  }
  .contentView {
    // width: 100%;
    text-align: center;
    margin: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>
