<template>
  <div class="edit_info">
    <back :title='title_text' :showSave='showSave' @click-right='save'></back>
    <!-- 头像 -->
    <div v-if='type === "avatar"'>
      <van-uploader
       :before-read="beforeRead"
       :max-size="2 * 1024 * 1024"
       @oversize="onOversize"
       :after-read="afterRead"
       @delete='del'
       class="avatar"
       v-model="avatarList"
       :max-count="1" />
    </div>
    <!-- 昵称或简介或职位 -->
    <div v-else class="input_content">
      <van-field class="input" v-model="inputVal" @input='inputChange' />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { uploadAvatarApi, editUserInfoApi } from '@/api/user'
export default {
  name: '',
  components: {
  },
  props: {},
  data () {
    return {
      // avatar 头像， nickname 昵称， intro 简介， position 职位
      type: '',
      title_text: '',
      avatarList: [],
      showSave: false,
      inputVal: '',
      avatarId: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {},
  created () {
    this.type = this.$route.query.type
    this.title_text = this.type === 'avatar' ? '修改头像' : this.type === 'nickname' ? '修改昵称' : this.type === 'intro' ? '修改简介' : '修改职位'
    if (this.type === 'avatar') {
      this.avatarList.push({ url: process.env.VUE_APP_BASEURL + this.userInfo.avatar })
    } else {
      this.inputVal = this.userInfo[this.type]
    }
    // this.inputVal = this.type === 'nickname' ? this.userInfo.nickname : this.type === 'intro' ? this.userInfo.intro : this.userInfo.position
  },
  mounted () {},
  methods: {
    ...mapActions(['getUserInfoByVuex']),
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
        const { data: res } = await uploadAvatarApi(formData)
        // console.log(res)
        if (res.code === 200) {
          file.status = 'done'
          file.message = '上传成功!'
          this.avatarId = res.data[0].id
          // 上传成功后显示保存按钮
          this.showSave = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    del () {
      this.showSave = false
    },
    // 点击保存
    async save () {
      // 修改头像
      if (this.type === 'avatar') {
        try {
          await editUserInfoApi({ avatar: this.avatarId })
          this.$toast('修改成功!')
          // 刷新数据
          this.getUserInfoByVuex()
          this.$router.back()
        } catch (err) {
          console.log(err)
        }
      } else {
        // 修改文本类的信息
        this.editTextValue()
      }
    },
    // 当输入框内的值改变后显示保存按钮
    inputChange () {
      this.showSave = true
    },
    // 修改文本类的信息,avatar 头像， nickname 昵称， intro 简介， position 职位
    async editTextValue () {
      const text = this.type === 'nickname' ? '修改昵称' : this.type === 'intro' ? '修改简介' : '修改职位'
      if (this.inputVal.trim().length === 0) return this.$toast(text + '不能为空')
      try {
        await editUserInfoApi({ [this.type]: this.inputVal })
        this.$toast('修改成功!')
        // 刷新数据
        this.getUserInfoByVuex()
        this.$router.back()
      } catch (err) {
        console.log(err)
      }
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
    .input_content{
      padding: 15px;
      .input{
        background-color: #f8f4f5;
      }
    }
  }
</style>
