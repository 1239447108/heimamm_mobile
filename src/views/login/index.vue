<template>
  <div>
    <back title=''></back>
    <h3 class="center_text">
      您好，请登录
    </h3>
    <van-form @submit="onLogin" ref='login_form' class="login_form" :show-error-message='false'>
      <van-field
        v-model="form.mobile"
        name="mobile"
        center
        clearable
        placeholder="请输入手机号"
        :rules="[
        { required: true, message: '请填写手机号' },
        {
          validator: mobileValidator,
          message: '请输入正确的手机号'
        }
        ]"
      >
        <template #left-icon>
          <i class="iconfont input_icon">&#xe60b;</i>
        </template>
      </van-field>
      <hr class="line">
      <van-field
        v-model="form.code"
        type="number"
        name="code"
        center
        clearable
        placeholder="请输入验证码"
        :rules="[
        { required: true, message: '请填写验证码' },
        {
          validator: codeValidator,
          message: '请输入正确的验证码'
        }
        ]"
      >
        <template #left-icon>
          <i class="iconfont input_icon">&#xe60c;</i>
        </template>
        <template #button>
          <van-button native-type="button" :disabled='isSendBtnDisabled' @click='send' class="send_btn" size="small" type="default">
            {{sendText}}
          </van-button>
        </template>
      </van-field>
      <div class="agree">
        登录即同意<a>《用户使用协议》</a>和<a>《隐私协议》</a>
      </div>
      <van-button type="danger" round block>确定</van-button>
    </van-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'vant'
import { sendCode, login } from '@/api/login'
import { setToken } from '@/utils/storage'
import { mapMutations, mapState } from 'vuex'
import Back from '@/components/back'

Vue.use(Toast)
export default {
  name: '',
  components: {
    Back
  },
  props: {},
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      isSendBtnDisabled: false,
      sendText: '获取验证码'
    }
  },
  computed: {
    ...mapState(['prevUrl'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ...mapMutations(['setIsLogin', 'setUserInfo']),
    mobileValidator (val) {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
    },
    codeValidator (val) {
      return /^\d{4}$/.test(val)
    },
    send () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      this.$refs.login_form.validate('mobile')
        .then(async () => {
          this.isSendBtnDisabled = true
          let num = 59
          this.sendText = num + 's后重试'
          const timeId = setInterval(() => {
            if (num > 0) {
              num -= 1
              this.sendText = num + 's后重试'
            } else {
              clearInterval(timeId)
              this.isSendBtnDisabled = false
              this.sendText = '获取验证码'
            }
          }, 1000)
          const { data: res } = await sendCode({ mobile: this.form.mobile })
          // console.log(res)
          if (res.code === 200) {
            this.$toast({
              message: '发送成功,验证码为' + res.data,
              position: 'top'
            })
          } else {
            this.$toast({
              message: '发送失败!',
              position: 'top'
            })
          }
        }
        )
        .catch((err) => {
          // console.log(err)
          if (err.message) {
            this.$toast({
              message: err.message,
              position: 'top'
            })
          } else {
            this.$toast({
              message: '请求出错',
              position: 'top'
            })
          }
        })
    },
    async onLogin () {
      const { data: res } = await login(this.form)
      // console.log(res)
      if (res.code === 200) {
        this.$toast({
          message: '登录成功!',
          position: 'top'
        })
        // 把jwt存入localStorage
        setToken('hm_m_token', res.data.jwt)
        // 设置登录状态
        this.setIsLogin(true)
        // 如果有跳转到登录之前的链接，则登录之后回到该页面
        if (this.prevUrl) {
          return this.$router.push(this.prevUrl)
        }
        // 否则跳转到我的页面
        this.$router.push('/my')
      } else {
        this.$toast({
          message: res.message,
          position: 'top'
        })
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .back_icon{
    i{
      font-size: 40px;
      color: #181A39;
    }
  }
  .center_text{
    font-size: 18px;
    color: #222222;
    padding-left: 15px;
    font-family: PingFangSC;
    height: 100px;
    line-height: 100px;
  }
  .login_form{
    padding: 0 20px;
    .line{
      margin: 0;
      height: 1px;
      color: #181A39 ;
    }
    .input_icon{
      margin-right: 10px;
    }
    .send_btn{
      border: 0;
      color: #00B8D4;
      font-size: 16px;
      font-family: PingFangSC;
    }
    .agree{
      margin: 20px 0 40px;
      font-size: 15px;
      color: #181A39;
      font-family: PingFangSC;
      a{
        text-decoration: none;
        color: #00B8D4;
      }
    }
  }
</style>
