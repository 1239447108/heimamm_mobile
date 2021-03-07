<template>
  <div class="technic">
    <div class="technic_item" @click='toDetail(item.id)' v-for='item in list' :key='item.id'>
      <div class="item_left">
        <div class="item_title">
          {{ item.title }}
        </div>
        <div class="item_footer">
          <!-- 时间 -->
          <div class="item_time">
            {{ item.created_at | relativeTime }}
          </div>
          <!-- 阅读 -->
          <div class="item_read">
            <i class="iconfont iconicon_liulanliang"></i>
            {{ item.read }}
          </div>
          <!-- 点赞 -->
          <div class="item_star">
            <i @click.stop='star(item.id)' class="iconfont iconbtn_dianzan_small_nor"></i>
            {{ item.star }}
          </div>
        </div>
      </div>
      <div class="item_cover">
        <img :src="baseUrl + item.cover">
      </div>
    </div>
  </div>
</template>
<script>
import { starArticleByIdApi } from '@/api/find'
import eventbus from '@/utils/eventbus'
export default {
  name: '',
  components: {},
  props: {
    list: Array
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    toDetail (id) {
      this.$router.push('/technicDetail/' + id)
    },
    async star (id) {
      const { data: res } = await starArticleByIdApi({ article: id })
      console.log(res)
      if (res.code === 200) {
        this.$toast('操作成功!')
        eventbus.$emit('get-technic-data')
      } else {
        this.$toast('点赞失败!')
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .technic{
    .technic_item{
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left{
        .item_title{
          font-size: 16px;
          color: #181A39;
          height: 46px;
          line-height: 23px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 600;
          // 2行溢出显示省略号
          display: -webkit-box;//对象作为弹性伸缩盒子模型显示
          -webkit-box-orient: vertical;//设置或检索伸缩盒对象的子元素的排列方式
          -webkit-line-clamp: 2;//溢出省略的界限
          overflow:hidden;//设置隐藏溢出元素
        }
        .item_footer{
          display: flex;
          align-items: center;
          font-size: 12px;
          font-family: PingFangSC;
          color: #B4B4BD;
          padding: 5px 0;
          i{
            margin-right: 5px;
          }
          .item_read{
            margin: 0 27px 0 46px;
            display: flex;
            align-items: center;
          }
          .item_star{
            display: flex;
            align-items: center;
          }
        }
      }
      .item_cover{
        margin-left: 15px;
        width: 100px;
        height: 60px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
