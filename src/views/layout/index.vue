<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="bars">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
</style>
