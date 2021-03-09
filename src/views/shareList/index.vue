<template>
  <div>
    <back title='面经分享'></back>
    <div class="search" @click='toShareSearch'>
      <i class="iconfont iconicon_search"></i>
      请输入关键字
    </div>
    <findShare :list='shareList' />
    <div class="nomore">
      没有更多了
    </div>
  </div>
</template>
<script>
import { getShareListApi } from '@/api/find'
import findShare from '@/components/findShare'
export default {
  name: '',
  components: {
    findShare
  },
  props: {},
  data () {
    return {
      shareList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    getShareListApi({ limit: 10 })
      .then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.shareList = res.data.data.list
        } else {
          this.$toast('获取面经分享数据失败!')
        }
      })
  },
  mounted () {},
  methods: {
    toShareSearch () {
      this.$router.push('/search?type=share')
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
