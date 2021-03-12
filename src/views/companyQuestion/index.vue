<template>
  <div class="question">
    <!-- <back title='面试题' /> -->
    <back title='面试题' :showCard='showCardBtn' @click-right='openCard'></back>
    <!-- 滚动栏 -->
    <div class="scroll_box" v-show='!showCardBtn'>
      <div class="scroll_content">
        <span @click='changeType(index, type)' v-for='(type, index) in typeList' :key='index' :class="{ active: index === curTypeIndex }">
          {{ type[0] }}
        </span>
      </div>
    </div>
    <!-- 筛选栏 -->
    <van-dropdown-menu v-show='!showCardBtn'>
      <!-- 城市 -->
      <van-dropdown-item title='城市' v-model="city" :options="cityList" />
      <!-- 岗位 -->
      <van-dropdown-item title='岗位' v-model="position" :options="positionList" />
      <!-- 难度 -->
      <van-dropdown-item title='难度' v-model="difficulty" :options="difficultyList" />
    </van-dropdown-menu>
    <!-- 题目区域 -->
    <question ref='question' v-show='showCardBtn' :question='question' />
    <!-- 开始答题按钮 -->
    <div class="start" v-show='!showCardBtn'>
      <van-button @click='start' block type="primary">开始答题</van-button>
    </div>
    <!-- 底部工具栏 -->
    <footer v-show='showCardBtn'>
      <div class="left">
        <div class="item" @click='collect'>
          <i class="iconfont iconbtn_shoucang_nor" :class='{ active: userInfo && userInfo.collectQuestions.includes(question.id) }'></i>
          收藏
        </div>
        <div class="item">
          <i class="iconfont iconbtn_shuati_fankui"></i>
          反馈
        </div>
      </div>
      <div class="text">
        <span>{{ questionIndex + 1 }}</span>/{{ questionList.length }}题
      </div>
      <van-button v-if='!question.isAnswered' @click='submit' :disabled='isSubmitBtnDisabled' class="btn">
        提交
      </van-button>
      <van-button v-else v-show='answeredNum !==questionList.length' @click='next' type="primary" class="btn next">
        下一题
      </van-button>
      <van-button @click='finish' v-show='answeredNum ===questionList.length' class='btn finished'>
        结束
      </van-button>
    </footer>
    <!-- 答题卡 -->
    <van-popup v-model="isCardShow" position="bottom">
      <div class="card">
        <div class="title">
          <i class="iconfont iconbtn_nav_back"></i>
          答题卡
          <div class="right">
            <span>{{ answeredNum }}</span> / {{ questionList.length }}题
          </div>
        </div>
        <div class="count">
          共{{ questionList.length }}题
        </div>
        <!-- 题目列表 -->
        <div class="list">
          <div class="item" @click='changeQuestion(index)' :class="{ current: questionIndex === index, right: question.isAnswered && question.analysis.isRight, wrong: question.isAnswered && !question.analysis.isRight }" v-for='(question, index) in questionList' :key='question.id'>
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getCompanyFiltersApi, getCompanyQuestionApi } from '@/api/company'
import { submitQuestionApi, getQuestionDetailApi, collectQuestionApi } from '@/api/question'
import { mapState, mapActions } from 'vuex'
import question from '@/components/question'
import Vue from 'vue'
import { Dialog } from 'vant'

