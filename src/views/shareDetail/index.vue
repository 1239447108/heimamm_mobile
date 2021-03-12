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
        <shareComments @load='getMore' @reply='reply' ref='list' :list='commentList'/>
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
          <div class="tool" @click='isShareDialogShow = true'>
            <i class="iconfont iconbtn_share"></i>
            {{ detail.share }}
          </div>
        </div>
      </div>
    </div>
    <!-- 评论弹出层 -->
    <van-popup @close='popClose' v-model="isCommentInputShow" round position="bottom" :style="{ height: '30%' }" >
      <div class="pop">
        <textarea v-model='commentVal' :placeholder="placeHolderText" type="text" />
        <div @click='sendComment' class="send">发送</div>
      </div>
    </van-popup>
    <!-- 分享弹出层 -->
    <van-dialog v-model="isShareDialogShow" title="分享" show-cancel-button>
      <img :style='{width: "100%", height: "100%"}' src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
  </div>
</template>
<script>
import shareComments from '@/components/shareComments'
import { getShareDetailApi, getShareCommentApi, sendCommentByIdApi } from '@/api/find'
import eventbus from '@/utils/eventbus'
export default {
  name: '',
  components: {
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
      isCommentInputShow: false,
      isShareDialogShow: false,
      start: 0,
      total: 0,
      // 输入的评论值
      commentVal: '',
      placeHolderText: '我来补充两句',
      // 要回复评论的id
      replyId: ''
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
        const { data: res } = await getShareCommentApi(this.$route.params.id, { start: this.start })
        // console.log(res)
        this.commentList = [...this.commentList, ...res.data.list]
        this.total = res.data.total
        if (this.$refs.list) {
          this.$refs.list.loading = false
        }
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
    },
    // 加载更多评论
    getMore () {
      if (this.start + 5 > this.total) {
        this.$refs.list.finished = true
        return
      } else {
        this.start += 5
      }
      this.getComment()
    },
    // 发布评论
    async sendComment () {
      const val = this.commentVal.trim()
      const queryObj = {
        article: this.$route.params.id,
        content: val
      }
      if (this.replyId) {
        queryObj.parent = this.replyId
      }
      if (val.length > 0) {
        try {
          const { data: res } = await sendCommentByIdApi(queryObj)
          console.log(res)
          this.$toast('发布成功!')
          this.isCommentInputShow = false
          // 刷新数据
          this.start = 0
          const { data: res2 } = await getShareCommentApi(this.$route.params.id, { start: this.start })
          // console.log(res2)
          this.commentList = res2.data.list
          this.total = res2.data.total
        } catch (err) {
          console.log(err)
        }
      }
    },
    // 回复评论
    reply (obj) {
      const { id, name } = obj
      this.replyId = id
      this.placeHolderText = `回复 ${name}:`
      this.isCommentInputShow = true
    },
    // 监听弹出层的关闭事件
    popClose () {
      this.commentVal = ''
      this.replyId = ''
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
    }
    .pop{
      padding: 25px 15px;
      textarea{
        border:0;
        width: 310px;
        height: 110px;
        padding: 10px 14px;
        resize: none;
        background-color: #f7f4f5;
        border-radius: 4px;
        font-size: 14px;
      }
      .send{
        float: right;
        margin-top: 10px;
        width: 40px;
        height: 23px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #b4b4bd;
      }
    }
</style>
