<template>
  <div class="edit_info">
    <back :title='title_text' :rightText='rightText' @click-right='save'></back>
    <!-- 头像 -->
    <div v-if='type === "avatar"'>
      <van-uploader :before-read="beforeRead" :max-size="2 * 1024 * 1024" @oversize="onOversize" :after-read="afterRead" class="avatar" v-model="avatarList" :max-count="1" />
    </div>
    <!-- 昵称或简介 -->
    <div v-else>
      <van-field v-model="inputVal" @input='inputChange' />
    </div>
  </div>
</template>
<script>
import Back from '@/components/back'
import { mapState } from 'vuex'
import { uploadAvatar, editUserInfo } from '@/api/user'
import eventbus from '@/utils/eventbus'
export default {
  name: '',
  components: {
    Back
  },
  props: {},
  data () {
    return {
      type: '',
      title_text: '',
      avatarList: [],
      rightText: '',
      inputVal: '',
      avatarId: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    // console.log(this.$route.query.type)
    this.type = this.$route.query.type
    this.title_text = this.type === 'avatar' ? '修改头像' : this.type === 'nickname' ? '修改昵称' : '修改简介'
    this.avatarList.push({ url: process.env.VUE_APP_BASEURL + this.userInfo.avatar })
    this.inputVal = this.type === 'nickname' ? this.userInfo.nickname : this.userInfo.intro
  },
  mounted () {},
  methods: {
    // 图片超出限制大小时触发
    onOversize (file) {
      console.log(file)
      this.$toast('图片大小不能超过2M哦!')
    },
    // 图片上传之前触发
    beforeRead (file) {
      if (file.type !== 'image/jpeg') {
        this.$toast('请上传 jpg格式图片')
        return false
      }
      return true
    },
    // 在图片读取成功后
    async afterRead (file) {
      // console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      try {
        formData.append('files', file.file)
        const { data: res } = await uploadAvatar(formData)
        console.log(res)
        if (res.code === 200) {
          file.status = 'done'
          file.message = '上传成功!'
          this.avatarId = res.data[0].id
          this.rightText = '保存'
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 保存
    async save () {
      switch (this.type) {
        case 'avatar': {
          const { data: res } = await editUserInfo({ avatar: this.avatarId })
          console.log(res)
          if (res.code === 200) {
            this.$toast('修改成功!')
            eventbus.$emit('get-userinfo')
            return this.$router.back()
          } else {
            return this.$toast('修改失败!')
          }
        }
        case 'nickname': {
          const { data: res } = await editUserInfo({ nickname: this.inputVal })
          console.log(res)
          if (res.code === 200) {
            this.$toast('修改成功!')
            eventbus.$emit('get-userinfo')
            return this.$router.back()
          } else {
            return this.$toast('修改失败!')
          }
        }
        default : {
          const { data: res } = await editUserInfo({ intro: this.inputVal })
          console.log(res)
          if (res.code === 200) {
            this.$toast('修改成功!')
            eventbus.$emit('get-userinfo')
            return this.$router.back()
          } else {
            return this.$toast('修改失败!')
          }
        }
      }
    },
    inputChange () {
      this.rightText = '保存'
    }
  }
}
</script>
<style scoped lang='less'>
  .edit_info{
    .avatar{
      width: 100%;
      /deep/ .van-uploader__wrapper{
        .van-uploader__upload{
          width: 200px;
          height: 200px;
          margin: 50px auto;
        }
        .van-uploader__preview{
          width: 200px;
          height: 200px;
          margin: 50px auto;
          .van-image{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
