<template>
  <div class="position" v-if='detail.name'>
    <back title='' />
    <!-- 顶部 -->
    <header>
      <div class="top">
        <div class="name">
          {{ detail.name }}
        </div>
        <div class="salary">
          {{ detail.salary }}
        </div>
      </div>
      <div class="infos">
        <div class="info">
          <i class="iconfont iconicon_city"></i>
          {{ detail.city }}
        </div>
        <div class="info">
          <i class="iconfont iconicon_nian"></i>
          {{ detail.experience }}
        </div>
        <div class="info">
          <i class="iconfont iconicon_xueli"></i>
          {{ detail.education }}
        </div>
      </div>
      <div class="features">
        <div class="feature">
          {{ detail.feature[0] }}
        </div>
        ·
        <div class="feature">
          {{ detail.feature[1] }}
        </div>
        ·
        <div class="feature">
          {{ detail.feature[2] }}
        </div>
      </div>
    </header>
    <!-- 内容 -->
    <div class="content">
      <div class="title">
        职位描述
      </div>
      <div class="item" v-text='detail.responsibility'>
      </div>
    </div>
    <!-- 企业 -->
    <div @click='toCompany(detail.company.id)' class="company">
      <div class="avatar">
        <img :src="baseUrl + detail.company.logo" alt="">
      </div>
      <div class="middle">
        <div class="name">
          {{ detail.company.name }}
        </div>
        <div class="tags">
          <div class="tag">
            {{ detail.company.type }}
          </div>
          <div class="tag">
            {{ detail.company.step }}
          </div>
          <div class="tag">
            {{ detail.company.scale }}
          </div>
        </div>
      </div>
      <i class="iconfont iconicon_more"></i>
    </div>
    <!-- 刷题按钮 -->
    <div class="btn">
      去刷题
    </div>
  </div>
</template>
<script>
import { getPositionDetailByIdApi } from '@/api/company'
export default {
  name: '',
  components: {},
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
        const { data: res } = await getPositionDetailByIdApi(this.$route.params.id)
        console.log(res)
        this.detail = res.data
      } catch (err) {
        console.log(err)
      }
    },
    toCompany (id) {
      this.$router.push('/companyDetail/' + id)
    }
  }
}
</script>
<style scoped lang='less'>
  .position{
    header{
      padding: 15px;
      .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        margin-bottom: 20px;
        .name{
          font-size: 24px;
          color: #222222;
        }
        .salary{
          color: #E40137;
          font-size: 16px;
        }
      }
      .infos{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .info{
          font-size: 12px;
          color: #181A39;
          margin-right: 15px;
          i{
            margin-right: 5px;
            font-size: 12px;
            color: #B4B4BD;
          }
        }
      }
      .features{
        display: flex;
        align-items: center;
        color: #B4B4BD;
        .feature{
          font-size: 12px;
          margin: 0 8px;
        }
      }
    }
    .content{
      padding: 15px;
      color: #181a39;
      .title{
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .item{
        font-size: 16px;
        line-height: 27px;
        font-family: PingFangSC, PingFangSC-Regular;
        letter-spacing: 2px;
      }
    }
    .company{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      .avatar{
        width: 58px;
        height: 58px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .middle{
        margin-left: -40px;
        .name{
          font-size: 14px;
          color: #181A39;
          margin-bottom: 10px;
        }
        .tags{
          display: flex;
          align-items: center;
          .tag{
            padding: 4px;
            border-radius: 2px;
            border: 1px solid #B4B4BD;
            margin-right: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #545671;
          }
        }
      }
    }
    .btn{
      width: 345px;
      box-sizing: border-box;
      margin: 10px auto;
      border-radius: 5px;
      padding: 14px 120px;
      background-color: #E40137;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
</style>
