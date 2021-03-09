<template>
  <div>
    <back title='面试技巧'></back>
    <div class="search" @click='toTechnicSearch'>
      <i class="iconfont iconicon_search"></i>
      请输入关键字
    </div>
    <findTechnic :list='technicList' />
    <div class="nomore">
      没有更多了
    </div>
  </div>
</template>
<script>
import { getTechnicListApi } from '@/api/find'
import findTechnic from '@/components/findTechnic'
export default {
  name: '',
  components: {
    findTechnic
  },
  props: {},
  data () {
    return {
      technicList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    getTechnicListApi({ limit: 10 })
      .then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          this.technicList = res.data.data.list
        } else {
          this.$toast('获取面试技巧数据失败!')
        }
      })
  },
  mounted () {},
  methods: {
    toTechnicSearch () {
      this.$router.push('/search?type=technic')
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
