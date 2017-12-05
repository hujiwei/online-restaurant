<template>
  <div class="mine">
    <mt-header fixed title="我的中心"></mt-header>

    <!-- 会员信息 -->
    <div class="user-info clearfix">
      <div class="avatar">
        <img :src="headimg" alt="">
      </div>
      <div class="info">
        <div class="username">{{user_name}} <span>余额:￥{{user_money}}</span></div>
        <div class="userphone">{{mobile_phone}}</div>
      </div>
    </div>

    <!-- 菜单列表 -->
    <div class="menu-list">
      <mt-cell to="/recharge" title="会员卡充值" is-link></mt-cell>
      <mt-cell to="/orderlist" title="我的订单" is-link></mt-cell>
      <mt-cell to="/about" title="关于" is-link></mt-cell>
    </div>

    <!-- 退出登录 -->
    <div class="btn-wrap">
      <mt-button class="logout-btn" @click="logout">退出登录</mt-button>
    </div>

    <!-- 底部导航 -->
    <mt-tabbar fixed class="footer" v-model="selected">
      <mt-tab-item id="index" href="#/index">
        <i slot="icon" class="icon icon-home"></i> 首页
      </mt-tab-item>
      <mt-tab-item id="ordering" href="#/ordering">
        <i slot="icon" class="icon icon-ordering"></i> 点餐
      </mt-tab-item>
      <mt-tab-item id="mine" href="#/mine">
        <i slot="icon" class="icon icon-mine"></i> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'mine',
  data () {
    return {
      selected: this.$route.name,
      user_name: localStorage.getItem('user_name'),
      user_money: localStorage.getItem('user_money'),
      mobile_phone: localStorage.getItem('mobile_phone'),
      headimg: !!localStorage.getItem('headimg')?localStorage.getItem('headimg'):'http://oyu1eujxa.bkt.clouddn.com/static/img/avatar.e934bab.png'
    }
  },
  created () {
    if(!!localStorage.getItem('user_id')){
    }else{
      this.$router.push('/login')
    }
  },
  methods: {
    logout: function(){
      MessageBox.confirm('确定退出登录?').then(action => {
        localStorage.clear();
        this.$router.push('/login')
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.mine{
  padding: 40px 0 73px;
  background-color: #fff;
}
.user-info{
  padding: 15px;
  .avatar{
    width: 80px;
    float: left;
    margin-right: 10px;
    img{
      max-width: 100%;
    }
  }
  .info{
    float: left;
    padding-top: 10px;
    line-height: 30px;
    font-size: 16px;
    color: #000;
    .username span{
      color: #FFD006;
      margin-left: 10px;
    }
  }
}
.btn-wrap{
  padding: 80px 20px 0;
  .logout-btn{
    width: 100%;
    background-color: #ffd006;
    color: #000;
  }
}
</style>
