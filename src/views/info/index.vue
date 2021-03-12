<template>
  <div class="info">
    <back title='我的资料'></back>
    <div class="info_content" v-if='userInfo'>
      <van-cell @click='editInfo("avatar")' title="头像" class="cell_avatar">
        <template #default>
          <div class="right">
            <van-image
            round
            class="avatar"
            :src="baseUrl + userInfo.avatar"
            />
            <van-icon name="arrow" size='15' />
          </div>
        </template>
      </van-cell>
      <div class="cell_group">
        <van-cell @click='editInfo("nickname")' title="昵称" is-link :value="userInfo.nickname" />
        <van-cell @click='isSexShow = true' title="性别" is-link :value="userInfo.gender === 0 ? '未知' : userInfo.gender === 1 ? '男' : '女'" />
        <van-cell @click='isAreaShow = true' title="地区" is-link :value="areaList.city_list[userInfo.area]" />
        <van-cell @click='editInfo("intro")' title="个人简介" is-link :value="userInfo.intro ? userInfo.intro : '暂无'" />
      </div>
      <van-button @click='logout' color="#E40137" type="default" block>退出登录</van-button>
    </div>
    <!-- 性别选择器 -->
    <van-action-sheet v-model="isSexShow" v-if='userInfo'>
      <van-picker
        title="选择性别"
        show-toolbar
        ref='sexPicker'
        :default-index="userInfo.gender"
        @confirm="changeSex"
        @cancel="isSexShow = false"
        :columns="sexOptions"
      />
    </van-action-sheet>
    <!-- 地区选择器 -->
    <van-action-sheet v-model="isAreaShow" v-if='userInfo'>
      <van-area
        title="选择地区"
        :area-list="areaList"
        :columns-num="2"
        :value='userInfo.area'
        @confirm="changeArea"
        @cancel="isAreaShow = false"
      />
    </van-action-sheet>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/storage'
import { editUserInfoApi } from '@/api/user'
import areaList from '@/utils/area.js'

// 全局注册
Vue.use(Dialog)
export default {
  name: '',
  components: {
  },
  props: {},
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      isSexShow: false,
      sexOptions: [
        {
          text: '未知',
          values: 0
        },
        {
          text: '男',
          values: 1
        },
        {
          text: '女',
          values: 2
        }
      ],
      isAreaShow: false,
      areaList: {}
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.areaList = areaList
  },
  mounted () {
  },
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    ...mapMutations(['setUserInfo', 'setIsLogin']),
    // type avatar为头像, nickname为昵称, intro为简介
    editInfo (type) {
      this.$router.push('/editInfo?type=' + type)
    },
    // 退出登录
    logout () {
      Dialog.confirm({
        title: '退出登录',
        message: '确认要退出登录吗，退出后将无法使用大部分功能!'
      })
        .then(() => {
          // 清除缓存
          removeToken('hm_m_token')
          this.setUserInfo(null)
          this.setIsLogin(false)
          this.$router.push('/find')
        })
        .catch(() => {
          this.$toast('取消啦，么么哒')
        })
    },
    async changeSex () {
      const { data: res } = await editUserInfoApi({ gender: this.$refs.sexPicker.getIndexes() })
      // console.log(res)
      if (res.code === 200) {
        this.$toast('修改成功!')
        this.isSexShow = false
        // 刷新数据
        this.getUserInfoByVuex()
      } else {
        this.$toast('修改失败!  ')
      }
    },
    async changeArea (arr) {
      // console.log(arr)
      const { data: res } = await editUserInfoApi({ area: arr[1].code })
      // console.log(res)
      if (res.code === 200) {
        this.$toast('修改成功!')
        this.isAreaShow = false
        // 刷新数据
        this.getUserInfoByVuex()
      } else {
        this.$toast('修改失败!  ')
      }
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
