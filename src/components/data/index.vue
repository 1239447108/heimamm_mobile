<template>
  <div class="data">
    <div class="tags" v-if="data.city">
      <span class="data_tag" >
        {{ data.city }}
      </span>
      <span class="data_tag">
        {{ data.position }}
      </span>
    </div>
    <span v-else class="data_tag">
      暂无数据
    </span>
    <!-- 每年工资统计 -->
    <div class='years'>
      <div class="year" v-for='item in yearArr' :key='item.year'>
        <div class="text">
          {{ item.year }}
        </div>
        <div class="center">
          <div class="red" :style='{ width: getPercent(item.salary) }'>
            ￥{{ item.salary }}
          </div>
        </div>
        <div class="right" v-if='item.percent'>
          <i v-if='item.percent < 0' class="iconfont iconicon_xiajiang down"></i>
          <i v-else class="iconfont iconicon_shangsheng up"></i>
          {{ item.percent }}%
        </div>
        <div class="right" v-else></div>
      </div>
    </div>
    <!-- 展开更多 -->
      <div class="showMore" @click='showMore'>
        {{ showMoreText }}
        <van-icon v-show='hideData' name="arrow-down" />
        <van-icon v-show='!hideData' name="arrow-up" />
      </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    data: Object
  },
  data () {
    return {
      showMoreText: '展开更多',
      hideData: true,
      dataArr: [],
      yearArr: []
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    showMore () {
      this.hideData = !this.hideData
      this.yearArr = this.hideData ? this.dataArr.slice(0, 5) : this.dataArr
      this.showMoreText = this.hideData ? '展开更多' : '收起'
    },
    getPercent (salary) {
      return (parseInt(salary) / this.data.topSalary * 100) + '%'
    }
  }
}
</script>
<style scoped lang='less'>
  .data{
    padding: 15px;
    .tags{
      margin-bottom: 20px;
      .data_tag{
        padding: 5px;
        background-color: #ECEAEA;
        font-size: 14px;
        text-align: center;
        color: #545671;
        font-family: PingFangSC, PingFangSC-Regular;
        border-radius: 5px;
        margin: 10px;
      }
    }
    .years{
      padding: 5px;
      .year{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #545671;
        margin-bottom: 10px;
        .text{
          width: 80px;
          margin-right: 5px;
        }
        .center{
          flex: 1;
          background-color: #EBDFDF;
          border-radius: 5px;
          overflow: hidden;
          .red{
            background-color: #FE6D67;
            border-radius: 5px;
            color: #fff;
            text-align: right;
            font-size: 10px;
            padding-right: 5px;
          }
        }
        .right{
          margin-left: 20px;
          width: 60px;
          display: flex;
          align-items: center;
          i{
            margin-right: 5px;
          }
          .down{
            color: #ff625c;
          }
          .up{
            color: #00d782;
          }
        }
      }
    }
    .showMore{
        padding: 15px;
        font-size: 14px;
        color: #545671;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  }
</style>
