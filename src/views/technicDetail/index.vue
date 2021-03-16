<template>
  <van-skeleton title avatar :row="16" :loading="loading">
    <div class="detail">
    <back title=''></back>
    <div class="padding" v-if='detail.title'>
      <div class="detail_title">
        {{ detail.title }}
      </div>
      <div class="detail_header">
        <div class="time">
          {{ detail.created_at.slice(0, 10) }}
        </div>
        <div class="read">
          <i class="iconfont iconicon_liulanliang"></i>
          {{ detail.read }}
        </div>
        <div class="star">
          <i class="iconfont iconbtn_dianzan_small_nor"></i>
          {{ detail.star }}
        </div>
      </div>
      <div class="detail_content" v-html="detail.content">

      </div>
    </div>
    </div>
  </van-skeleton>
</template>
<script>
import { getTechnicDetailApi } from '@/api/find'
import Vue from 'vue'
import { Skeleton } from 'vant'

Vue.use(Skeleton)
export default {
  name: '',
  components: {
  },
  props: {},
  data () {
    return {
      loading: true,
      detail: {}
    }
  },
  computed: {},
  watch: {},
  async created () {
    try {
      const { data: res } = await getTechnicDetailApi(this.$route.params.id)
      // console.log(res)
      this.detail = res.data
      this.loading = false
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style scoped lang='less'>
  .detail{
    .padding{
      padding: 15px;
      .detail_title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        color: #181a39;
      }
      .detail_header{
        margin: 28px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #B4B4BD;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        .read{
          margin-right: -150px;
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
    }
  }
</style>
