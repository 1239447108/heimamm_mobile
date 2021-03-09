<template>
  <div class="company">
    <div class="top">
      <header>
        <div class="header_text">
          公司
        </div>
        <div class="header_input">
          <i class="iconfont iconicon_search"></i>
          <input @keyup.enter='search' v-model='searchValue' placeholder="请输入关键字" type="text">
          <i @click='clearInput' v-show='searchValue' class="clear_icon iconfont iconbtn_share_close"></i>
        </div>
      </header>
      <div class="banner">
        <img src="../../assets/company_banner@2x.png">
      </div>
      <div class="sort">
        <div class="recommend" @click='sortByRecommend' :class="{ active: recommend }">
          推荐
        </div>
        <div class="distance" @click='sortByDistance'>
          距离
          <div class="arrow">
            <i class="iconfont iconicon_xuanze_nor rotate" :class="{ active: distance === 'asc' }"></i>
            <i class="iconfont iconicon_xuanze_nor" :class="{ active: distance === 'desc' }"></i>
          </div>
        </div>
        <div class="score" @click='sortByScore'>
          评分
          <div class="arrow">
            <i class="iconfont iconicon_xuanze_nor rotate" :class="{ active: score === 'asc' }"></i>
            <i class="iconfont iconicon_xuanze_nor" :class="{ active: score === 'desc' }"></i>
          </div>
        </div>
        <div class="fliter">
          筛选
        </div>
      </div>
    </div>
    <!-- 公司列表 -->
    <companyList ref='list' :list='list' @load='getMore' />
  </div>
</template>
<script>
import { getCompanyListApi } from '@/api/company'
import companyList from '@/components/companyList'
export default {
  name: '',
  components: {
    companyList
  },
  props: {},
  data () {
    return {
      searchValue: '',
      list: [],
      recommend: true,
      // asc为距离升序,desc为距离降序
      distance: '',
      // score同理
      score: '',
      total: 0,
      // 起始索引
      start: 0,
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCompanyList()
  },
  mounted () {},
  methods: {
    async getCompanyList (val) {
      const queryObj = {
        q: val,
        limit: 5,
        start: this.start
      }
      if (this.distance) {
        queryObj.distance = this.distance
      }
      if (this.score) {
        queryObj.score = this.score
      }
      try {
        const { data: res } = await getCompanyListApi(queryObj)
        // console.log(res.data)
        this.list = [...this.list, ...res.data.list]
        this.total = res.data.total
        this.$refs.list.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    // 关键词搜索
    async search () {
      const val = this.searchValue.trim()
      if (val.length > 0) {
        this.getCompanyList(val)
      }
    },
    clearInput () {
      this.searchValue = ''
      this.getCompanyList()
    },
    sortByRecommend () {
      this.recommend = true
      this.distance = ''
      this.score = ''
      this.getCompanyList()
    },
    sortByDistance () {
      this.distance = this.distance !== 'asc' ? 'asc' : 'desc'
      this.recommend = false
      this.getCompanyList()
    },
    sortByScore () {
      this.score = this.score !== 'asc' ? 'asc' : 'desc'
      this.recommend = false
      this.getCompanyList()
    },
    getMore () {
      if (this.start + 5 > this.total) {
        this.$refs.list.finished = true
        return
      } else {
        this.start += 5
      }
      this.getCompanyList()
    }
  }
}
</script>
<style scoped lang='less'>
  .company{
    margin-bottom: 40px;
    .top{
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 999;
      background-color: #fff;
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
          .clear_icon{
            margin-right: 15px;
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
      .sort{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        font-size: 14px;
        color: #222222;
        font-family: PingFangSC, PingFangSC-Regular;
        .active{
          color: #f00;
        }
        .distance, .score{
          display: flex;
          align-items: center;
          .arrow{
            margin-left: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            i{
              font-size: 16px;
              color: #666;
              height: 8px;
            }
            .active{
              color: #f00;
            }
            // 旋转180度
            .rotate{
              transform: rotate(180deg);
            }
          }
        }
      }
    }

  }
</style>
