<template>
  <div class="data">
    <div v-if="data.city">
      <span class="data_tag" >
        {{ data.city }}
      </span>
      <span class="data_tag">
        {{ data.position }}
      </span>
    </div>
    <span v-else class="data_tag">
      暂无数据
    </span>
    <div id='chart'>

    </div>
  </div>
</template>
<script>
import { Chart } from '@antv/g2'
export default {
  name: '',
  components: {},
  props: {
    data: Object
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
    const data = [
      { type: '2020年', value: 20000 },
      { type: '2019年', value: 19660 },
      { type: '2018年', value: 18300 },
      { type: '2017年', value: 19000 },
      { type: '2016年', value: 18000 },
      { type: '2015年', value: 17000 },
      { type: '2014年', value: 16800 },
      { type: '2013年', value: 14200 },
      { type: '2012年', value: 14000 }
    ]
    const chart = new Chart({
      container: 'chart',
      autoFit: true,
      height: 300
    })
    chart.data(data)
    chart.axis('type', {
      title: null,
      tickLine: null,
      line: null
    })
    chart.legend(false)
    chart.coordinate().transpose()
    chart
      .interval()
      .position('type*value')
      .size(15)
      .color('#FE6D67')
      .label('工资', {
        style: {
          fill: '#fff'
        },
        offset: -10
      })
    chart.interaction('element-active')
    chart.render()
  },
  methods: {}
}
</script>
<style scoped lang='less'>
  .data{
    padding: 15px;
    .data_tag{
      padding: 5px;
      background-color: #ECEAEA;
      font-size: 14px;
      text-align: center;
      color: #545671;
      font-family: PingFangSC, PingFangSC-Regular;
      border-radius: 5px;
      margin: 10px;
    }
    #chart{
      margin-top: 20px;
      width: 280px;
    }
  }
</style>
