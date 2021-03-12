<template>
  <div class="detail">
    <!-- 顶部固定 -->
    <header>
      <!-- 毛玻璃效果背景 -->
      <div class="background">
        <img :src="baseUrl + detail.logo" alt="">
      </div>
      <div class="black">
      </div>
      <!-- 背景结束 -->
      <i @click='goBack' class="iconfont iconbtn_nav_back back" />
      <div class="top">
        <div class="left">
          <div class="name">
            {{ detail.name }}
          </div>
          <div class="tags">
            <div class="tag">
              {{ detail.type }}
            </div>
            <div class="tag">
              {{ detail.step }}
            </div>
            <div class="tag">
              {{ detail.scale }}
            </div>
          </div>
        </div>
        <div class="logo">
          <img :src="baseUrl + detail.logo" alt="">
        </div>
      </div>
      <div class="time">
        <i class="iconfont iconbianzu-2"></i>
        {{ detail.workTime }}
        <i class="iconfont iconicon_gongsi_sx"></i>
        {{ detail.restDay }}
        <i class="iconfont iconicon_gongsi_jiaban"></i>
        {{ detail.overtime }}
      </div>
      <!-- 实现滚动效果失败 -->
      <div class="scroll">
        <div class="cards">
          <div class="card" v-for='item in detail.weals' :key='item.id'>
            <i class="iconfont" :class="item.icon"></i>
            {{ item.text }}
          </div>
        </div>
      </div>
    </header>
    <!-- 公司地址 -->
    <div class="address">
      <div class="addr_top">
        公司地址
        <div class="addr_all">
          全部地址
          <i class="iconfont iconicon_more"></i>
        </div>
      </div>
      <div class="addr_bottom">
        <div class="left">
          <div class="name">
            {{ detail.region }} {{ detail.name }}
          </div>
          <div class="distance">
            距离当前50m，步行需要57秒
          </div>
        </div>
        <div class="navigation">
          <i class="iconfont iconicon_gongsi_daohang"></i>
          导航
        </div>
      </div>
    </div>
    <!-- 公司简介 -->
    <div class="content">
      <div class="title">
        公司简介
      </div>
      <div class="desc" :class="{ hide: hideDesc }" v-html='detail.desc'>

      </div>
      <!-- 展开更多 -->
      <div class="showMore" @click='showMore'>
        {{ showMoreText }}
        <van-icon v-show='hideDesc' name="arrow-down" />
        <van-icon v-show='!hideDesc' name="arrow-up" />
      </div>
    </div>
    <!-- 公司照片 -->
    <div class="imgs">
      <div class="title">
        公司照片
      </div>
      <div class="scroll">
        <div class="sliders">
          <div class="slider" @click='previewImg(index)' v-for='(image, index) in detail.sliders' :key='index'>
            <img :src="baseUrl + image" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 工商信息 -->
    <div class="business">
      <div class="title">
        工商信息
      </div>
      <div class="list">
        <div class="item">
          <div class="left">
            公司全称
          </div>
          <div class="right">
            {{ detail.fullname }}
          </div>
        </div>
        <div class="item">
          <div class="left">
            成立时间
          </div>
          <div class="right">
            {{ detail.establishedTime }}
          </div>
        </div>
        <div class="item">
          <div class="left">
            注册资本
          </div>
          <div class="right">
            {{ detail.capital }}
          </div>
        </div>
        <div class="item">
          <div class="left">
            法人代表
          </div>
          <div class="right">
            {{ detail.legalPerson }}
          </div>
        </div>
        <div class="item">
          <div class="left">
            信息来源
          </div>
          <div class="right">
            {{ detail.messageSource }}
          </div>
        </div>
      </div>
    </div>
    <!-- 面试评价 -->
    <div class="comment">
      <div class="title">
        面试评价
        <span @click='openCommentDialog'>写评论</span>
      </div>
      <div class="content">
        <div class="left">
          <div class="computed">
            <span>{{ computedScore }}</span>分
          </div>
          <van-rate
            v-model="computedScore"
            :size="16"
            readonly
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="right">
          <div class="item">
            <div class="text">岗位描述</div>
            <van-rate
              v-model="detail.positionScore"
              :size="16"
              readonly
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="item">
            <div class="text">面试情况</div>
            <van-rate
              v-model="detail.interviewScore"
              :size="16"
              readonly
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="item">
            <div class="text">面试官</div>
            <van-rate
              v-model="detail.interviewerScore"
              :size="16"
              readonly
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <company-comments ref='list' :list='commentList' @load='getMore' />
    <!-- 固定底部 -->
    <footer>
      <div @click='toPosition' class="btn">
        <van-badge :content="detail.positions">
          在招职位
        </van-badge>
      </div>
      <div @click='toQuestion' class="btn">
        <van-badge :content="detail.questions">
          企业面试题
        </van-badge>
      </div>
    </footer>
    <!-- 评论的弹出框 -->
    <van-popup  @close='commentDialogClose' round  v-model="isCommentDialogShow">
      <div class="comment_dialog">
        <div class="title">
          请根据实际情况为企业打分
        </div>
        <div class="center">
          <div class="item">
            <div class="text">岗位描述</div>
            <van-rate
              v-model="positionScore"
              :size="16"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="item">
            <div class="text">面试情况</div>
            <van-rate
              v-model="interviewScore"
              :size="16"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="item">
            <div class="text">面试官</div>
            <van-rate
              v-model="interviewerScore"
              :size="16"
              allow-half
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="item">
            <div class="text">面试岗位</div>
            <!-- 面试岗位列表 -->
            <div class="pickerText" @click='isPickerDialogShow = true'>{{ positionPickerText }}</div>
          </div>
        </div>
        <!-- 评论输入框 -->
        <textarea v-model='content' placeholder="请输入你的面试感受吧" class="comment_textarea"></textarea>
        <div class="btns">
          <van-button @click='isCommentDialogShow = false' type="default">取消</van-button>
          <van-button @click='submitComment' :disabled='isSubmitBtnDisabled' type="default">提交</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 职位选择器的弹出框 -->
    <van-popup v-model="isPickerDialogShow" position="bottom">
      <van-picker
        title="请选择岗位"
        show-toolbar
        ref='positionPicker'
        :columns="positions"
        @confirm="onConfirm"
        @cancel='isPickerDialogShow = false'
      />
    </van-popup>
  </div>
