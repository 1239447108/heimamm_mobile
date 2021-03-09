<template>
  <div class='list' v-if='list.length > 0'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我的有底线的~"
      @load="onLoad"
    >
      <div class="item" v-for='(comment, index) in list' :key='index'>
        <div class="header">
          <div class="avatar">
            <img :src="baseUrl + comment.user.avatar">
          </div>
          <div class="text">
            <div class="nickname">
              {{ comment.user.nickname }}
            </div>
            面试岗位:  {{ comment.position }}
          </div>
          <!-- 评分 -->
          <van-rate
            v-model="comment.interviewScore"
            :size="16"
            class="star"
            readonly
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="tags">
          <div class="tag">
            面试官给力
          </div>
          <div class="tag">
            公司环境好
          </div>
        </div>
        <div class="content">
          {{ comment.content }}
        </div>
        <div class="time">
          {{ comment.created_at.slice(0, 10) }}
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
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
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
<style scoped lang='less'>
  .list{
    padding: 15px;
    margin-bottom: 60px;
    .item{
      font-size: 12px;
      color: #B4B4BD;
      margin-bottom: 20px;
      .header{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
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
          margin-left: 10px;
          line-height: 18px;
          .nickname{
            color: #545671;
            margin-bottom: 10px;
          }
        }
        .star{
          margin-left: 80px;
        }
      }
      .tags{
        padding-left: 42px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .tag{
          padding: 5px;
          background-color: #F7F4F5;
          margin-right: 10px;
        }
      }
      .content{
        padding-left: 45px;
        color: #181A39;
        font-size: 16px;
        font-weight: 600;
        line-height: 27px;
        margin-bottom: 10px;
      }
      .time{
        padding-left: 45px;
      }
    }
  }
</style>
