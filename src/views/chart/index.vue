<template>
  <div class="chart">
    <back title='市场数据'></back>
    <van-dropdown-menu>
      <van-dropdown-item ref='city' :title='city'>
        <div class="search">
          <i class="iconfont iconicon_search"></i>
          请输入关键字
        </div>
        <van-index-bar :sticky='false'>
          <van-index-anchor :index="key" v-for='(value, key) in cityList' :key='key'>
            {{ key }}
            <h3 @click='changeCity(key, index)' v-for='(city, index) in value' :key='index'>
              {{ city[0] }}
            </h3>
          </van-index-anchor>
        </van-index-bar>
      </van-dropdown-item>
      <van-dropdown-item ref='position' v-model='position' :title='position'>
        <div class="search">
          <i class="iconfont iconicon_search"></i>
          请输入关键字
        </div>
        <div class="position_text" @click='changePosition(item)' v-for='(item, index) in positionList' :key='index'>
          {{ item }}
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 工资收入 -->
    <div class="title">
      工资收入
    </div>
    <canvas id="chart1">

    </canvas>
    <!-- 工作经验 -->
    <div class="title">
      工作经验
    </div>
    <canvas id="chart2">

    </canvas>
    <!-- 平均工资 -->
    <div class="title">
      平均工资
    </div>
    <canvas id="chart3">

    </canvas>
    <!-- 就业形式 -->
    <div class="title">
      就业形式
    </div>
    <canvas id="chart4">

    </canvas>
  </div>
</template>
<script>
import { getDataIndexApi, getChartDataApi } from '@/api/data'
import F2 from '@antv/f2'
export default {
  name: '',
  components: {
  },
  props: {},
  data () {
    return {
      city: '',
      position: '',
      cityList: {},
      positionList: [],
      data1: [],
      data2: [],
      data3: [],
      data4: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDataIndex()
  },
  mounted () {

  },
  methods: {
    async getDataIndex () {
      try {
        const { data: res } = await getDataIndexApi()
        // console.log(res)
        this.cityList = res.data
        this.city = res.data['热门'][0][0]
        this.positionList = res.data['热门'][0][1]
        this.position = this.positionList[0]
        this.getChartData()
      } catch (err) {
        console.log(err)
      }
    },
    changeCity (key, index) {
      this.city = this.cityList[key][index][0]
      this.positionList = this.cityList[key][index][1]
      this.position = this.positionList[0]
      this.getChartData()
      this.$refs.city.toggle()
    },
    changePosition (position) {
      this.position = position
      this.getChartData()
      this.$refs.position.toggle()
    },
    async getChartData () {
      try {
        const { data: res } = await getChartDataApi({ city: this.city, position: this.position })
        console.log(res)
        this.data1 = res.data.percentSalary
        this.data2 = res.data.experienceSalary
        this.data3 = res.data.yearSalary
        this.data4 = res.data.employmentNum
        this.setChart1()
        this.setChart2()
        this.setChart3()
        this.setChart4()
      } catch (err) {
        console.log(err)
      }
    },
    setChart1 () {
      const map = {}
      this.data1.forEach(item => {
        map[item.assetType] = item.percent
        item.a = '1'
      })
      const chart = new F2.Chart({
        id: 'chart1',
        pixelRatio: window.devicePixelRatio
      })
      chart.source(this.data1, {
        percent: {
          formatter: function formatter (val) {
            return val * 100 + '%'
          }
        }
      })
      chart.legend({
        position: 'right',
        itemFormatter: function itemFormatter (val) {
          return val + '  ' + map[val] + '%'
        }
      })
      chart.tooltip(false)
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.4,
        radius: 0.85
      })
      chart.axis(false)
      chart.interval()
        .position('a*percent')
        .color('assetType', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        })
      chart.guide().html({
        position: ['50%', '45%'],
        html: `<div style="width: 250px;height: 40px;text-align: center;margin-top: 15px;">
            <div style="font-size: 10px">平均工资</div>
            <div style="font-size: 10px">15300</div>
          </div>`
      })
      chart.render()
    },
    setChart2 () {
      const chart = new F2.Chart({
        id: 'chart2',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(this.data2)
      chart.tooltip({
        showCrosshairs: true
      })
      chart.scale({
        info: {
          range: [0.1, 0.9]
        },
        tem: {
          tickCount: 5,
          min: 0
        }
      })
      chart.axis('info', {
        label: {
          rotate: Math.PI / 3,
          textAlign: 'start',
          textBaseline: 'middle'
        }
      })
      chart.area().position('info*value')
      chart.line().position('info*value')
      chart.point().position('info*value').style({
        stroke: 'skyblue',
        fill: '#fff',
        lineWidth: 1
      })
      chart.render()
    },
    setChart3 () {
      const chart = new F2.Chart({
        id: 'chart3',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(this.data3)
      chart.tooltip({
        showCrosshairs: true
      })
      chart.scale({
        info: {
          range: [0.1, 0.9]
        },
        tem: {
          tickCount: 5,
          min: 0
        }
      })
      chart.axis('year', {
        label: {
          rotate: Math.PI / 3,
          textAlign: 'start',
          textBaseline: 'middle'
        }
      })
      chart.area().position('year*salary')
      chart.line().position('year*salary')
      chart.point().position('year*salary').style({
        stroke: 'skyblue',
        fill: '#fff',
        lineWidth: 1
      })
      chart.render()
    },
    setChart4 () {
      const chart = new F2.Chart({
        id: 'chart4',
        pixelRatio: window.devicePixelRatio
      })

      chart.source(this.data4)
      chart.tooltip({
        showCrosshairs: true
      })
      chart.scale({
        info: {
          range: [0.1, 0.9]
        },
        tem: {
          tickCount: 5,
          min: 0
        }
      })
      chart.axis('date', {
        label: {
          rotate: Math.PI / 3,
          textAlign: 'start',
          textBaseline: 'middle'
        }
      })
      chart.area().position('date*value')
      chart.line().position('date*value')
      chart.point().position('date*value').style({
        stroke: 'skyblue',
        fill: '#fff',
        lineWidth: 1
      })
      chart.render()
    }
  }
}
</script>
<style scoped lang='less'>
  .chart{
    .search{
      width: 345px;
      height: 34px;
      margin: 10px auto;
      background-color: #F7F4F5;
      border-radius: 15px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #B3B3B3;
      justify-content: center;
      i{
        margin-right: 5px;
      }
    }
    .title{
      padding: 15px;
      font-size: 18px;
      color: #222222;
      font-weight: 600;
      line-height: 25px;
      font-family: PingFangSC, PingFangSC-Medium;
      margin-bottom: 15px;
    }
    .position_text{
      text-align: center;
      font-weight: 600;
      font-family: PingFangSC, PingFangSC-Regular;
      font-size: 16px;
      color: #181A39;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
