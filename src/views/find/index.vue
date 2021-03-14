<template>
  <div class="find">
    <div class="find_title">发现</div>
    <!-- 面试技巧 -->
    <van-cell @click='toTechnic' title="面试技巧" is-link value="查看更多" />
    <technicList :list='technicList' ref='technicList' />
    <!-- 市场数据 -->
    <van-cell @click='toChart' title="市场数据" is-link value="查看更多" />
    <Data ref='data' :data='dataObj' />
    <!-- 面经分享 -->
    <van-cell @click='toShare' title="面经分享" is-link value="查看更多" />
    <shareList :list='shareList' ref='shareList' />
  </div>
</template>
<script>
import technicList from '@/components/technicList'
import shareList from '@/components/shareList'
import Data from '@/components/data'
import { getTechnicListApi, getShareListApi } from '@/api/find'
import { getHotDataApi } from '@/api/data'

export default {
  name: 'find',
  components: {
    technicList,
    shareList,
    Data
  },
  props: {},
  data () {
    return {
      // 面试技巧列表
      technicList: [],
      // 市场数据
      dataObj: {},
      // 面经分享列表
      shareList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getTechnicData()
    this.getShareData()
    this.getHotData()
  },
  mounted () {},
  methods: {
    toTechnic () {
      this.$router.push('/technic')
    },
    toChart () {
      this.$router.push('/chart')
    },
    toShare () {
      this.$router.push('/share')
    },
    // 获取面试技巧数据
    getTechnicData () {
      getTechnicListApi({ limit: 3 })
        .then(res => {
          // console.log(res.data)
          this.technicList = res.data.data.list
          this.$refs.technicList.finished = true
          this.$refs.technicList.disabled = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取面经分享数据
    getShareData () {
      getShareListApi({ limit: 3 })
        .then(res => {
          // console.log(res.data)
          this.shareList = res.data.data.list
          this.$refs.shareList.finished = true
          this.$refs.shareList.disabled = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取市场数据
    getHotData () {
      getHotDataApi()
        .then(res => {
          // console.log(res.data)
          this.dataObj = res.data.data
          this.$refs.data.dataArr = res.data.data.yearSalary.reverse()
          this.$refs.data.yearArr = this.$refs.data.dataArr.slice(0, 5)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped lang='less'>
  .find{
    padding-bottom: 55px;
    .find_title{
      text-align: center;
      height: 40px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222;
      line-height: 40px;
    }
    /deep/ .van-cell__title{
      span{
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
</style>
