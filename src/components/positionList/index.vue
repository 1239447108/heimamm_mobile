<template>
  <div class="list">
    <van-list
      v-model="loading"
      :finished="finished"
      offset='0'
      :immediate-check='false'
      finished-text="我的有底线的~"
      @load="onLoad"
    >
      <div class="item" @click='$router.push(`/positionDetail/` + position.id)' v-for='position in list' :key='position.id'>
        <div class="header">
          <div class="name">
            {{ position.name }}
          </div>
          <div class="salary">
            {{ position.salary }}
          </div>
        </div>
        <div class="tags">
          <div class="tag">
            {{ position.city }}
          </div>
          <div class="tag">
            {{ position.experience }}
          </div>
          <div class="tag">
            {{ position.education }}
          </div>
        </div>
      </div>
    </van-list>
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
      loading: false,
      finished: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLoad () {
      this.$emit('load')
    }
  }
}
</script>
<style scoped lang='less'>
  .list{
    .item{
      margin-top: 10px;
      padding: 15px;
      .header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        .name{
          max-width: 200px;
          font-size: 18px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #19232b;
        }
        .salary{
          font-size: 18px;
          font-weight: 600;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #e40137;
        }
      }
      .tags{
        display: flex;
        font-size: 12px;
        align-items: center;
        margin-bottom: 10px;
        color: #b4b4bd;
        .tag{
          padding: 5px;
          background-color: #F7F4F5;
          margin-right: 10px;
        }
      }
    }
  }
</style>
