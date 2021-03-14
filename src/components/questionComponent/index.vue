<template>
  <div class="question" v-if='question.detail.type'>
    <!-- 单选 -->
    <div v-if='question.detail.type === 1'>
      <div class="title">
        【单选】{{ question.detail.title }}
      </div>
      <div class="tags">
        <div v-for='item in question.detail.tag' :key='item' class="tag">
          {{ item }}
        </div>
      </div>
      <!-- 单选选项 -->
      <div @click='sin_click(item)' v-for='(item, index) in options' :key='item' class="item" :class="{ active: singleAnswer === item, green: question.isAnswered && question.analysis.singleAnswer === item, red: question.isAnswered && question.analysis.singleAnswer !== item }">
        {{ item }}. {{ question.detail.option[index] }}
      </div>
    </div>
    <!-- 多选 -->
    <div v-else-if='question.detail.type === 2'>
      <div class="title">
        【多选】{{ question.detail.title }}
      </div>
      <div class="tags">
        <div v-for='item in question.detail.tag' :key='item' class="tag">
          {{ item }}
        </div>
      </div>
      <!-- 多选选项 -->
      <div @click='mul_click(item)' v-for='(item, index) in options' :key='item' class="item" :class="{ active: multipleAnswer.includes(item), green: question.isAnswered && question.analysis.multipleAnswer.includes(item), red: question.isAnswered && !question.analysis.multipleAnswer.includes(item) }">
        {{ item }}. {{ question.detail.option[index] }}
      </div>
    </div>
    <!-- 简答 -->
    <div v-else>
      <div class="title">
        【简答】{{ question.detail.title }}
      </div>
      <div class="tags">
        <div v-for='item in question.detail.tag' :key='item' class="tag">
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 答案解析 -->
    <div v-if='question.isAnswered' class="analysis">
      <div v-if='question.detail.type !== 3'>
        <div v-if='question.analysis.isRight' class="right">
          回答正确
        </div>
        <div v-else class="wrong">
          回答错误
        </div>
        <div class="right_answers">
          正确答案{{ question.analysis.singleAnswer ? question.analysis.singleAnswer : question.analysis.multipleAnswer.join(',') }}
        </div>
      </div>
      <div class="datas">
        <div class="data">
          难度<span>{{ question.analysis.difficulty === '1' ? '简单' : question.analysis.difficulty === '2' ? '中等' : '困难' }}</span>
        </div>
        <div class="data">
          提交次数<span>{{ question.analysis.submitNum }}</span>
        </div>
        <div class="data">
          正确次数<span>{{ question.analysis.correctNum }}</span>
        </div>
      </div>
      <div class="title">
        答案解析
      </div>
      <div class="answer_text">
        {{ question.analysis.answerAnalysis }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    question: Object
  },
  data () {
    return {
      options: ['A', 'B', 'C', 'D'],
      // 单选题答案
      singleAnswer: '',
      // 多选题答案
      multipleAnswer: []
    }
  },
  computed: {},
  watch: {
  },
  created () {
  },
  mounted () {},
  methods: {
    // 点击单选选项
    sin_click (val) {
      // 如果未提交，才能修改选项
      if (!this.question.isAnswered) {
        this.singleAnswer = val
      }
    },
    // 点击多选选项
    mul_click (val) {
      // 如果未提交，才能修改选项
      if (!this.question.isAnswered) {
        let i = ''
        this.multipleAnswer.forEach((item, index) => {
          i = item === val ? index : i
        })
        if (i !== '') {
          this.multipleAnswer.splice(i, 1)
        } else {
          this.multipleAnswer.push(val)
        }
      }
    }
  }
}
</script>
<style scoped lang='less'>
  .question{
    padding: 15px;
    .title{
      font-size: 16px;
      color: #181A39;
      font-family: PingFangSC, PingFangSC-Regular;
      line-height: 23px;
      letter-spacing: 1px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .tags{
      display: flex;
      align-items: center;
      .tag{
        background-color: #F7F4F5;
        color: #B4B4BD;
        margin-right: 5px;
        text-align: center;
        opacity: 0.6;
        border: 1px solid #ffffff;
        border-radius: 4px;
        padding: 5px;
        font-size: 12px;
      }
    }
    .item{
      position: relative;
      box-sizing: border-box;
      width: 326px;
      min-height: 50px;
      margin: 10px auto;
      padding: 10px 40px 10px 10px;
      display: flex;
      align-items: center;
      font-size: 16px;
    }
    // 选中的
    .item.active{
      border: 1px solid #b4b4bd;
      border-radius: 5px;
    }
    // 正确答案
    .item.green{
      background-color: #DDFAD9;
      color: #1DC779;
      border: 0;
      &::after{
        position: absolute;
        top: 10px;
        right: 5px;
        font-size: 30px;
        font-family: 'iconfont';
        content: '\e604';
      }
    }
    // 选错的
    .item.red.active{
      background-color: #FFEFEA;
      border: 0;
      &::after{
        position: absolute;
        top: 10px;
        right: 5px;
        font-size: 30px;
        font-family: 'iconfont';
        content: '\e605';
        color: #E40137;
      }
    }
    .analysis{
      padding: 15px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Regular;
      .title{
        color: #222222;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .right{
        color: #1DC779;
        margin-bottom: 15px;
      }
      .wrong{
        color: #E40137;
        margin-bottom: 15px;
      }
      .right_answers{
        font-size: 16px;
        color: #1DC779;
        margin-bottom: 15px;
      }
      .datas{
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #545671;
        margin-bottom: 20px;
        background-color: #F7F4F5;
        .data{
          span{
            margin-left: 5px;
          }
        }
      }
      .answer_text{
        font-size: 16px;
        color: #181A39;
        line-height: 23px;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }
  }
</style>
