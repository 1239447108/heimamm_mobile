<template>
  <div>
    <back title=''></back>
    <div class="padding" v-if='detail.title'>
      <div class="detail_title">
        {{ detail.title }}
      </div>
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
      <div class="detail_content" v-html="detail.content">

      </div>
      <div>
        评论
        <shareComments/>
      </div>
      <div class="footer">
        <div class="input">
          我来补充两句
        </div>
        <div class="tools">
          <!-- 收藏 -->
          <div class="tool">
            <i class="iconfont iconbtn_shoucang_nor"></i>
            323
          </div>
          <!-- 点赞 -->
          <div class="tool">
            <i class="iconfont iconbtn_dianzan_big_nor"></i>
            323
          </div>
          <!-- 分享 -->
          <div class="tool">
            <i class="iconfont iconbtn_share"></i>
            323
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Back from '@/components/back'
import shareComments from '@/components/shareComments'
import { getShareDetailApi } from '@/api/find'
export default {
  name: '',
  components: {
    Back,
    shareComments
  },
  props: {},
  data () {
    return {
      detail: {},
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetail()
  },
  mounted () {},
  methods: {
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
</style>
