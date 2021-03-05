<template>
  <div class="info">
    <back title='我的资料'></back>
    <div class="info_content">
      <van-cell @click='editAvatar' title="头像" class="cell_avatar">
        <template #default>
          <div class="right">
            <van-image
            round
            class="avatar"
            :src="baseUrl + info.avatar"
            />
            <van-icon name="arrow" size='15' />
          </div>
        </template>
      </van-cell>
      <div class="cell_group">
        <van-cell @click='editNickname' title="昵称" is-link :value="info.nickname" />
        <van-cell title="性别" is-link value="男" />
        <van-cell title="地区" is-link value="北京市" />
        <van-cell @click='editIntro' title="个人简介" is-link :value="info.intro ? info.intro : '暂无'" />
      </div>
      <van-button @click='logout' color="#E40137" type="default" block>退出登录</van-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Back from '@/components/back'
import { mapState, mapMutations } from 'vuex'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/storage'

// 全局注册
Vue.use(Dialog)
export default {
  name: '',
  components: {
    Back
  },
  props: {},
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      info: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.info = this.userInfo
  },
  mounted () {},
  methods: {
    ...mapMutations(['setUserInfo']),
    editAvatar () {
      this.$router.push('/editInfo?type=avatar')
    },
    editNickname () {
      this.$router.push('/editInfo?type=nickname')
    },
    editIntro () {
      this.$router.push('/editInfo?type=intro')
    },
    logout () {
      Dialog.confirm({
        title: '退出登录',
        message: '确认要退出登录吗，退出后将无法使用大部分功能!'
      })
        .then(() => {
          removeToken()
          this.setUserInfo(null)
          this.$router.push('/find')
        })
        .catch(() => {
          this.$toast('取消啦，么么哒')
        })
    }
  }
}
</script>
<style scoped lang='less'>
  .info {
    background-color: #F7F4F5;
    height: 800px;
    .info_content{
      padding: 18px;
      .cell_avatar{
        .van-cell__title{
          display: flex;
          align-items: center;
        }
        .right{
          background-color: #fff;
          display: flex;
          align-items: center;
          float: right;
          .avatar{
            width: 40px;
            height: 40px;
          }
        }
      }
      .cell_group{
        margin: 18px 0;
        .van-cell{
          .van-cell__value{
            span{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
</style>
