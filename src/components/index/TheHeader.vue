<script>
// import QuitBtn from "@/components/common/QuitBtn.vue";
import quit from "@/common/quit";
import { Message } from "element-ui";
const packageJSON = require("root/package.json");
export default {
  components: {
    // QuitBtn,
    quit
  },
  data() {
    const ROLE_COMPLIANCE =
      localStorage.getItem("roles").indexOf("ROLE_COMPLIANCE") > -1;
    const avatar = localStorage.getItem("avatar") || "picture_0_revision_1.png";
    const userId = localStorage.getItem("id");
    const trainUrl = this.$trainUrl;
    return {
      name: "xxx",
      ROLE_COMPLIANCE,
      checkList: [],
      userId,
      avatar,
      trainUrl
    };
  },
  computed: {
    hi() {
      return `${this.name}`;
    }
  },
  created() {
    this.name = localStorage.getItem("name");
  },
  methods: {
    quit
  }
};
</script>

<template>
  <div class="TheHeader">
    <img class="header_logo" src="@/assets/header_logo.svg" />
    <span class="line" />
    <p class="title">视感知觉视力挑战平台</p>
    <img class="headImage" :src="`${trainUrl}/profilephoto/${avatar}`" />
    <p v-if="!ROLE_COMPLIANCE && name" class="hi">
      <span>{{hi}}</span>
    </p>
    <span class="quitButton" @click="quit">退出登录</span>
  </div>
</template>

<style lang="scss">
@import "@/css/color.scss";
.TheHeader {
  height: 64px;
  box-shadow: 0px -1px 0px 0px rgba(228, 232, 235, 1);
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 25px 0px 20px;
  border-bottom: 1px solid #e4e8eb;
  .header_logo {
    width: 50px;
    height: 40px;
  }
  .line {
    width: 1px;
    height: 40px;
    background-color: #e4e8eb;
    margin-left: 15px;
  }
  .title {
    font-size: 18px;
    color: #909191;
    line-height: 24px;
    flex-grow: 1;
    margin-left: 15px;
  }
  .headImage {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }

  .hi {
    // line-height: 30px;
    font-size: 14px;
    color: rgba(10, 33, 54, 1);

    span {
      display: inline-block;
    }
  }

  .quitButton {
    display: inline-block;
    color: #a2a4a6;
    margin: 10px;
    cursor: pointer;
    &:hover {
      color: #00c1de;
    }
  }
}
</style>