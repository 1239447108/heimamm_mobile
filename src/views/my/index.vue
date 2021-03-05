<template>
  <div class="my" v-if='info'>
    <header class="my_content">
      <div class="person_info">
        <div class="person_info_left">
          <div class="person_info_name">
            {{ info.nickname }}
          </div>
          <div class="person_info_words" v-if='info.intro'>
            {{ info.intro ? info.intro : '这个人很懒，还没有介绍哦' }}
          </div>
        </div>
        <van-image
          class="person_info_avatar"
          @click='toInfo'
          :src="baseUrl + info.avatar"
        />
      </div>
      <div class="count_content">
        <div class="count_item">
          <div class="count_item_num">
            {{ info.submitNum }}
          </div>
          <div class="count_item_text">
            累计答题
          </div>
        </div>
        <div class="count_item">
          <div class="count_item_num">
            {{ info.collectQuestions.length }}
          </div>
          <div class="count_item_text">
            收藏题目
          </div>
        </div>
        <div class="count_item">
          <div class="count_item_num">
            {{ info.errorQuestions.length }}
          </div>
          <div class="count_item_text">
            我的错题
          </div>
        </div>
        <div class="count_item">
          <div class="count_item_num">
            {{ info.submitNum === 0 ? 0 : (info.submitNum - info.errorNum) / info.submitNum * 100 }}%
          </div>
          <div class="count_item_text">
            正确率
          </div>
        </div>
      </div>
    </header>
    <div class="card">
      <!-- 我的岗位 -->
      <div class="card_myjob">
        <van-cell title="我的岗位" size='40' :value="info.position" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
      </div>
      <!-- 中间数据模块 -->
      <div class="card_data">
        <div class="data_title">
          面经数据
        </div>
        <div class="data_count_content">
          <div class="data_count_item">
            <div class="data_count_yesterday">
              昨日阅读
              <span>+{{ info.shareData.read.yesterday }}</span>
            </div>
            <div class="data_count_num">
              {{ info.shareData.read.total }}
            </div>
            <div class="data_count_text">
              阅读总数
            </div>
          </div>
          <div class="data_count_item">
            <div class="data_count_yesterday">
              昨日获赞
              <span>+{{ info.shareData.star.yesterday }}</span>
            </div>
            <div class="data_count_num">
              {{ info.shareData.star.total }}
            </div>
            <div class="data_count_text">
              获赞总数
            </div>
          </div>
          <div class="data_count_item">
            <div class="data_count_yesterday">
              昨日评论
              <span>+{{ info.shareData.comment.yesterday }}</span>
            </div>
            <div class="data_count_num">
              {{ info.shareData.comment.total }}
            </div>
            <div class="data_count_text">
              评论总数
            </div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div class="card_list">
        <van-cell class="card_list_item" title="我的面经分享" size='40' value="21" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
        <van-cell class="card_list_item" title="我的消息" size='40' :value="info.systemMessages" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
        <van-cell class="card_list_item" title="收藏的题库" size='40' value="29" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
        <van-cell class="card_list_item" title="收藏的企业" size='40' value="32" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
        <van-cell class="card_list_item" title="我的错题" size='40' :value="info.errorQuestions.length" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
        <van-cell class="card_list_item" title="收藏的面试经验" size='40' value="123" is-link>
          <template #icon>
            <van-icon class='mright_icon' size='25' name="notes-o" />
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'
import eventbus from '@/utils/eventbus'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      info: null,
      baseUrl: process.env.VUE_APP_BASEURL
    }
  },
  computed: {
  },
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {
    // 通过event-bus监听事件
    eventbus.$on('get-userinfo', () => {
      this.getUserInfo()
    })
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    toInfo () {
      this.$router.push('/info')
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: res } = await getUserInfo()
      // console.log(res)
      if (res.code === 200) {
        this.setUserInfo(res.data)
        this.info = res.data
      } else {
        this.$toast('获取用户信息失败!')
      }
    }
  }
}
</script>
<style scoped lang='less'>
.my{
  position: relative;
  background-color: #F7F4F5;
  .my_content{
    height: 220px;
    background: linear-gradient(45deg,#ce0031, #b8002c);
    .person_info{
      padding: 30px 20px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .person_info_left{
        color: #fff;
        font-family: PingFangSC;
        .person_info_name{
          font-size: 21px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .person_info_words{
          font-size: 12px;
          opacity: 0.7;
        }
      }
      .person_info_avatar{
        width: 45px;
        height: 45px;
        border: 3px solid rgba(255,255,255,0.38);
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }
    }
    .count_content{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .count_item{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FFFFFF;
        .count_item_num{
          font-size: 21px;
          font-family: DINAlternate;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .count_item_text{
          font-size: 12px;
          font-family: PingFangSC;
          opacity: 0.7;
        }
      }
    }
  }
  .card{
    top: 175px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 345px;
    height: 600px;
    background-color: #F7F4F5;
    border-radius: 10px;
    overflow: hidden;
    padding-top: 5px;
    .mright_icon{
      margin-right: 10px;
    }
    .card_myjob{
      border-radius: 10px;
      background-color: #fff;
    }
    .card_data{
      margin: 10px 0;
      border-radius: 10px;
      padding: 20px;
      background-color: #fff;
      .data_title{
        font-size: 14px;
        font-weight: 600;
        color: #181A39;
        font-family: PingFangSC;
        margin-bottom: 15px;
      }
      .data_count_content{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        .data_count_item{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          .data_count_yesterday{
            font-size: 10px;
            color: #B4B4BD;
            font-family: PingFangSC;
            span{
              color: #00B8D4;
            }
          }
          .data_count_num{
            font-size: 21px;
            color: #181A39;
            font-family: DINAlternate;
            font-weight: 700;
            margin: 10px 0 5px;
          }
          .data_count_text{
            font-size: 12px;
            font-family: PingFangSC;
            color: #545671;
          }
        }
      }
    }
    .card_list{
      background-color: #fff;
      padding-top: 10px;
      .card_list_item{
        margin-bottom: 12px;
      }
    }
  }
}
</style>
