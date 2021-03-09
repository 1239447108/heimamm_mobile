<template>
  <div class="question">
    <header>
      面试宝典
      <van-dropdown-menu>
        <van-dropdown-item v-model="city" :options="cities" />
      </van-dropdown-menu>
    </header>
    <div class="scroll_box">
      <div class="scroll_content">
        <span @click='curPositionIndex = index' v-for='(position, index) in positions' :key='index' :class="{ active: index === curPositionIndex }">
          {{ position }}
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
      <div id="chart"></div>
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
        5,464,654
      </div>
    </div>
    <div class="btn">
      <van-button color='#00B8D4' block>模拟面试</van-button>
    </div>
  </div>
</template>
<script>
import { Chart } from '@antv/g2'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      city: 0,
      cities: [
        {
          text: '北京',
          value: 0
        },
        {
          text: '上海',
          value: 1
        },
        {
          text: '深圳',
          value: 2
        }
      ],
      positions: [
        '服务端',
        '前端',
        '网络',
        '运维',
        '技术',
        '美工'
      ],
      curPositionIndex: 0
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    const data = [
      { type: '顺序刷题', value: 56.4 }
    ]
    const num1 = 70
    const num2 = 126
    const chart = new Chart({
      container: 'chart',
      autoFit: true
    })
    chart.data(data)
    chart.legend(false)
    chart.tooltip({
      showMarkers: false
    })
    chart.facet('rect', {
      fields: ['type'],
      padding: 20,
      showTitle: false,
      eachView: (view, facet) => {
        const data = facet.data
        let color
        if (data[0].type === '顺序刷题') {
          color = '#00B8D4'
        } else {
          color = '#f0657d'
        }
        data.push({ type: '其他', value: 126 - data[0].value })
        view.data(data)
        view.coordinate('theta', {
          radius: 0.8,
          innerRadius: 0.8
        })
        view
          .interval()
          .adjust('stack')
          .position('value')
          .color('type', [color, 'pink'])
          .style({
            opacity: 1
          })
        view.annotation().text({
          position: ['50%', '50%'],
          content: data[0].type,
          style: {
            fontSize: 12,
            fill: '#000',
            fontWeight: 300,
            textBaseline: 'bottom',
            textAlign: 'center'
          },
          offsetY: -12
        })

        view.annotation().text({
          position: ['50%', '50%'],
          content: num1 + '/' + num2,
          style: {
            fontSize: 18,
            fill: '#000',
            fontWeight: 500,
            textAlign: 'center'
          },
          offsetY: 10
        })

        view.interaction('element-active')
      }
    })
    chart.render()
  },
  methods: {}
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
          padding: 6px 14px;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 160px;
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
