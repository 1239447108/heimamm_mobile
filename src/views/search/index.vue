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
        <span>
          清空
        </span>
      </div>
      <div class="search_items">
        <span class="search_tag" >
          设计师面试
        </span>
        <span class="search_tag" >
          前端面试
        </span>
        <span class="search_tag" >
          后端面试
        </span>
        <span class="search_tag" >
          运营面试
        </span>
      </div>
    </div>
    <!-- 面试技巧列表 -->
    <findTechnic :list='technicList' v-if='type === "technic"'/>
    <!-- 面经分享列表 -->
    <findShare :list='shareList' v-if='type === "share"'/>
  </div>
</template>
<script>
import Back from '@/components/back'
import { getShareListApi, getTechnicListApi, getTechnicTopApi, getShareTopApi } from '@/api/find'
import findShare from '@/components/findShare'
import findTechnic from '@/components/findTechnic'
export default {
  name: '',
  components: {
    Back,
    findShare,
    findTechnic
  },
  props: {},
  data () {
    return {
      // 搜索的类型technic为面试技巧，share为面经分享
      type: '',
      searchValue: '',
      technicList: [],
      shareList: [],
      topList: []
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
        console.log(res)
        this.topList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 获取面经分享热搜
    async getShareTopData () {
      try {
        const { data: res } = await getShareTopApi()
        console.log(res)
        this.topList = res.data
      } catch (err) {
        console.log(err)
      }
    },
    clickTopItem (item) {
      this.searchValue = item
      this.search()
    },
    async search () {
      const val = this.searchValue.trim()
      if (val.length > 0) {
        // 面试技巧搜索
        if (this.type === 'technic') {
          try {
            const { data: res } = await getTechnicListApi({ q: val, limit: 10 })
            // console.log(res)
            if (res.data.list.length > 0) {
              this.technicList = res.data.list
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
              this.shareList = res.data.list
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
