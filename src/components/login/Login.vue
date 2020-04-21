<script>
// import QuitBtn from "@/components/common/QuitBtn.vue";

export default {
  // components: {
  //   QuitBtn
  // },
  data() {
    return {
      username: "",
      password: "",
      openBrowserTip: false
    };
  },
  // created() {
  //   if (process.env.NODE_ENV == "development") {
  //     this.username = "13555555555";
  //     this.password = "admin";
  //   }

  //   let ieVersion = this.getIEVersion();
  //   let chromeVersion = this.getChromeVersion();
  //   if (this.isIEnotEdge() == true || chromeVersion != false) {
  //     if (chromeVersion * 1 >= 54 || ieVersion == false) {
  //       this.openBrowserTip = false;
  //     } else {
  //       this.openBrowserTip = true;
  //     }
  //   } else {
  //     this.openBrowserTip = true;
  //   }
  // },
  methods: {
    async login() {
      let token = await this.$http.login(this.username, this.password);

      // let roles = await this.$http.get
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("token", token);
        localStorage.setItem("username", this.username);
        this.getHomeAndGoOn();
      }
    },
    async getHomeAndGoOn() {
      let user = await this.$http.getHome();
      localStorage.setItem("name", user.name);
      localStorage.setItem("id", user.id);
      localStorage.setItem("avatar", user.profilePhoto);
      let data = await this.$http.getSelf();
      if (data && data.roles) {
        localStorage.setItem("roles", data.roles);
      }
      let type = localStorage.getItem("type");
      if (this.openBrowserTip == false) {
        if (type === "saveBtnClicked") {
          this.$router.replace("/index/userinfo");
        } else {
          this.$router.replace("/firstscreendetect");
        }
      } else {
        this.$router.replace("/browsertip");
      }
      // if(type === "saveBtnClicked"){
      //     this.$router.replace('/index/userinfo');
      // }else{
      //     this.$router.replace('/firstscreendetect');
      // }
      // this.$router.replace('/index/userinfo')
    },
    getChromeVersion() {
      let arr = navigator.userAgent.split(" ");
      let chromeVersion = "";
      for (let i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) chromeVersion = arr[i];
      }
      if (chromeVersion) {
        return Number(chromeVersion.split("/")[1].split(".")[0]);
      } else {
        return false;
      }
    },
    getIEVersion() {
      let userAgent = navigator.userAgent;
      let isIE = /msie|trident/g.test(userAgent.toLowerCase());
      let islessIE11;
      if (isIE) {
        islessIE11 =
          userAgent.indexOf("compatible") > -1 &&
          userAgent.indexOf("MSIE") > -1;
        return islessIE11;
      } else {
        return true;
      }
    },
    isIEnotEdge() {
      let userAgent = navigator.userAgent;
      let isIE = /msie|trident/g.test(userAgent.toLowerCase());
      let isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
      if (isEdge == true) {
        return false;
      }
      if (isIE == true) {
        return true;
      }
    },
    onClickForgetPwd() {
      this.$router.push({
        path: `/forgetPwd`
      });
    }
  }
};
</script>

<template>
  <div class="Login">
    <!-- <QuitBtn></QuitBtn> -->
    <Login
      for-player
      :newForgetPwd="true"
      :username.sync="username"
      :password.sync="password"
      @confirm="login"
      @onClickForgetPwd="onClickForgetPwd"
    ></Login>
  </div>
</template>

<style lang="scss" scoped>
.QuitBtn {
  z-index: 2;
  position: fixed;
  top: 19px;
  right: 25px;
}
</style>




