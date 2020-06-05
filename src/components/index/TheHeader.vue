<script>
export default {
  data() {
    return {
      name: "xxx"
    };
  }
};
</script>

<template>
  <div class="TheHeader">
    <img class="header_logo" src="@/assets/logo.png" />
    <span class="line" />
    <p class="title">中国大学MOOC网站用户数据统计展示平台</p>
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
}
</style>