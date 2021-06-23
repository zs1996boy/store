<template>
  <div id="app">
    <van-tabbar v-model="active" route active-color="#ee0a24">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
     data() {
    return {
      active: 0,
    };
  },
}
</script>
<style lang="less" scoped>

</style>