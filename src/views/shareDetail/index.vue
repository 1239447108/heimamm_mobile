<template>
  <div>
    <back title=''></back>
    <div class="padding" v-if='detail.title'>
      <!-- 标题 -->
      <div class="detail_title">
        {{ detail.title }}
      </div>
      <!-- 用户信息 -->
      <div class="detail_header">
        <div class="avatar">
          <img :src="baseUrl + detail.author.avatar" alt="">
        </div>
        <div class="text">
          <div class="nickname">
            {{ detail.author.nickname }}
          </div>
          <div class="time">
            {{ detail.created_at | relativeTime }}
          </div>
        </div>
      </div>
      <!-- 面经分享内容 -->
      <div class="detail_content" v-html="detail.content">

      </div>
      <!-- 评论部分 -->
      <div class="comment">
        <!-- 评论标题 -->
        <van-badge :content="total">
          <div class="comment_title">
            评论
          </div>
        </van-badge>
        <!-- 评论列表 -->
        <shareComments :list='commentList'/>
      </div>
      <!-- 底部工具栏 -->
      <div class="footer">
        <div @click='isCommentInputShow = true' class="input">
          我来补充两句
        </div>
        <div class="tools">
          <!-- 收藏 -->
          <div class="tool">
            <i class="iconfont iconbtn_shoucang_nor"></i>
            {{ detail.collect }}
          </div>
          <!-- 点赞 -->
          <div class="tool">
            <i class="iconfont iconbtn_dianzan_big_nor"></i>
            {{ detail.star }}
          </div>
          <!-- 分享 -->
          <div class="tool">
            <i class="iconfont iconbtn_share"></i>
            {{ detail.share }}
          </div>
        </div>
      </div>
    </div>
    <!-- 评论弹出层 -->
    <van-popup v-model="isCommentInputShow" round position="bottom" :style="{ height: '30%' }" >
      <div class="pop">
        <textarea placeholder="我来补充几句" type="text" />
        <div class="send">发送</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Back from '@/components/back'
import shareComments from '@/components/shareComments'
import { getShareDetailApi, getShareCommentApi } from '@/api/find'
import eventbus from '@/utils/eventbus'
export default {
  name: '',
  components: {
    Back,
    shareComments
  },
  props: {},
  data () {
    return {
      // 文章详情信息
      detail: {},
      baseUrl: process.env.VUE_APP_BASEURL,
      // 评论列表
      commentList: [],
      isCommentInputShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    eventbus.$on('get-comment-data', () => {
      this.getComment()
    })
    this.getDetail()
    this.getComment()
  },
  mounted () {},
  methods: {
    // 获取评论列表
    async getComment () {
      try {
        const { data: res } = await getShareCommentApi(this.$route.params.id)
        // console.log(res)
        this.commentList = res.data.list
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 获取面经分享详情
    async getDetail () {
      try {
        const { data: res } = await getShareDetailApi(this.$route.params.id)
        // console.log(res)
        this.detail = res.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .padding{
      padding: 15px;
      margin-bottom: 85px;
      .detail_title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        color: #181a39;
      }
      .detail_header{
        display: flex;
        align-items: center;
        margin-top: 15px;
        .avatar{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .text{
          line-height: 17px;
          font-size: 12px;
          margin-left: 15px;
          .nickname{
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            color: #545671;
          }
          .time{
            font-family: PingFangSC, PingFangSC-Regular;
            color: #b4b4bd;
          }
        }
      }
      .detail_content{
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        text-align: justify;
        color: #181a39;
        line-height: 27px;
        /deep/ img{
          max-width: 345px !important;
        }
      }
      .comment{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #222222;
        line-height: 25px;
        span{
          margin-top: -15px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          color: #b4b4bd;
          line-height: 17px;
        }
      }
      .footer{
        height: 85px;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        color: #b4b4bd;
        padding: 15px;
        box-sizing: border-box;
        box-shadow: 0px -3px 4px 0px rgba(24,26,57,0.04);
        z-index: 999;
        background-color: #fff;;
        .input{
          width: 189px;
          height: 34px;
          line-height: 34px;
          padding-left: 9px;
          background: #f7f4f5;
          border-radius: 6px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
        }
        .tools{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-left: 20px;
          .tool{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            margin-right: 16px;
            &:last-child{
              margin-right: 0;
            }
            i{
              font-size: 32px;
            }
          }
        }
      }
      .pop{
        textarea{
          resize: none;
          background: #f7f4f5;
          border-radius: 4px;
          font-size: 14px;
        }
        .send{
          width: 33px;
          height: 23px;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #b4b4bd;
        }
      }
    }
</style>
