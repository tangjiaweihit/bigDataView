<script>
export default {
  data() {
    return {
      value: "",
      isStart: false,
      finished: false,
      eData: "",
      isScreen: false
    };
  },
  mounted() {
    this.$el.lastElementChild.src = `${this.$resourceUrl}/shuangyanshijuepinghengdian/`;
  },
  methods: {
    goBack() {
      this.$router.replace("/index/homeRoute");
    }
  }
};
</script>
<template>
  <div class="TrainIframe" element-loading-background="rgba(0, 0, 0, 0.3)">
    <div style="margin-left: 10px">
      <el-button type="text" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <iframe class="ScreenIframe" frameborder="no"></iframe>
  </div>
</template>

<style lang="scss">
.TrainIframe .container {
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #00c1de;
  }
  .el-input__inner:focus {
    border-color: #00c1de;
  }
}
</style>
<style lang="scss" scoped>
.el-select-dropdown__item.selected {
  color: #00c1de;
}
.TrainIframe {
  width: 99%;
  height: 96%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  // margin: 15px;
  background-color: #fff;
  border-radius: 5px;
  overflow: auto;
}
.ScreenIframe {
  width: 100%;
  height: 99%;
}
.text {
  margin-bottom: 24px;
  margin: 0 23px 24px 23px;
  text-align: center;
  color: #343434;
  font-size: 18px;
  .selectBox {
    margin-top: 20px;
  }
}
</style>




