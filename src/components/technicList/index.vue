<template>
  <div class="technic">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled='disabled'>
      <van-list
        v-show='list.length > 0'
        v-model="loading"
        :finished="finished"
        :immediate-check='false'
        offset='0'
        finished-text="到底了啦~"
        @load="onLoad"
      >
        <div class="technic_item" @click='toDetail(item.id)' v-for='item in list' :key='item.id'>
          <div class="item_left">
            <div class="item_title" v-html='item.title'>
              <!-- {{ item.title }} -->
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
                <i @click.stop='star(item)' class="iconfont iconbtn_dianzan_small_nor" :class='{ active: userInfo && userInfo.starArticles.includes(item.id) }'></i>
                {{ item.star }}
              </div>
            </div>
          </div>
          <div class="item_cover">
            <img :src="baseUrl + item.cover">
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { starArticleByIdApi } from '@/api/find'
import { mapState, mapActions } from 'vuex'
export default {
  name: '',
  components: {},
  props: {
    list: Array
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      loading: false,
      finished: false,
      isLoading: false,
      disabled: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
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
    async star (item) {
      if (!this.isLogin) {
        this.$toast.fail('您还没有登录哦~')
        this.$router.push('/login?redirect=' + this.$route.path)
        return
      }
      try {
        const { data: res } = await starArticleByIdApi({ article: item.id })
        // console.log(res)
        if (res.data.num === 0) {
          item.star -= 1
        } else {
          item.star += 1
        }
        this.getUserInfoByVuex()
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.$emit('load')
    },
    onRefresh () {
      this.$emit('refresh')
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
      margin-top: 20px;
      margin-bottom: 30px;
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
