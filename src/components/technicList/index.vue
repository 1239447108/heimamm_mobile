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
            <!-- <i @click.stop='star(item.id)' class="iconfont iconbtn_dianzan_small_nor" :class='{ acvive: isStared(item.behaviors) }'></i> -->
            <i @click.stop='star(item.id)' class="iconfont iconbtn_dianzan_small_nor" :class='{ active: userInfo && userInfo.starArticles.includes(item.id) }'></i>
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
// import eventbus from '@/utils/eventbus'
import { mapState, mapActions } from 'vuex'
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
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    toDetail (id) {
      this.$router.push('/technicDetail/' + id)
    },
    async star (id) {
      try {
        const { data: res } = await starArticleByIdApi({ article: id })
        console.log(res)
        this.$parent.getTechnicData()
        this.getUserInfoByVuex()
      } catch (err) {
        console.log(err)
      }
    }
    // 判断是否被当前用户点赞,将该文章的behavior数组传入即可
    // isStared (arr) {
    //   let res = false
    //   if (arr.length === 0 || !this.userInfo.id) return false
    //   arr.forEach(item => {
    //     if (item.type === 'star' && item.user === this.userInfo.id) {
    //       res = true
    //     }
    //   })
    //   return res
    // }
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
            .active{
              color: #f00;
            }
          }
        }
      }
      .item_cover{
        margin-left: 15px;
        img{
          width: 113px;
          height: 75px;
        }
      }
    }
  }
</style>
