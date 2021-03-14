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
      <div class="banner" v-show='!isSortPopShow'>
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
        <div @click='isSortPopShow = true' class="fliter" :class="{ active: isSortPopShow }">
          筛选
        </div>
      </div>
      <!-- 筛选下拉框 -->
      <van-popup v-model="isSortPopShow" position="top" class='sort_pop' >
        <div class="item">
          <div class="title">
            距离
          </div>
          <div class="options">
            <div class="option" @click='distance = "desc"' :class="{ active: distance === 'desc' }">
              由远及近
            </div>
            <div class="option" @click='distance = "asc"' :class="{ active: distance === 'asc' }">
              由近及远
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title">
            评分
          </div>
          <div class="options">
            <div class="option" @click='scoreRange = "4-5"' :class="{ active: scoreRange === '4-5' }">
              4分-5分
            </div>
            <div class="option" @click='scoreRange = "3-3.9"' :class="{ active: scoreRange === '3-3.9' }">
              3分-3.9分
            </div>
          </div>
          <div class="options">
            <div class="option" @click='scoreRange = "2-2.9"' :class="{ active: scoreRange === '2-2.9' }">
              2分-2.9分
            </div>
            <div class="option" @click='scoreRange = "1-1.9"' :class="{ active: scoreRange === '1-1.9' }">
              1分-1.9分
            </div>
          </div>
          <div class="options">
            <div class="option" @click='scoreRange = "1"' :class="{ active: scoreRange === '1' }">
              1分以下
            </div>
          </div>
        </div>
        <div class="btns">
          <div @click='clearSortOptions' class="clear">
            清除
          </div>
          <div @click='confirm' class="confirm">
            确认
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 公司列表 -->
    <companyList ref='list' :list='list' @load='getMore' @refresh='refresh' />
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
      // asc为评分升序,desc为评分降序
      score: '',
      total: 0,
      // 起始索引
      start: 0,
      isSortPopShow: false,
      // 评分区间
      scoreRange: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCompanyList()
  },
  mounted () {},
  methods: {
    async getCompanyList () {
      const queryObj = {
        start: this.start,
        q: this.searchValue.trim(),
        scoreRange: this.scoreRange
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
    search () {
      const val = this.searchValue.trim()
      if (val.length > 0) {
        this.getSearchData(val)
      }
    },
    // 点击清除按钮，清空关键词并请求数据
    clearInput () {
      this.searchValue = ''
      this.getSearchData('')
    },
    // 通过推荐排序
    sortByRecommend () {
      this.recommend = true
      this.distance = ''
      this.score = ''
      this.getSearchData()
    },
    // 通过距离排序
    sortByDistance () {
      this.distance = this.distance !== 'asc' ? 'asc' : 'desc'
      this.recommend = false
      this.getSearchData()
    },
    // 通过评分排序
    sortByScore () {
      this.score = this.score !== 'asc' ? 'asc' : 'desc'
      this.recommend = false
      this.getSearchData()
    },
    // 上拉请求更多数据
    getMore () {
      if (this.list.length >= this.total) {
        this.$refs.list.finished = true
        return
      }
      this.start += 5
      this.getCompanyList()
    },
    // 下拉刷新
    refresh () {
      this.list = []
      this.start = 0
      this.getCompanyList()
      this.$refs.list.finished = false
      this.$refs.list.isLoading = false
    },
    // 通过条件搜索
    async getSearchData (val) {
      this.start = 0
      this.$refs.list.finished = false
      this.$refs.list.loading = false
      const queryObj = {
        q: val,
        start: this.start,
        scoreRange: this.scoreRange
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
        this.list = res.data.list
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 清除搜索条件
    clearSortOptions () {
      this.recommend = true
      this.distance = ''
      this.score = ''
      this.scoreRange = ''
    },
    // 点击确认
    confirm () {
      this.getSearchData()
      this.isSortPopShow = false
    }
  }
}
</script>
<style scoped lang='less'>
  .company{
    margin-bottom: 50px;
    .top{
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 999;
      background-color: #fff;
      header{
        position: relative;
        z-index: 9999;
        background-color: #fff;
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
        position: relative;
        z-index: 9999;
        background-color: #fff;
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
      .sort_pop{
        width: 100%;
        height: 440px;
        margin-top: 104px;
        .item{
          padding: 10px;
          .title{
            font-size: 18px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            color: #222222;
            margin-bottom: 10px;
          }
          .options{
            display: flex;
            // flex-wrap: wrap;
            justify-content: space-around;
            .option{
              box-sizing: border-box;
              width: 167px;
              flex-shrink: 0;
              margin: 11px;
              padding: 12px 50px;
              font-size: 12px;
              color: #181A39;
              background-color: #F9F8F8;
              border: 1px solid #666;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .option.active{
              background-color: #FFE2E9;
              border: 1px solid #e40137;
              color: #E40137;
            }
          }
        }
        .btns{
          padding: 15px 15px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: PingFangSC, PingFangSC-Regular;
          font-size: 16px;
          .clear{
            box-sizing: border-box;
            width: 125px;
            height: 50px;
            padding: 14px 46px;
            background: #ffe2e9;
            border-radius: 7px;
            color: #E40137;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .confirm{
            box-sizing: border-box;
            width: 210px;
            height: 50px;
            padding: 14px 89px;
            background: #e40137;
            border-radius: 7px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      /deep/ .van-overlay{
        top: 479px;
      }
    }

  }
</style>
