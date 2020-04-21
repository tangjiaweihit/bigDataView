<script>
import balance from "../../assets/balance.png";
import vision from "../../assets/vision.png";
import resolution from "../../assets/resolution.png";

const mapIcon = {
  vision: vision,
  balance: balance,
  resolution: resolution
};
export default {
  props: {
    iconImg: String,
    route: String,
    title: String
  },
  data() {
    const icon = mapIcon[this.iconImg];
    return {
      item: {
        icon: icon,
        title: this.title,
      }
    };
  },
  methods: {
    onClick() {
      this.$router.push({
        path: `/index/${this.route}`
      });
    }
  }
};
</script>

<template>
  <div class="cardCell">
    <img class="iconImg" :src="item.icon" />
    <div class="cellTitle">{{item.title}}</div>
    <div class="cellResult">前次测试结果：{{item.title}}</div>
    <el-button @click="onClick" class="cellStartButton">开始校准</el-button>
  </div>
</template>



<style lang="scss" scoped>
.cardCell {
  width: 270px;
  height: 300px;
  background: #ffffff;
  margin: 15px;
  text-align: center;
  .iconImg {
    width: 60px;
    display: block;
    margin: 40px 105px;
  }
  .cellTitle {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(70, 77, 87, 1);
    line-height: 28px;
  }
  .cellResult {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(108, 108, 108, 1);
    line-height: 17px;
    margin: 25px;
  }
  .cellStartButton {
    // margin-top: 25px;
    border: 1px solid #00c1de;
    color: #00c1de;
  }
}
</style>
