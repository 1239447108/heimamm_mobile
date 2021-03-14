<template>
  <div class="position">
    <back title='在招职位' />
    <div class="total">
      {{ this.total }}
    </div>
    <div class="scroll_box">
      <div class="scroll_content">
        <span @click='setType(index, type)' v-for='(type, index) in types' :key='index' :class="{ active: index === curTypeIndex }">
          {{ type }}
        </span>
      </div>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item @change='change' title='城市' v-model="city" :options="cityList" />
      <van-dropdown-item @change='change' title='经验' v-model="experience" :options="expList" />
      <van-dropdown-item @change='change' title='待遇' v-model="salary" :options="salaryList" />
    </van-dropdown-menu>
    <positionList ref='list' :list='positionList' @load='getMore' @refresh='refresh' />
  </div>
</template>
<script>
import { getCompanyPositionByIdApi } from '@/api/company'
import positionList from '@/components/positionList'
export default {
  name: '',
  components: {
    positionList
  },
  props: {},
  data () {
    return {
      positionList: [],
      types: [
        '全部',
        '前端',
        '测试',
        '产品',
        '设计',
        '架构',
        '行政'
      ],
      curTypeIndex: 0,
      // 筛选的城市列表
      cityList: [
        {
          text: '全部',
          value: 0
        },
        {
          text: '深圳',
          value: 1
        },
        {
          text: '北京',
          value: 2
        },
        {
          text: '杭州',
          value: 3
        }
      ],
      // 筛选的经验列表
      expList: [
        {
          text: '全部',
          value: '全部'
        },
        {
          text: '1-3年',
          value: '1-3年'
        },
        {
          text: '3-5年',
          value: '3-5年'
        },
        {
          text: '5-10年',
          value: '5-10年'
        }
      ],
      // 筛选的工资列表
      salaryList: [
        {
          text: '全部',
          value: '全部'
        },
        {
          text: '4k-5k',
          value: '4k-5k'
        },
        {
          text: '4k-6k',
          value: '4k-6k'
        },
        {
          text: '8k-15k',
          value: '8k-15k'
        },
        {
          text: '10k-20k',
          value: '10k-20k'
        },
        {
          text: '13k-19k',
          value: '13k-19k'
        },
        {
          text: '15k-20k',
          value: '15k-20k'
        },
        {
          text: '15k-25k',
          value: '15k-25k'
        },
        {
          text: '20k-30k',
          value: '20k-30k'
        }
      ],
      type: '全部',
      city: '全部',
      experience: '全部',
      salary: '全部',
      total: 0,
      start: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getPosition()
  },
  mounted () {},
  methods: {
    async getPosition () {
      try {
        const queryObj = {
          start: this.start
        }
        const { data: res } = await getCompanyPositionByIdApi(this.$route.params.id, queryObj)
        // console.log(res)
        this.positionList = [...this.positionList, ...res.data.list]
        const cityArr = [
          {
            text: '全部',
            value: '全部'
          }
        ]
        if (this.positionList.length > 0) {
          // 处理得到的数据，生成城市列表
          this.positionList.forEach(position => {
            if (!cityArr.some(city => city.text === position.city)) {
              cityArr.push({
                text: position.city,
                value: position.city
              })
            }
          })
        }
        this.cityList = cityArr
        this.total = res.data.total
        this.$refs.list.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    setType (index, type) {
      this.curTypeIndex = index
      this.type = type
      this.getSortPosition()
    },
    async getSortPosition () {
      this.start = 0
      this.$refs.list.finished = false
      this.$refs.list.loading = false
      const queryObj = {
        start: this.start
      }
      if (this.type !== '' && this.type !== '全部') {
        queryObj.type = this.type
      }
      if (this.city !== '全部') {
        queryObj.city = this.city
      }
      if (this.experience !== '全部') {
        queryObj.experience = this.experience
      }
      if (this.salary !== '全部') {
        queryObj.salary = this.salary
      }
      const { data: res } = await getCompanyPositionByIdApi(this.$route.params.id, queryObj)
      this.positionList = res.data.list
      this.total = res.data.total
    },
    change () {
      this.$refs.list.finished = false
      this.getSortPosition()
    },
    getMore () {
      if (this.positionList.length >= this.total) {
        this.$refs.list.finished = true
        return
      }
      this.start += 5
      this.getPosition()
    },
    refresh () {
      this.positionList = []
      this.start = 0
      this.getPosition()
      this.$refs.list.finished = false
      this.$refs.list.isLoading = false
    }
  }
}
</script>
<style scoped lang='less'>
  .position{
    position: relative;
    .total{
      position: absolute;
      z-index: 999;
      top: 5px;
      left: 224px;
      font-size: 12px;
      color: #545671;
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
          padding: 8px 14px;
          transition: all 1s;
        }
        span.active{
          background-color: #00B8D4;
          color: #fff;
        }
      }
    }
    /deep/ .van-dropdown-item__option{
      text-align: center;
    }
    /deep/ .van-dropdown-item__option--active{
      .van-cell__value{
        position: absolute;
        top: 8px;
        right: 0;
      }
    }
  }
</style>
