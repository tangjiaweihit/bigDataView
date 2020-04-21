




<script>
import TheHeader from "@/components/index/TheHeader.vue";
// import LoadingView from '../gameList/LoadingView.vue'

export default {
  components: {
    TheHeader
    // LoadingView
  },
  data() {
    return {
      value: "",
      options: [
        {
          value: "4.0",
          label: "4.0"
        },
        {
          value: "4.1",
          label: "4.1"
        },
        {
          value: "4.2",
          label: "4.2"
        },
        {
          value: "4.3",
          label: "4.3"
        },
        {
          value: "4.4",
          label: "4.4"
        },
        {
          value: "4.5",
          label: "4.5"
        },
        {
          value: "4.6",
          label: "4.6"
        },
        {
          value: "4.7",
          label: "4.7"
        },
        {
          value: "4.8",
          label: "4.8"
        },
        {
          value: "4.9",
          label: "4.9"
        },
        {
          value: "5.0",
          label: "5.0"
        },
        {
          value: "5.1",
          label: "5.1"
        },
        {
          value: "5.2",
          label: "5.2"
        },
        {
          value: "5.3",
          label: "5.3"
        }
      ],
      isStart: false,
      finished: false,
      eData: "",
      isScreen: false
    };
  },
  mounted() {
    this.$el.lastElementChild.lastElementChild.src = `${this.$resourceUrl}/shigongnengjiance-shili/index.html`;
    window.addEventListener("message", this.getMessage);
  },
  methods: {
    getMessage(e) {
      if (this.isJsonString(e.data)) {
        let data = e.data;
        data = JSON.parse(data);
        this.eData = data;
        if (data.type === "saveBtnClicked") {
          localStorage.setItem("type", data.type);
          localStorage.setItem("data", JSON.stringify(data.data));
          this.$router.replace("/index/homeRoute");
        } else if (data.type === "isStart") {
          this.isStart = true;
        } else if (data.type === "isScreen") {
          this.isScreen = true;
        } else if (data.type === "getPixelInfo") {
          let messData = JSON.parse(localStorage.getItem("data"));
          document.querySelector(".ScreenIframe").contentWindow.focus();
          let jsonData = JSON.stringify({
            type: "getPixelInfo",
            data: messData
          });
          window.frames[0].postMessage(jsonData, "*");
          this.finished = true;
        }
      }
    },
    isJsonString(str) {
      try {
        if (typeof JSON.parse(str) == "object") {
          return true;
        }
      } catch (e) {}
      return false;
    },
    confirmJump() {
      if (this.eData.type === "isStart") {
        this.isStart = false;
        document.querySelector(".ScreenIframe").contentWindow.focus();
        if (this.value) {
          let jsonData = JSON.stringify({ type: "isStart", data: this.value });
          window.frames[0].postMessage(jsonData, "*");
        } else {
          let jsonData = JSON.stringify({ type: "isStart", data: "4.0" });
          window.frames[0].postMessage(jsonData, "*");
        }
      }
    },
    goScreenTest() {
      this.isScreen = false;
      this.$router.push("screendetect");
    },
    goBack() {
      this.$router.replace("/index/homeRoute");
    }
  }
};
</script>
<template>
  <div
    class="TrainIframe"
    v-loading.fullscreen.lock="!finished"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="container">
      <Dialog
        class="TrainIframeDialog"
        v-if="isStart"
        simple
        @close="isStart=false"
        @confirm="confirmJump"
      >
        <div class="text">
          <p class="textTitle">初始测试值（五分记录）</p>
          <el-select class="selectBox" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </Dialog>
      <Dialog
        class="TrainIframeDialog"
        v-if="isScreen"
        simple
        @close="goScreenTest"
        @confirm="goScreenTest"
      >
        <div class="text">
          <p class="textTitle">请前往屏幕检测</p>
        </div>
      </Dialog>
      <div style="margin-left: 10px">
        <el-button type="text" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
      <iframe class="ScreenIframe" frameborder="no"></iframe>
    </div>
  </div>
</template>

<style lang="scss">
.TrainIframeDialog h1 {
  display: none;
}
.container .LoadingView {
  width: 100%;
  height: 100%;
}
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




