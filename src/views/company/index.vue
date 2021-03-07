<template>
  <div class="company">
    <header>
      <div class="header_text">
        公司
      </div>
      <div class="header_input">
        <i class="iconfont iconicon_search"></i>
        <input placeholder="请输入关键字" type="text">
      </div>
    </header>
    <div class="banner">
      <img src="../../assets/company_banner@2x.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang='less'>
  .company{
    header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      .header_text{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: #222222;
      }
      .header_input{
        box-sizing: border-box;
        height: 34px;
        width: 290px;
        background-color: #F7F4F5;
        border-radius: 10px;
        display: flex;
        align-items: center;
        overflow: hidden;
        padding-left: 20px;
        font-size: 14px;
        i{
          margin-right: 5px;
        }
        input{
          width: 100%;
          height: 100%;
          border: 0;
          outline: 0;
          background-color: #F7F4F5;
          &::placeholder{
            color: #B3B3B3;
          }
        }
      }
    }
    .banner{
      width: 345px;
      height: 127px;
      margin: 5px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
