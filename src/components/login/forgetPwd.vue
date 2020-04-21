<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    async sendSms(phone) {
      const data = {
        phone,
        action: "RETRIEVE_PASSWORD"
      };
      const result = await this.$http.admin.RetrievePassword("sendSms", data);
    },
    async verifyCode(form) {
      const data = {
        phone: form.phoneNumber,
        code: form.verification,
        action: "VERIFY_RETRIEVE_PASSWORD"
      };
      const result = await this.$http.admin.RetrievePassword("verifySms", data);
      if (result) {
        this.active++;
      } else {
        this.$message.warning("验证失败，请重试！");
      }
    },
    async submitNewPwd(form) {
      const data = {
        userName: form.userName,
        phone: form.phone,
        code: form.code,
        password: form.password,
        action: "VERIFY_RETRIEVE_PASSWORD"
      };
      const result = await this.$http.admin.RetrievePassword("verifySms", data);
      if (result) {
        this.active++;
      } else {
        this.$message.warning("验证失败，请重试！");
      }
    },
    successRetreve() {
      this.$router.push({
        path: `/login`
      });
    }
  }
};
</script>

<template>
  <div class="forgetPasswordPage">
    <div class="TheHeader">
      <img src="@/assets/header_logo.svg" />
      <span class="line" />
      <span class="TheHeaderTitle">视感知觉训练软件</span>
    </div>
    <div class="mainBody">
      <RetrievePassword
        @verifyCode="verifyCode"
        @submitNewPwd="submitNewPwd"
        @successRetreve="successRetreve"
        @sendSms="sendSms"
        :active="active"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/css/color.scss";

.forgetPasswordPage {
  .TheHeader {
    height: 64px;
    background-color: #fff;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #e4e8eb;
    padding-left: 20px;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 40px;
    }

    .line {
      width: 1px;
      height: 40px;
      background-color: #e4e8eb;
      margin-left: 15px;
      margin-right: 15px;
    }
    .TheHeaderTitle {
      display: inline-block;
      font-size: 18px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: rgba(144, 145, 145, 1);
      line-height: 27px;
    }
  }
  .mainBody {
    background-color: #fff;
    height: calc(100vh - 64px);
    overflow: hidden;
    .findPasswordCardTitle {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(1, 1, 1, 1);
      line-height: 25px;
    }
  }
}
</style>
