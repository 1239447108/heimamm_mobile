<template>
  <div class="find">
    <div class="find_title">发现</div>
    <!-- 面试技巧 -->
    <div class="find_skill">
      <van-cell @click='toTechnicList' title="面试技巧" is-link value="查看更多" />
      <findTechnic :list='technicList' />
    </div>
    <!-- 市场数据 -->
    <div class="find_data">
      <van-cell @click='toChart' title="市场数据" is-link value="查看更多" />
      <findData :data='dataObj' />
    </div>
    <!-- 面经分享 -->
    <div class="find_share">
      <van-cell @click='toShare' title="面经分享" is-link value="查看更多" />
      <findShare :list='shareList' />
    </div>
  </div>
</template>
<script>
import findTechnic from '@/components/findTechnic'
import findShare from '@/components/findShare'
import findData from '@/components/findData'
import { getTechnicListApi, getShareListApi, getHotDataApi } from '@/api/find'
import eventbus from '@/utils/eventbus'

export default {
  components: {
    findTechnic,
    findShare,
    findData
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
    eventbus.$on('get-technic-data', () => {
      this.getTechnicData()
    })
    eventbus.$on('get-share-data', () => {
      this.getShareData()
    })
    this.getTechnicData()
    this.getShareData()
    this.getHotData()
  },
  mounted () {},
  methods: {
    toTechnicList () {
      this.$router.push('/technicList')
    },
    toChart () {
      this.$router.push('/chart')
    },
    toShare () {
      this.$router.push('/shareList')
    },
    // 获取面试技巧数据
    getTechnicData () {
      getTechnicListApi({ limit: 3 })
        .then(res => {
          // console.log(res.data)
          this.technicList = res.data.data.list
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
    margin-bottom: 40px;
    .find_title{
      text-align: center;
      height: 40px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222;
      line-height: 40px;
    }
  }
</style>
