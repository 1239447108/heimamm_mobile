<template>
  <div class="list">
    <!-- <back title='面试题' /> -->
    <back
      title='面试题'
      :showCard='true'
      @click-right='openCard'
    ></back>
    <!-- 题目区域 -->
    <questionComponent
      ref='question'
      :question='question'
    />
    <!-- 底部工具栏 -->
    <footer>
      <div class="left">
        <div
          class="item"
          @click='collect'
        >
          <i
            class="iconfont iconbtn_shoucang_nor"
            :class='{ active: userInfo && userInfo.collectQuestions.includes(question.id) }'
          ></i>
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
      <van-button
        v-if='!question.isAnswered'
        @click='submit'
        :disabled='isSubmitBtnDisabled'
        class="btn"
      >
        提交
      </van-button>
      <van-button
        v-else
        v-show='answeredNum !==questionList.length'
        @click='next'
        type="primary"
        class="btn next"
      >
        下一题
      </van-button>
      <van-button
        @click='finish'
        v-show='answeredNum ===questionList.length'
        class='btn finished'
      >
        结束
      </van-button>
    </footer>
    <!-- 答题卡 -->
    <van-popup
      v-model="isCardShow"
      position="bottom"
    >
      <div class="card">
        <div class="title">
          <i @click='isCardShow = false' class="iconfont iconbtn_nav_back"></i>
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
          <div
            class="item"
            @click='changeQuestion(index)'
            :class="{ current: questionIndex === index, right: question.isAnswered && question.analysis.isRight, wrong: question.isAnswered && !question.analysis.isRight }"
            v-for='(question, index) in questionList'
            :key='question.id'
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getInterviewApi, submitQuestionApi, getQuestionDetailApi, collectQuestionApi } from '@/api/question'
import { getCompanyQuestionApi } from '@/api/company'
import questionComponent from '@/components/questionComponent'
import Vue from 'vue'
import { Dialog } from 'vant'
Vue.use(Dialog)
export default {
  name: '',
  components: {
    questionComponent
  },
  props: {},
  data () {
    return {
      // 题目列表
      questionList: [],
      // 当前题目信息
      question: {
        // 解析
        analysis: {},
        // 是否已回答
        isAnswered: false,
        // 详细信息
        detail: {},
        id: ''
      },
      // 当前题目在列表中的索引
      questionIndex: 0,
      // 是否显示答题卡
      isCardShow: false,
      // 答完的题目数量
      answeredNum: 0
    }
  },
  computed: {
    ...mapState(['questionInfo', 'userInfo']),
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
    // 模拟面试
    if (this.questionInfo.type === 'interview') {
      this.getInterviewQuestion()
    } else {
      // 企业面试题
      this.getCompanyQuestion()
    }
  },
  mounted () {},
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    // 获取模拟面试题数据
    async getInterviewQuestion () {
      try {
        const { data: res } = await getInterviewApi(this.questionInfo.params)
        // console.log(res)
        this.handleQuestionList(res.data)
      } catch (err) {
        console.log(err)
      }
    },
    // 获取企业面试题数据
    async getCompanyQuestion () {
      try {
        const { data: res } = await getCompanyQuestionApi(this.questionInfo.params.id, { position: this.questionInfo.params.position, difficulty: this.questionInfo.params.difficulty })
        // console.log(res)
        this.handleQuestionList(res.data)
      } catch (err) {
        console.log(err)
      }
    },
    // 处理得到题目信息
    handleQuestionList (list) {
      // 将请求的列表存入题目列表中
      list.forEach(item => {
        item.isAnswered = false
        item.analysis = {}
        item.detail = item.detail ? item.detail : {}
      })
      this.questionList = list
      // 将第一题的信息存入当前题目中
      this.question.detail = list[0].detail
      this.question.id = list[0].id
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
        // console.log(res)
        // 回答完的数量加1
        this.answeredNum += 1
        // 把当前题目设置为已完成
        this.questionList[this.questionIndex].isAnswered = true
        // 把解析放在当前题目信息中
        this.questionList[this.questionIndex].analysis = res.data
        // 将信息更新到子组件中
        this.question.isAnswered = true
        this.question.analysis = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 点击下一题
    next () {
      // 如果不是最后一题
      if (this.questionIndex !== this.questionList.length - 1) {
        // 索引加1
        this.questionIndex += 1
        // 获取下一题的数据
        this.getQuestionDetail()
        // 清空试题的答案
        this.$refs.question.singleAnswer = ''
        this.$refs.question.multipleAnswer = []
      } else {
        // 如果是最后一题，再点击下一题会跳转到索引最小的为提交的题目
        this.questionIndex = this.questionList.findIndex(question => !question.isAnswered)
        this.getQuestionDetail()
        // 清空试题的答案
        this.$refs.question.singleAnswer = ''
        this.$refs.question.multipleAnswer = []
      }
    },
    // 通过id获取题目详情
    async getQuestionDetail () {
      // 如果该题已有详情数据，则直接切换即可
      if (this.questionList[this.questionIndex].detail.title) {
        this.question.detail = this.questionList[this.questionIndex].detail
        this.question.isAnswered = this.questionList[this.questionIndex].isAnswered
        this.question.analysis = this.questionList[this.questionIndex].analysis
      } else {
        // 如果没有详情数据则请求
        try {
          const { data: res } = await getQuestionDetailApi(this.questionList[this.questionIndex].id)
          // console.log(res)
          this.questionList[this.questionIndex].detail = res.data
          this.question.id = this.questionList[this.questionIndex].id
          this.question.detail = res.data
          this.question.analysis = {}
          this.question.isAnswered = false
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
      this.isCardShow = false
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
  .list{
    padding-bottom: 60px;
    .card {
      .title {
        padding: 10px 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        color: #222222;
        font-weight: 600;
        font-family: PingFangSC, PingFangSC-Semibold;
        i {
          font-size: 40px;
        }
        .right {
          font-size: 16px;
          color: #545671;
          span {
            color: #e40137;
          }
        }
      }
      .count {
        background-color: #f7f4f5;
        width: 375px;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #b4b4bd;
        padding-left: 15px;
      }
      .list {
        display: flex;
        align-items: center;
        padding: 10px;
        flex-wrap: wrap;
        // 普通状态 未回答 未被选中
        .item {
          box-sizing: border-box;
          margin: 10px;
          width: 33px;
          height: 33px;
          border-radius: 50%;
          border: 1px solid #b4b4bd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b4b4bd;
          font-size: 14px;
        }
        // 被选中
        .item.current {
          border: 1px solid #181a39;
        }
        // 答错
        .item.wrong {
          color: #e40137;
          background-color: #ffeee9;
        }
        // 答对
        .item.right {
          color: #1dc779;
          background-color: #d5fbdb;
        }
      }
    }
    footer {
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
      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          color: #b4b4bd;
          margin-right: 15px;
          i {
            margin-bottom: 5px;
            font-size: 32px;
          }
          i.active {
            color: #e40137;
          }
        }
      }
      .text {
        font-size: 16px;
        span {
          font-size: 22px;
          color: #e40137;
          margin-right: 2px;
        }
      }
      .btn {
        width: 96px;
        height: 40px;
        background-color: #e40137;
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
      .btn.next {
        background-color: #008bfa;
      }
      // 结束
      .btn.finished {
        background-color: #1dc779;
      }
    }
  }
</style>
