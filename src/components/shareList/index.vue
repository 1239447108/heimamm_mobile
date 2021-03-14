<template>
  <div class="share">
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
        <div @click='toShareDetail(item.id)' class="share_item" v-for='item in list' :key='item.id'>
          <div class="share_title" v-html='item.title'>
            <!-- {{ item.title }} -->
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="share_footer">
            <div class="share_footer_user">
              <div class="user_avatar">
                <img :src="baseUrl + item.author.avatar">
              </div>
              <div class="user_nickname">
                {{ item.author.nickname }}
              </div>
            </div>
            <div class="share_footer_right">
              <!-- 时间 -->
              <div class="item_time">
                {{ item.updated_at | relativeTime }}
              </div>
              <!-- 讨论 -->
              <div class="item_comments">
                <i class="iconfont iconicon_pinglunliang"></i>
                {{ item.article_comments }}
              </div>
              <!-- 点赞 -->
              <div class="item_star">
                <i @click.stop='star(item)' class="iconfont iconbtn_dianzan_small_nor" :class='{ active: userInfo && userInfo.starArticles.includes(item.id) }'></i>
                {{ item.star }}
              </div>
            </div>
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
  created () {},
  mounted () {},
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    toShareDetail (id) {
      this.$router.push('/shareDetail/' + id)
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
  .share{
    .share_item{
      padding: 15px;
      margin-top: 20px;
      margin-bottom: 30px;
      .share_title{
        font-size: 16px;
        color: #181A39;
        font-weight: 600;
        font-family: PingFangSC, PingFangSC-Medium;
        // 单行溢出显示省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content{
        margin: 10px 0;
        font-size: 13px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #545671;
        height: 40px;
        line-height: 20px;
        // 2行溢出显示省略号
        display: -webkit-box;//对象作为弹性伸缩盒子模型显示
        -webkit-box-orient: vertical;//设置或检索伸缩盒对象的子元素的排列方式
        -webkit-line-clamp: 2;//溢出省略的界限
        overflow:hidden;//设置隐藏溢出元素
      }
      .share_footer{
        display: flex;
        align-items: center;
        .share_footer_user{
          display: flex;
          align-items: center;
          margin-right: 70px;
          .user_avatar{
            width: 22px;
            height: 22px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 5px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .user_nickname{
            max-width: 40px;
            font-size: 12px;
            color: #545671;
            font-family: PingFangSC, PingFangSC-Regular;
            // 单行溢出显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .share_footer_right{
          display: flex;
          align-items: center;
          font-size: 12px;
          font-family: PingFangSC;
          color: #B4B4BD;
          padding: 5px 0;
          i{
            margin-right: 5px;
          }
          .item_comments{
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
    }
  }
</style>
