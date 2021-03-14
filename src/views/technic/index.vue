<template>
  <div>
    <back title='面试技巧'></back>
    <div class="search" @click='toTechnicSearch'>
      <i class="iconfont iconicon_search"></i>
      请输入关键字
    </div>
    <technicList :list='technicList' ref='list' @load='getMore' @refresh='refresh' />
  </div>
</template>
<script>
import { getTechnicListApi } from '@/api/find'
import technicList from '@/components/technicList'
export default {
  name: '',
  components: {
    technicList
  },
  props: {},
  data () {
    return {
      technicList: [],
      total: 0,
      // 起始索引
      start: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getTechnicList()
  },
  mounted () {},
  methods: {
    async getTechnicList () {
      try {
        const { data: res } = await getTechnicListApi({ start: this.start })
        // console.log(res)
        this.technicList = [...this.technicList, ...res.data.list]
        this.total = res.data.total
        this.$refs.list.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    toTechnicSearch () {
      this.$router.push('/search?type=technic')
    },
    // 上拉请求更多数据
    getMore () {
      if (this.technicList.length >= this.total) {
        this.$refs.list.finished = true
        return
      }
      this.start += 5
      this.getTechnicList()
    },
    // 下拉刷新
    refresh () {
      this.technicList = []
      this.start = 0
      this.getTechnicList()
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
    margin: 15px 0;
  }
</style>
