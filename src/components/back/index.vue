<template>
  <div>
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right='onClickRight'
    >
      <template #left>
        <i class="backicon iconfont iconbtn_nav_back"></i>
      </template>
      <template #title>
        <div class="title">
          {{ title }}
        </div>
      </template>
      <template #right>
        {{ rightText }}
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    title: String,
    rightText: String
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$emit('click-right')
    }
  }
}
</script>
<style scoped lang='less'>
  .van-nav-bar{
    .van-nav-bar__content{
      /deep/ .van-nav-bar__left{
        padding: 0 !important;
      }
    }
  }
  .backicon{
    font-size:40px;
  }
  .title{
    font-size: 18px;
    font-weight: 600;
    font-family: PingFangSC, PingFangSC-Semibold;
    color: #222222;
  }
</style>
