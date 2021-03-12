<template>
  <div class="list">
    <van-list
    v-show='list.length > 0'
      v-model="loading"
      :finished="finished"
      :immediate-check='false'
      offset='0'
      finished-text="到底了啦~"
      @load="onLoad"
    >
      <div class="item" @click='toDetail(item.id)' v-for='item in list' :key="item.id">
        <div class="icon">
          <img :src="baseUrl + item.logo">
        </div>
        <div class="center">
          <div class="header">
            <div class="header_left">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="address">
                {{ item.region }} {{ item.distance }}
              </div>
            </div>
            <div class="score">
              {{ item.score}}分
            </div>
          </div>
          <div class="tags">
            <div class="tag">
              {{ item.type }}
            </div>
            <div class="tag">
              {{ item.step }}
            </div>
            <div class="tag">
              {{ item.scale }}
            </div>
          </div>
          <div class="footer">
            在招职位: <span>{{ item.positions }}</span> / 最后更新时间: {{ item.updated_at.slice(0, 10) }}
          </div>
        </div>
      </div>
    </van-list>
    <div v-show='list.length === 0' class="tip">
      ~暂无数据~
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    list: Array
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      loading: false,
      finished: false
    }
  },
  computed: {
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {
    toDetail (id) {
      this.$router.push('/companyDetail/' + id)
    },
    onLoad () {
      this.loading = true
      this.$emit('load')
    }
  }
}
</script>
<style scoped lang='less'>
  .list{
    margin-top: 248px;
    padding: 10px 10px 10px 0;
    .item{
      display: flex;
      justify-content: space-around;
      padding: 15px 0;
      .icon{
        width: 65px;
        height: 65px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .center{
        font-size: 12px;
        .header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #545671;
          .header_left{
            .name{
              font-size: 18px;
              font-family: PingFangSC, PingFangSC-Semibold;
              font-weight: 600;
              color: #19232b;
              margin-bottom: 5px;
            }
          }
        }
        .tags{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 10px;
          .tag{
            margin: 5px;
            padding: 5px;
            background-color: #f7f4f5;
            color: #B4B4BD;
          }
        }
        .footer{
          color: #B4B4BD;
          span{
            color: #00B8D4;
          }
        }
      }
    }
    .tip{
      text-align: center;
      font-size: 12px;
      color: #545671;
      padding: 10px 0;
    }
  }
</style>
