




<script>
export default {
  data() {
    return {
      isQuit: false,
      finished: false
    };
  },
  mounted() {
    this.$el.lastElementChild.lastElementChild.src = `${this.$resourceUrl}/pingmujiance/index.html`;
    window.addEventListener("message", this.getMessage);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.getMessage);
  },
  methods: {
    getMessage(e) {
      if (this.isJsonString(e.data)) {
        this.finished = true;
        let data = e.data;
        data = JSON.parse(data);
        if (data.type === "saveBtnClicked") {
          localStorage.setItem("type", data.type);
          localStorage.setItem("data", JSON.stringify(data.data));
          if (this.$route.path !== "/index/homeRoute") {
            this.$router.replace("/index/homeRoute");
            this.$message({
              message: "保存成功",
              type: "success",
              duration: "2000"
            });
          }
        } else if (data.type === "skipBtnClicked") {
          this.isQuit = true;
        } else if (data.type === "getPixelInfo") {
          let messData = JSON.parse(localStorage.getItem("data"));
          document.querySelector(".ScreenIframe").contentWindow.focus();
          let jsonData = JSON.stringify({
            type: "getPixelInfo",
            data: messData
          });
          window.frames[0].postMessage(jsonData, "*");
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
      this.$router.replace("/index/homeRoute");
    },
    goBack() {
      this.$router.replace("/index/homeRoute");
    }
  }
};
</script>
<template>
  <div
    class="ScreenDetect"
    v-loading.fullscreen.lock="!finished"
    element-loading-background="rgba(0, 0, 0, 0.3)"
  >
    <div class="container">
      <Dialog
        class="ScreenDetectDialog"
        v-if="isQuit"
        simple
        @close="isQuit=false"
        @confirm="confirmJump"
      >
        <div class="text">
          <p>屏幕校准能够保证在不同分辨率下显示同等大小的图像，确定跳过吗？</p>
        </div>
      </Dialog>
      <div style="margin-left: 10px">
        <el-button type="text" @click="goBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
      <iframe class="ScreenIframe" frameborder="no"></iframe>
    </div>
  </div>
</template>

<style>
.ScreenDetectDialog h1 {
  display: none;
}

</style>
<style lang="scss" scoped>
.ScreenDetect {
  width: 99%;
  height: 98%;
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
  height: 92%;
}
.text {
  margin-bottom: 24px;
  margin: 0 23px 24px 23px;
  text-align: center;
  color: #343434;
  font-size: 18px;
}
</style>




