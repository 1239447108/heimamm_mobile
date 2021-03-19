<template>
  <div class="question">
    <header>
      面试宝典
      <van-dropdown-menu>
        <van-dropdown-item ref='city' v-model="city" :title='city' >
          <template #default>
            <van-index-bar :sticky='false'>
              <van-index-anchor :index="key" v-for='(value, key) in citys' :key='key'>
                {{ key }}
                <h3 @click='changeCity(city)' v-for='city in value' :key='city'>
                  {{ city }}
                </h3>
              </van-index-anchor>
            </van-index-bar>
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
    </header>
    <div class="scroll_box">
      <div class="scroll_content">
        <span @click='positionId = position.id' v-for='(position, index) in positions' :key='index' :class="{ active: position.id === positionId }">
          {{ position.name }}
        </span>
      </div>
    </div>
    <div class="center">
      <div class="center_box">
        <div class="center_item">
          <div class="item_icon color1">
            <i class="iconfont iconicon_mine_cuoti"></i>
          </div>
          <div class="item_text">
            常错题库
          </div>
        </div>
        <div class="center_item">
          <div class="item_icon color2">
            <i class="iconfont iconicon_mine_tikushoucang"></i>
          </div>
          <div class="item_text">
            收藏题库
          </div>
        </div>
      </div>
      <div id="chart">
        <div class="bg"></div>
        <van-circle
          v-model="currentRate"
          :rate="rate"
          :speed="100"
          :stroke-width="80"
          layer-color="none"
        >
          <template #default>
            <div class="circle_text">
              <span>
                顺序刷题
              </span>
              <span>
                {{ submit_transition }} / {{ total_transition }}
              </span>
            </div>
          </template>
        </van-circle>
      </div>
      <div class="center_box">
        <div class="center_item">
          <div class="item_icon color3">
            <i class="iconfont iconicon_mine_qiyeshoucang"></i>
          </div>
          <div class="item_text">
            企业题库
          </div>
        </div>
        <div class="center_item">
          <div class="item_icon color4">
            <i class="iconfont iconicon_mine_mianjing"></i>
          </div>
          <div class="item_text">
            已答题库
          </div>
        </div>
      </div>
    </div>
    <div class="count">
      <div class="count_text">
        累计收录
      </div>
      <div class="count_num">
        {{ total_transition }}
      </div>
    </div>
    <div class="btn">
      <van-button @click='start' color='#00B8D4' block>模拟面试</van-button>
    </div>
  </div>
</template>
<script>
import { getQuestionFiltersApi } from '@/api/question'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'question',
  components: {},
  props: {},
  data () {
    return {
      city: '全国',
      citys: [],
      positions: [
      ],
      positionId: '',
      curPositionIndex: 0,
      cityPositions: [],
      isCityPickerShow: false,
      indexList: [1, 2, 3, 4],
      currentRate: 0,
      total: 0,
      total_transition: 0,
      submit: 0,
      submit_transition: 0
    }
  },
  computed: {
    ...mapState(['userInfo']),
    rate () {
      return (7 / 126) * 100
    }
  },
  watch: {},
  created () {
    this.getQuestionFilter()
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['setQuestionInfo']),
    async getQuestionFilter () {
      try {
        const { data: res } = await getQuestionFiltersApi()
        // console.log(res)
        this.citys = res.data.citys
        this.total = res.data.totalCount
        this.cityPositions = res.data.cityPositions
        this.positions = this.cityPositions['全国']
        this.positionId = this.positions[0].id
        this.submit = this.userInfo.correctQuestions.length
        const timeId1 = setInterval(() => {
          if (this.total_transition >= this.total) {
            return clearInterval(timeId1)
          }
          this.total_transition++
        }, 1000 / this.total)
        const timeId2 = setInterval(() => {
          if (this.submit_transition >= this.submit) {
            return clearInterval(timeId2)
          }
          this.submit_transition++
        }, 1000 / this.submit)
      } catch (err) {
        console.log(err)
      }
    },
    changeCity (city) {
      this.city = city
      this.$refs.city.toggle()
      this.positions = this.cityPositions[city]
      this.positionId = this.positions[0].id
    },
    start () {
      this.setQuestionInfo({ type: 'interview', params: { type: this.positionId, city: this.city } })
      this.$router.push('/questionList')
      // this.$router.push('/interview?type=' + this.positionId + '&city=' + this.city)
    }
  }
}
</script>
<style scoped lang='less'>
  .question{
    header{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 100px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222222;
      /deep/ .van-dropdown-menu__bar{
        box-shadow: none;
      }
    }
    .scroll_box{
      width: 100%;
      overflow-x: auto;
      // 去除滚动条
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
    .center{
      position: relative;
      padding: 17px 42px;
      .center_box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        .center_item{
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #545671;
          .item_icon{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            color: #fff;
            i{
              font-size: 24px;
            }
          }
          .item_icon.color1{
            background: linear-gradient(180deg,#ff8080, #ff4949);
          }
          .item_icon.color2{
            background: linear-gradient(180deg,#ffda05, #ffb302);
          }
          .item_icon.color3{
            background: linear-gradient(180deg,#00ddec, #00b8d4);
          }
          .item_icon.color4{
            background: linear-gradient(180deg,#3ee5b1, #1dc779);
          }
        }
      }
      #chart{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
        background-image: url('../../assets/circle.png');
        background-size: 100%;
        box-sizing: border-box;
        padding: 10px;
        .van-circle{
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg,#ff6f92, #e40137);
          border-radius: 50%;
          .circle_text{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            span{
              font-size: 14px;
              color: #fff;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .count{
      padding: 30px 0;
      color: #545671;
      text-align: center;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      .count_text{
        font-size: 18px;
        margin-bottom: 20px;
      }
      .count_num{
        font-size: 40px;
      }
    }
    .btn{
      padding: 0 15px;
      border-radius: 10px;
      overflow: hidden;
    }
  }
</style>
