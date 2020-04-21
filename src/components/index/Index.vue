<script>
import TheHeader from "@/components/index/TheHeader.vue";
export default {
  components: {
    TheHeader
  }
};
</script>

<template>
  <div class="Index">
    <TheHeader />
    <div class="mainContent">
      <div class="content">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Index {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .mainContent {
    flex-grow: 1;
    display: flex;
    width: 100vw;
    .content {
      width: calc(100vw - 200px - 30px - 50px);
      height: calc(100vh - 65px - 30px);
      box-sizing: border-box;
      flex-grow: 1;
      margin: 15px;
      background:rgba(248,248,248,1);
      border-radius: 5px;
      overflow: auto;
    }
  }
}
</style>


