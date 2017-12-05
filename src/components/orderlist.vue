<template>
  <div class="orderlist">
    <mt-header fixed title="订单列表">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 订单列表 -->
    <div class="order-list">
      <ul>
        <li v-for="(order, index) in orderlist" :key="index">
          <div class="time">{{order.update_time}}</div>
          <div class="info">智慧餐厅 到店点餐</div>
          <div class="cost">消费 <strong>￥198</strong></div>
          <div class="status">下单成功</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
  name: 'orderlist',
  data () {
    return {
      orderlist: []
    }
  },
  created () {
    // 
  },
  mounted () {
    this.getorderlist()
  },
  methods: {
    getorderlist(){
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.user.torder',
        user_id: localStorage.getItem('user_id')
      }
      form.sign = this.$mobile.mysign(form);
      Indicator.open()
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          Indicator.close()
          if (response.data.status) {
            this.orderlist = response.data.data
          } else {
            Toast({
              message: response.data.msg,
              position: 'bottom',
              duration: 2000
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.orderlist{
  padding: 40px 0 0;
  
}
.order-list{
  padding: 0 10px;
  li{
    padding: 10px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 3px;
    position: relative;
    line-height: 28px;
    &::after{
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      background: url(../assets/images/icon.png) no-repeat -20px -100px;
      background-size: 400px 400px;
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -10px;
    }
    .time{
      color: #D1D1D0;
    }
    .cost{
      strong{
        font-weight: normal;
        color: #F35707;
      }
    }
    .status{
      position: absolute;
      right: 25px;
      top: 50%;
      margin-top: -10px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
