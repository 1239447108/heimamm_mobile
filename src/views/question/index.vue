<template>
  <div class="question">
    <header>
      面试宝典
      <van-dropdown-menu>
      <van-dropdown-item v-model="city" :options="cities" />
    </van-dropdown-menu>
    </header>
    <div class="scroll_box">
      <div class="scroll_content">
        <span class="active">深圳</span>
        <span>深圳啊</span>
        <span>深圳</span>
        <span>深圳</span>
        <span>深圳啊</span>
        <span>深圳</span>
        <span>深圳</span>
        <span>深圳</span>
        <span>深圳啊</span>
        <span>深圳</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      city: 0,
      cities: [
        {
          text: '北京',
          value: 0
        },
        {
          text: '上海',
          value: 1
        },
        {
          text: '深圳',
          value: 2
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang='less'>
  .question{
    header{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 100px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222222;
      /deep/ .van-dropdown-menu__bar{
        box-shadow: none;
      }
    }
    .scroll_box{
      width: 100%;
      overflow-x: auto;
      .scroll_content{
        padding: 10px;
        display: flex;
        align-items: center;
        span{
          min-width: 36px;
          text-align: center;
          margin: 0 5px;
          background: #f7f4f5;
          border-radius: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-size: 12px;
          color: #545671;
          padding: 6px 14px;
        }
        span.active{
          background-color: #00B8D4;
          color: #fff;
        }
      }
    }
  }
</style>
