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
    title: String,
    lastedResult: String,
    buttonArray: Array
  },
  data() {
    let messData = JSON.parse(localStorage.getItem("data"));

    const icon = mapIcon[this.iconImg];
    return {
      item: {
        icon: icon,
        title: this.title
      },
      isScreen: false,
      messData
    };
  },
  methods: {
    onClick(route) {
      console.log("route", this.route);
      if (!this.route) {
        if (this.messData) {
          this.$router.push({
            path: `/index/${route}`
          });
        } else {
          this.isScreen = true;
        }
      } else {
        this.$router.push({
          path: `/index/${this.route}`
        });
      }
    }
  }
};
</script>

<template>
  <div class="cardCell">
    <img class="iconImg" :src="item.icon" />
    <div class="cellTitle">{{item.title}}</div>
    <div class="cellResult">前次测试结果：{{lastedResult}}</div>
    <span v-if="buttonArray">
      <el-button
        v-for="(item,index) in buttonArray"
        :key="item + index"
        @click="onClick(item.route)"
        class="cellStartButton"
      >{{item.name}}</el-button>
    </span>
    <el-button v-else @click="onClick" class="cellStartButton">开始校准</el-button>
    <Dialog
      class="isScreenDialog"
      v-if="isScreen"
      simple
      @close="isScreen = false"
      @confirm="isScreen = false"
    >
      <div class="text">
        <p class="textTitle">请先进行屏幕检测</p>
      </div>
    </Dialog>
  </div>
</template>


// <style lang="scss">
// .isScreenDialog {
//   > h1 {
//     display: none;
//   }
// }
// .text {
//   margin-bottom: 24px;
//   margin: 0 23px 24px 23px;
//   text-align: center;
//   color: #343434;
//   font-size: 18px;
// }
//
</style>
<style lang="scss" >
.cardCell {
  width: 270px;
  height: 300px;
  background: #ffffff;
  // box-shadow: darkgrey 0px 0px 1px 1px;
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
  .isScreenDialog {
    > h1 {
      display: none;
    }
    .textTitle {
      margin-bottom: 24px;
      margin: 0 23px 24px 23px;
      text-align: center;
      color: #343434;
      font-size: 18px;
    }
  }
}
</style>