</template>
<script>
import { getCompanyDetailByIdApi, getCompanyCommentByIdApi, getCompanyPositionByIdApi, addCompanyCommentApi } from '@/api/company'
// 引入图片预览组件
import { ImagePreview } from 'vant'
import companyComments from '@/components/companyComments'
export default {
  name: '',
  components: {
    companyComments
  },
  props: {},
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      detail: {},
      hideDesc: true,
      showMoreText: '展开更多',
      commentList: [],
      start: 0,
      total: 0,
      // 评论对话框的显示与隐藏
      isCommentDialogShow: false,
      // 岗位描述打分
      positionScore: 5,
      // 面试情况打分
      interviewScore: 5,
      // 面试官打分
      interviewerScore: 5,
      // 岗位id
      position: '',
      // 评论内容
      content: '',
      // 岗位列表, 在评论时获取
      positions: [],
      // 岗位列表的底部弹出框的显示与隐藏
      isPickerDialogShow: false,
      positionPickerText: '点击选择岗位'
    }
  },
  computed: {
    // 将每个url拼接上baseurl
    realImgArr () {
      return this.detail.sliders.map(url => this.baseUrl + url)
    },
    // 平均分
    computedScore () {
      const { score } = this.detail
      if (!score) return 0
      return ((score.interviewScore + score.interviewerScore + score.positionScore) / 3).toFixed(1) * 1
    },
    // 是否禁用提交按钮
    isSubmitBtnDisabled () {
      return !this.position || this.content.trim().length === 0
    }
  },
  watch: {},
  created () {
    this.getDetail()
    this.getComment()
  },
  mounted () {},
  methods: {
    async getDetail () {
      try {
        const { data: res } = await getCompanyDetailByIdApi(this.$route.params.id)
        // console.log(res)
        this.detail = res.data
      } catch (err) {
        console.log(err)
      }
    },
    goBack () {
      this.$router.back()
    },
    // 点击展示更多按钮
    showMore () {
      this.hideDesc = !this.hideDesc
      this.showMoreText = this.hideDesc ? '展开更多' : '收起'
    },
    // 图片预览
    previewImg (index) {
      ImagePreview({
        images: this.realImgArr,
        startPosition: index
      })
    },
    async getComment () {
      try {
        const { data: res } = await getCompanyCommentByIdApi(this.$route.params.id, { start: this.start })
        // console.log(res)
        // this.commentList = res.data.list
        this.commentList = [...this.commentList, ...res.data.list]
        this.total = res.data.total
        this.$refs.list.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    getMore () {
      if (this.start + 5 >= this.total) {
        this.$refs.list.finished = true
        this.$refs.list.loading = false
        return
      } else {
        this.start += 5
      }
      this.getComment()
    },
    toPosition () {
      this.$router.push('/companyPosition/' + this.$route.params.id)
    },
    toQuestion () {
      this.$router.push('/companyQuestion/' + this.$route.params.id)
    },
    async openCommentDialog () {
      if (this.positions.length === 0) {
        try {
        // 将全部岗位都获取
          const { data: res } = await getCompanyPositionByIdApi(this.$route.params.id, { limit: 100 })
          // console.log(res)
          // const arr = []
          res.data.list.forEach(position => {
            this.positions.push({
              text: position.name,
              id: position.id
            })
          })
        } catch (err) {
          console.log(err)
        }
      }
      this.isCommentDialogShow = true
    },
    // 选择完职位后
    onConfirm () {
      this.position = this.$refs.positionPicker.getValues()[0].id
      this.positionPickerText = this.$refs.positionPicker.getValues()[0].text
      this.isPickerDialogShow = false
    },
    commentDialogClose () {
      this.content = ''
      this.positionPickerText = '点击选择岗位'
      this.positionScore = 5
      this.interviewScore = 5
      this.interviewerScore = 5
      this.position = ''
    },
    // 点击提交按钮
    async submitComment () {
      try {
        const { data: res } = await addCompanyCommentApi({
          content: this.content,
          interviewScore: this.interviewScore,
          interviewerScore: this.interviewerScore,
          positionScore: this.positionScore,
          position: this.position
        })
        console.log(res)
        this.$toast('提交成功!')
        this.isCommentDialogShow = false
        this.commentList = []
        this.getComment()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .detail{
    header{
      position: fixed;
      top: 0;
      left: 0;
      // margin-top: -50px;
      height: 220px;
      z-index: 1;
      padding: 10px;
      color: #fff;
      background-color: #fff;
      .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        filter: blur(8px);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .black{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: #111;
        opacity: .6;
      }
      .back{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        font-size: 40px;
      }
      .top{
        display: flex;
        align-items: center;
        margin-top: 60px;
        margin-bottom: 20px;
        justify-content: space-between;
        .left{
          .name{
            font-size: 20px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            margin-bottom: 15px;
          }
          .tags{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tag{
              margin-right: 5px;
              text-align: center;
              opacity: 0.6;
              border: 1px solid #ffffff;
              border-radius: 4px;
              padding: 2px 5px;
              font-size: 12px;
            }
          }
        }
        .logo{
          width: 58px;
          height: 58px;
          border-radius: 10px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .time{
        display: flex;
        align-items: center;
        font-size: 12px;
        i{
          font-size: 16px;
          margin-right: 3px;
          &:nth-child(2), &:nth-child(3){
            margin-left: 17px;
          }
        }
      }
      .scroll{
        width: 100%;
        overflow-x: scroll;
        &::-webkit-scrollbar{
          display: none;
        }
        .cards{
          display: flex;
          padding-top: 20px;
          .card{
            opacity: 0.6;
            border: 1px solid #ffffff;
            border-radius: 7px;
            padding: 7px;
            font-size: 12px;
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: space-between;
            margin-right: 8px;
            i{
              font-size: 24px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .address{
      margin-top: 250px;
      color: #000;
      padding: 20px 15px;
      .addr_top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin-bottom: 15px;
        .addr_all{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #5B5D75;
          i{
            font-size: 14px;
          }
        }
      }
      .addr_bottom{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          .name{
            color: #181A39;
            font-size: 15px;
            margin-bottom: 12px;
          }
          .distance{
            color: #B4B4BD;
            font-size: 12px;
          }
        }
        .navigation{
          padding: 5px 10px;
          border: 1px solid #b4b4bd;
          border-radius: 17px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #5B5D75;
        }
      }
    }
    .content{
      padding: 20px 15px;
      .title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin-bottom: 15px;
      }
      .desc{
        font-size: 15px;
        color: #181a39;
        font-family: PingFangSC, PingFangSC-Regular;
        line-height: 23px;
        transition: all .5s;
      }
      // 有hide类时只显示6行
      .hide{
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
      .showMore{
        padding: 15px;
        font-size: 14px;
        color: #545671;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .imgs{
      padding: 20px 15px;
      .title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin-bottom: 15px;
      }
      .scroll{
        width: 100%;
        overflow-x: auto;
        .sliders{
          display: flex;
          .slider{
            flex-shrink: 0;
            width: 148px;
            height: 83px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 10px;
            img{
              width: 100%;
              height: 100px;
            }
          }
        }
      }
    }
    .business{
      padding: 20px 15px;
      .title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin-bottom: 15px;
      }
      .list{
        .item{
          padding: 10px 0;
          display: flex;
          align-items: center;
          font-size: 15px;
          font-family: PingFangSC, PingFangSC-Regular;
          .left{
            color: #b4b4bd;
            margin-right: 41px;
          }
          .right{
            color: #545671;
            // 单行溢出显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .comment{
      padding: 20px 15px;
      .title{
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          color: #181A39;
          font-size: 14px;
        }
      }
      .content{
        background: #f7f7f7;
        padding: 20px;
        font-size: 15px;
        color: #545671;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #D1CCCC;
          padding-right: 10px;
          .computed{
            span{
              font-size: 32px;
              color: #00B8D4;
              margin-right: 10px;
            }
          }

        }
        .right{
          padding: 20px 0;
          .item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            .text{
              margin-right: 10px;
            }
          }
        }
      }
    }
    footer{
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      z-index: 999;
      .btn{
        border: 1px solid #b4b4bd;
        border-radius: 9px;
        margin: 0 10px;
        padding: 12px 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #181A39;
        font-family: PingFangSC, PingFangSC-Regular;
      }
    }
    .comment_dialog{
      width: 304px;
      height: 454px;
      box-sizing: border-box;
      padding: 30px;
      font-size: 15px;
      color: #545671;
      border-radius: 10px;
      .title{
        text-align: center;
        font-size: 18px;
        color: #181A39;
        font-weight: 600;
      }
      .center{
        padding: 20px 15px;
        margin-bottom: 10px;
          .item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            .text{
              min-width: 80px;
              margin-right: 10px;
            }
            .pickerText{
              font-size: 14px;
              text-align: center;
              margin-left: 20px;
              font-weight: 700;
            }
          }
      }
      .comment_textarea{
        border:0;
        width: 220px;
        height: 110px;
        padding: 15px;
        resize: none;
        background-color: #f7f4f5;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 36px;
      }
      .btns{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }
    }
  }
</style>
