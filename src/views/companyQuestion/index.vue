<template>
  <div class="question">
    <!-- <back title='面试题' /> -->
    <back
      title='面试题'
      @click-right='openCard'
    ></back>
    <!-- 滚动栏 -->
    <div
      class="scroll_box"
    >
      <div class="scroll_content">
        <span
          @click='changeType(index, type)'
          v-for='(type, index) in typeList'
          :key='index'
          :class="{ active: index === curTypeIndex }"
        >
          {{ type[0] }}
        </span>
      </div>
    </div>
    <!-- 筛选栏 -->
    <van-dropdown-menu>
      <!-- 城市 -->
      <van-dropdown-item
        title='城市'
        v-model="city"
        :options="cityList"
      />
      <!-- 岗位 -->
      <van-dropdown-item
        title='岗位'
        v-model="position"
        :options="positionList"
      />
      <!-- 难度 -->
      <van-dropdown-item
        title='难度'
        v-model="difficulty"
        :options="difficultyList"
      />
    </van-dropdown-menu>
    <!-- 开始答题按钮 -->
    <div
      class="start"
    >
      <van-button
        @click='start'
        block
        type="primary"
      >开始答题</van-button>
    </div>
  </div>
</template>
<script>
import { getCompanyFiltersApi } from '@/api/company'
import { mapState, mapActions, mapMutations } from 'vuex'
import Vue from 'vue'
import { Dialog } from 'vant'

// 全局注册
Vue.use(Dialog)
export default {
  name: '',
  components: {
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
      difficulty: 0
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
  mounted () { },
  methods: {
    ...mapActions(['getUserInfoByVuex']),
    ...mapMutations(['setQuestionInfo']),
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
      this.setQuestionInfo({ type: 'company', params: { id: this.$route.params.id, position: this.position, difficulty: this.difficulty } })
      this.$router.push('/questionList')
    }
  }
}
</script>
<style scoped lang='less'>
.question {
  padding-bottom: 45px;
  .scroll_box {
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .scroll_content {
      padding: 10px;
      display: flex;
      span {
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
      span.active {
        background-color: #00b8d4;
        color: #fff;
      }
    }
  }
  .start {
    margin-top: 350px;
  }
}
</style>
