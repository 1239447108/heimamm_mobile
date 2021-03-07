<template>
  <div class="chart">
    <back title='市场数据'></back>
    <!-- <header>
      <div class="pick">
        北京
        <i class="iconfont iconicon_xuanze_sel"></i>
      </div>
      <div class="pick">
        产品经理
        <i class="iconfont iconicon_xuanze_sel"></i>
      </div>
    </header> -->
    <van-dropdown-menu>
      <van-dropdown-item v-model='city' title='北京'>
        <div class="search">
          <i class="iconfont iconicon_search"></i>
          请输入关键字
        </div>
        <van-index-bar :index-list="indexList">
          <van-index-anchor index="1">标题1</van-index-anchor>
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="2">标题2</van-index-anchor>
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="3">标题2</van-index-anchor>
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="4">标题2</van-index-anchor>
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </van-index-bar>
      </van-dropdown-item>
      <van-dropdown-item v-model='position' title='前端工程师'>
        <div class="search">
          <i class="iconfont iconicon_search"></i>
          请输入关键字
        </div>
        <van-index-bar :index-list="[]">
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </van-index-bar>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>
<script>
import Back from '@/components/back'
export default {
  name: '',
  components: {
    Back
  },
  props: {},
  data () {
    return {
      city: '北京',
      position: 0,
      cityList: [
        { text: '北京', value: 0 },
        { text: '上海', value: 1 },
        { text: '深圳', value: 2 }
      ],
      positionList: [
        { text: '前端工程师', value: 0 },
        { text: '产品经理', value: 1 },
        { text: '后端工程师', value: 2 }
      ],
      indexList: [1, 2, 3, 4]
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
  .chart{
    // header{
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-around;
    //   padding: 10px;
    //   .pick{
    //     display: flex;
    //     align-items: center;
    //     font-size: 14px;
    //     color: #222222;
    //     i{
    //       margin-left: 3px;
    //     }
    //   }
    // }
    .search{
      width: 345px;
      height: 34px;
      margin: 10px auto;
      background-color: #F7F4F5;
      border-radius: 15px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #B3B3B3;
      justify-content: center;
      i{
        margin-right: 5px;
      }
    }
  }
</style>
