<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  background-color: #f5f6f7;
}
#app {
  font-size: 14px;
  height: 100vh;
  width: 100vw;
}
* {
  margin: 0px;
  padding: 0px;
  flex-shrink: 0;
  font-family: "Microsoft Yahei", "微软雅黑", "Helvetica Neue", Helvetica, Arial,
    "Heiti SC", "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei",
    sans-serif;
  font-weight: 400;
}
</style>
