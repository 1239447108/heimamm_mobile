<template>
  <div>
    <keep-alive include="find,question">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-show='$route.meta.needTabbar' v-model="activeIndex" active-color="#fe001b" route>
      <van-tabbar-item to='/company' icon="todo-list">公司</van-tabbar-item>
      <van-tabbar-item to='/question' icon="column">刷题</van-tabbar-item>
      <van-tabbar-item to='/find' icon="eye">发现</van-tabbar-item>
      <van-tabbar-item to='/my' icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      activeIndex: 2
    }
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang='less'></style>