// 全局注册
Vue.use(Dialog)
export default {
  name: '',
  components: {
    question
  },
  props: {},
  data () {
    return {
      // 职位分类列表
      typeList: [],
      // 职位分类
      type: '全部',
      // 职位分类索引
      curTypeIndex: 0,
      // 城市列表
      cityList: [],
      // 城市
      city: '',
      // 职位列表
      positionList: [],
      // 职位
      position: '',
      // 难度列表
      difficultyList: [
        {
          text: '不限',
          value: 0
        },
        {
          text: '简单',
          value: 1
        },
        {
          text: '中等',
          value: 2
        },
        {
          text: '困难',
          value: 3
        }
      ],
      // 难度
      difficulty: 0,
      // 是否显示答题卡按钮
      showCardBtn: false,
      // 题目列表
      questionList: [],
      // 当前题目信息
      question: {},
      // 当前题目在列表中的索引
      questionIndex: 0,
      // 是否显示答题卡
      isCardShow: false,
      // 答完的题目数量
      answeredNum: 0
    }
  },
  computed: {
    ...mapState(['userInfo']),
    // 提交按钮是否被禁用
    isSubmitBtnDisabled () {
      if (this.questionList.length === 0) return true
      else {
        switch (this.question.detail.type) {
          case 1:
            return this.$refs.question.singleAnswer === ''
          case 2:
            return this.$refs.question.multipleAnswer.length < 2
          default:
            return false
        }
      }
    }
  },
  watch: {},
  created () {
    this.getCompanyFilter()
  },
  mounted () {},
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    // 获取筛选信息
    async getCompanyFilter () {
      try {
        const { data: res } = await getCompanyFiltersApi(this.$route.params.id)
        // console.log(res)
        this.typeList = res.data
        this.city = res.data[0][1][0].value
        this.cityList = res.data[0][1]
        this.position = res.data[0][1][0].positions[0].value
        this.positionList = res.data[0][1][0].positions
      } catch (err) {
        console.log(err)
      }
    },
    // 改变岗位类型
    changeType (index, type) {
      this.curTypeIndex = index
      this.type = type
      this.city = this.typeList[index][1][0].value
      this.cityList = this.typeList[index][1]
      this.position = this.typeList[index][1][0].positions[0].value
      this.positionList = this.typeList[index][1][0].positions
    },
    // 点击开始答题按钮
    async start () {
      try {
        const { data: res } = await getCompanyQuestionApi(this.$route.params.id, { position: this.position, difficulty: this.difficulty })
        // console.log(res)
        // 将请求的列表存入题目列表中
        this.questionList = res.data
        // this.questionList.forEach(item => {
        //   item.isAnswered = false
        // })
        // 将第一题的信息存入当前题目中
        this.question = res.data[0]
      } catch (err) {
        console.log(err)
      }
      this.showCardBtn = true
    },
    // 点击答题卡按钮
    openCard () {
      this.isCardShow = true
    },
    // 点击提交
    async submit () {
      try {
        const { data: res } = await submitQuestionApi({
          id: this.question.id,
          singleAnswer: this.$refs.question.singleAnswer,
          multipleAnswer: this.$refs.question.multipleAnswer
        })
        console.log(res)
        // 回答完的数量加1
        this.answeredNum += 1
        // 把当前题目设置为已完成
        this.questionList[this.questionIndex].isAnswered = true
        // 把解析放在当前题目信息中
        this.questionList[this.questionIndex].analysis = res.data
        // 将信息更新到子组件中
        this.question.isAnswered = true
        this.question.analysis = res.data
        // this.question = this.questionList[this.questionIndex]
      } catch (err) {
        console.log(err)
      }
    },
    // 点击下一题
    next () {
      // 索引加1
      this.questionIndex += 1
      // 获取下一题的数据
      this.getQuestionDetail()
      // 清空试题的答案
      this.$refs.question.singleAnswer = ''
      this.$refs.question.multipleAnswer = []
    },
    // 通过id获取题目详情(为考虑该题目是否已获取过详情的情况)
    async getQuestionDetail () {
      // 如果该题已有数据，则直接切换即可
      if (this.questionList[this.questionIndex].detail) {
        this.question = this.questionList[this.questionIndex]
      } else {
        // 如果没有数据则请求
        try {
          const { data: res } = await getQuestionDetailApi(this.questionList[this.questionIndex].id)
          console.log(res)
          this.questionList[this.questionIndex].detail = res.data
          this.question = this.questionList[this.questionIndex]
        } catch (err) {
          console.log(err)
        }
      }
    },
    // 点击答题卡上的题目序号切换题目
    changeQuestion (index) {
      this.questionIndex = index
      this.getQuestionDetail()
      // 清空试题的答案
      this.$refs.question.singleAnswer = ''
      this.$refs.question.multipleAnswer = []
    },
    // 点击结束按钮
    finish () {
      Dialog.confirm({
        title: '答题完成',
        message: '恭喜你已全部答完，是否返回上一级页面'
      })
        .then(() => {
          this.$router.back()
        })
        .catch(() => {

        })
    },
    // 收藏面试题
    async collect () {
      try {
        const { data: res } = await collectQuestionApi(this.question.id)
        console.log(res)
        this.getUserInfoByVuex()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .question{
    padding-bottom: 45px;
    .scroll_box{
      width: 100%;
      overflow-x: auto;
      &::-webkit-scrollbar{
          display: none;
        }
      .scroll_content{
        padding: 10px;
        display: flex;
        span{
          min-width: 36px;
          text-align: center;
          margin: 0 5px;
          flex-shrink: 0;
          background: #f7f4f5;
          border-radius: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-size: 12px;
          color: #545671;
          padding: 8px 14px;
          transition: all 1s;
        }
        span.active{
          background-color: #00B8D4;
          color: #fff;
        }
      }
    }
    .start{
      margin-top: 350px;
    }
    .card{
      .title{
        padding: 10px 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        color: #222222;
        font-weight: 600;
        font-family: PingFangSC, PingFangSC-Semibold;
        i{
          font-size:40px;
        }
        .right{
          font-size: 16px;
          color: #545671;
          span{
            color: #E40137;
          }
        }
      }
      .count{
        background-color: #F7F4F5;
        width: 375px;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #B4B4BD;
        padding-left: 15px;
      }
      .list{
        display: flex;
        align-items: center;
        padding: 10px;
        flex-wrap: wrap;
        // 普通状态 未回答 未被选中
        .item{
          box-sizing: border-box;
          margin: 10px;
          width: 33px;
          height: 33px;
          border-radius: 50%;
          border: 1px solid #B4B4BD;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B4B4BD;
          font-size: 14px;
        }
        // 被选中
        .item.current{
          border: 1px solid #181A39;
        }
        // 答错
        .item.wrong{
          color: #E40137;
          background-color: #ffeee9;
        }
        // 答对
        .item.right{
          color: #1DC779;
          background-color: #d5fbdb;
        }
      }
    }
    footer{
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      position: fixed;
      left: 0;
      bottom: 0;
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item{
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          color: #B4B4BD;
          margin-right: 15px;
          i{
            margin-bottom: 5px;
            font-size: 32px;
          }
          i.active{
            color: #E40137;
          }
        }
      }
      .text{
        font-size: 16px;
        span{
          font-size: 22px;
          color: #E40137;
          margin-right: 2px;
        }
      }
      .btn{
        width: 96px;
        height: 40px;
        background-color: #E40137;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #fff;
        border-radius: 5px;
        border: 0;
        outline: 0;
      }
      // 下一题
      .btn.next{
        background-color: #008bfa;
      }
      // 结束
      .btn.finished{
        background-color: #1DC779;
      }
    }
  }
</style>
