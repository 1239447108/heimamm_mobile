<template>
  <div>
    <back title='面经分享'></back>
    <div class="search" @click='toShareSearch'>
      <i class="iconfont iconicon_search"></i>
      请输入关键字
    </div>
    <shareList :list='shareList' ref='list' @load='getMore' @refresh='refresh' />
  </div>
</template>
<script>
import { getShareListApi } from '@/api/find'
import shareList from '@/components/shareList'
export default {
  name: '',
  components: {
    shareList
  },
  props: {},
  data () {
    return {
      shareList: [],
      total: 0,
      // 起始索引
      start: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getShareList()
  },
  mounted () {},
  methods: {
    async getShareList () {
      try {
        const { data: res } = await getShareListApi({ start: this.start })
        // console.log(res)
        this.shareList = [...this.shareList, ...res.data.list]
        this.total = res.data.total
        this.$refs.list.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    toShareSearch () {
      this.$router.push('/search?type=share')
    },
    // 上拉请求更多数据
    getMore () {
      if (this.shareList.length >= this.total) {
        this.$refs.list.finished = true
        return
      }
      this.start += 5
      this.getShareList()
    },
    // 下拉刷新
    refresh () {
      this.shareList = []
      this.start = 0
      this.getShareList()
      this.$refs.list.finished = false
      this.$refs.list.isLoading = false
    }
  }
}
</script>
<style scoped lang='less'>
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
  .nomore{
    font-size: 14px;
    color: #B3B3B3;
    text-align: center;
  }
</style>
