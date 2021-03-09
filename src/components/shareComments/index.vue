<template>
  <div class="comments">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我的有底线的~"
      @load="onLoad"
    >
      <div class="comment_item" v-for='item in list' :key='item.id'>
        <!-- 顶部 -->
        <div class="item_header">
          <div class="header_left">
            <div class="avatar">
              <img :src="baseUrl + item.author.avatar">
            </div>
            <div class="text">
              <div class="nickname">
                {{ item.author.nickname }}
              </div>
              <div class="time">
                {{ item.created_at | relativeTime }}
              </div>
            </div>
          </div>
          <div class="header_right">
            {{ item.star }}
            <i @click='star(item.id)' class="iconfont iconbtn_dianzan_big_nor"></i>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="item_content">
          {{ item.content }}
        </div>
        <!-- 评论回复 -->
        <div class="item_reply" v-if='item.children_comments.length > 0'>
          <div class="reply" v-for='reply in item.children_comments' :key='reply.id'>
            <span class="reply_nickname">
              {{ reply.author }}:
            </span>
            {{ reply.content }}
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { starCommentByIdApi } from '@/api/find'
import eventbus from '@/utils/eventbus'
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
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async star (id) {
      try {
        const { data: res } = await starCommentByIdApi({ id })
        // console.log(res)
        if (res.code === 200) {
          this.$toast('操作成功!')
          eventbus.$emit('get-comment-data')
        }
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
<style scoped lang='less'>
  .comments{
    .comment_item{
      .item_header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #b4b4bd;
        .header_left{
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
            margin-left: 15px;
            .nickname{
              font-family: PingFangSC, PingFangSC-Semibold;
              font-weight: 600;
              color: #545671;
              margin-bottom: 5px;
            }
            .time{
              font-family: PingFangSC, PingFangSC-Regular;
            }
          }
        }
        .header_right{
          display: flex;
          align-items: center;
          i{
            font-size: 28px;
            margin-left: 5px;
          }
        }
      }
      .item_content{
        padding: 10px 50px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        color: #181a39;
        line-height: 27px;
      }
      .item_reply{
        width: 250px;
        margin-left: 50px;
        background: #f7f4f5;
        border-radius: 4px;
        padding: 18px 15px;
        font-size: 14px;
        line-height: 20px;
        color: #545671;
        .reply{
          margin-top: 10px;
          overflow: hidden;
          .reply_nickname{
            font-weight: 600;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
