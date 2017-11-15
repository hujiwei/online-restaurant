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
        <li>
          <div class="time">2017-11-06 11:20</div>
          <div class="info">智慧餐厅 到店点餐</div>
          <div class="cost">消费 <strong>￥198</strong></div>
          <div class="status">下单成功</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderlist',
  data () {
    return {
      selected: this.$route.name
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
