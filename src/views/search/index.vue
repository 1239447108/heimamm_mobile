<template>
  <div class="search">
    <back :title='type === "technic" ? "面试技巧" : "面经分享" '></back>
    <!-- 输入框 -->
    <div class="header_input">
      <i class="iconfont iconicon_search"></i>
      <input v-model='searchValue' @keyup.enter="search" placeholder="请输入关键字" type="text">
      <i @click='clearInput' v-show='searchValue' class="clear_icon iconfont iconbtn_share_close"></i>
    </div>
    <!-- 热搜 -->
    <div v-show='technicList.length ===0 && shareList.length === 0' class="search_content">
      <div class="search_text">
        大家都在搜
      </div>
      <div class="search_items">
        <span class="search_tag" @click='clickTopItem(item)' v-for='item in topList' :key='item' >
          {{ item }}
        </span>
      </div>
    </div>
    <!-- 历史 -->
    <div v-show='technicList.length ===0 && shareList.length === 0' class="search_content">
      <div class="search_text">
        历史搜索
        <span @click='clearHistory'>
          清空
        </span>
      </div>
      <div class="search_items">
        <span class="search_tag" v-for='tag in historyList' :key='tag'>
          {{ tag }}
        </span>
      </div>
    </div>
    <!-- 面试技巧列表 -->
    <technicList :list='technicList' v-if='type === "technic"' ref='technic' />
    <!-- 面经分享列表 -->
    <shareList :list='shareList' v-if='type === "share"' ref='share' />
  </div>
</template>
<script>
import { getShareListApi, getTechnicListApi, getTechnicTopApi, getShareTopApi } from '@/api/find'
import shareList from '@/components/shareList'
import technicList from '@/components/technicList'
export default {
  name: '',
  components: {
    shareList,
    technicList
  },
  props: {},
  data () {
    return {
      // 搜索的类型technic为面试技巧，share为面经分享
      type: '',
      searchValue: '',
      technicList: [],
      shareList: [],
      topList: [],
      historyList: [],
      start: 0,
      total: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log(this.$route.query.type)
    this.type = this.$route.query.type
    if (this.type === 'technic') {
      this.getTechnicTopData()
    } else {
      this.getShareTopData()
    }
  },
  mounted () {},
  methods: {
    clearInput () {
      this.searchValue = ''
      this.technicList = []
      this.shareList = []
    },
    // 获取面试技巧热搜
    async getTechnicTopData () {
      try {
        const { data: res } = await getTechnicTopApi()
        // console.log(res)
        this.topList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取面经分享热搜
    async getShareTopData () {
      try {
        const { data: res } = await getShareTopApi()
        // console.log(res)
        this.topList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    clickTopItem (item) {
      this.searchValue = item
      this.search()
    },
    handleHistory (val) {
      // 历史搜索的长度小于8
      if (this.historyList.length < 8) {
        if (!this.historyList.includes(val)) {
          this.historyList.push(val)
        }
      } else {
        // 长度大于8则去掉前一个，再加上新的
        this.historyList.shift()
        this.historyList.push(val)
      }
    },
    clearHistory () {
      this.historyList = []
    },
    async search () {
      const val = this.searchValue.trim()
      if (val.length > 0) {
        // 面试技巧搜索
        if (this.type === 'technic') {
          this.handleHistory(val)
          try {
            const { data: res } = await getTechnicListApi({ q: val, limit: 10 })
            // console.log(res)
            if (res.data.list.length > 0) {
              // 搜索关键词标红
              res.data.list.forEach(item => {
                const str = `<span style='color: red'>${val}</span>`
                // const reg = new RegExp('^' + val + '$', 'g')
                // item.title = item.title.replace(reg, str)
                item.title = item.title.replace(val, str)
              })
              this.technicList = [...this.technicList, ...res.data.list]
              this.total = res.data.total
              this.$refs.technic.finished = true
              this.$refs.technic.disabled = true
            } else {
              this.$toast('暂无数据')
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          // 面经分享搜索
          try {
            const { data: res } = await getShareListApi({ q: val, limit: 10 })
            // console.log(res)
            if (res.data.list.length > 0) {
              // 搜索关键词标红
              res.data.list.forEach(item => {
                const str = `<span style='color: red'>${val}</span>`
                // const reg = new RegExp('^' + val + '$', 'g')
                // item.title = item.title.replace(reg, str)
                item.title = item.title.replace(val, str)
              })
              this.shareList = [...this.shareList, ...res.data.list]
              this.total = res.data.total
              this.$refs.share.finished = true
              this.$refs.share.disabled = true
            } else {
              this.$toast('暂无数据')
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .search{
    .header_input{
      box-sizing: border-box;
      height: 34px;
      width: 345px;
      margin: 0 auto;
      background-color: #F7F4F5;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    .search_content{
      padding: 15px;
      .search_text{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        color: #222222;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          color: #545671;
          font-size: 12px;
        }
      }
      .search_items{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .search_tag{
          padding: 5px 10px;
          background-color: #ECEAEA;
          font-size: 14px;
          text-align: center;
          color: #545671;
          font-family: PingFangSC, PingFangSC-Regular;
          border-radius: 5px;
          margin: 10px;
        }
      }
    }
  }
</style>
