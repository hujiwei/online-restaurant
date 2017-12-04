<template>
  <div class="recharge">
    <mt-header fixed title="会员卡充值">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="user-info">
      <div class="username">会员姓名：张先生</div>
      <div class="userphone">会员手机：18638038000</div>
      <div class="balance">当前余额：￥10</div>
    </div>

    <!-- 充值表单 -->
    <div class="recharge-form">
      <mt-field class="money" placeholder="请输入充值金额" v-model="money"></mt-field>
    </div>

    <!-- 支付方式 -->
    <div class="pay-type">
      <div class="type">
        <div class="mint-radiolist">
          <a class="mint-cell">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <label class="mint-radiolist-label">
                  <span class="mint-radio is-right">
                    <input v-model="payType" type="radio" name="payType" class="mint-radio-input" value="alipay">
                    <span class="mint-radio-core"></span>
                  </span>
                  <span class="mint-radio-label">支付宝支付</span>
                </label>
              </div>
              <div class="mint-cell-value"><i class="icon icon-alipay"></i></div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
          <a class="mint-cell">
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <label class="mint-radiolist-label">
                  <span class="mint-radio is-right">
                    <input v-model="payType" type="radio" name="payType" class="mint-radio-input" value="weixinpay">
                    <span class="mint-radio-core"></span>
                  </span>
                  <span class="mint-radio-label">微信支付</span>
                </label>
              </div>
              <div class="mint-cell-value"><i class="icon icon-weixinpay"></i></div>
            </div>
            <div class="mint-cell-right"></div>
          </a>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="btn-wrap">
      <mt-button @click="submitForm" class="pay-btn">支付</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recharge',
  data () {
    return {
      selected: this.$route.name,
      money: '',
      payType: ''
    }
  },
  created () {
    // console.log(this.payType)
  },
  methods: {
    submitForm: function(){
      console.log(this.payType)
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge{
  padding: 40px 0 0;
  background-color: #fff;
}
.user-info{
  padding: 20px;
  line-height: 30px;
}
.recharge-form{
  padding: 0 15px;
  margin-bottom: 10px;
  .money{
    border: 1px solid #ddd;
  }
}
.pay-type {
  .mint-cell{
    min-height: 60px;
    background: none;
  }
  i.icon{
    position: absolute;
    left: 10px;
    top: 50%;
    margin-top: -20px;
  }
  .mint-cell-wrapper{
    padding-left: 40px;
    background: none;
  }
  .mint-radio-input:checked + .mint-radio-core{
    background-color: #ffd006;
    border-color: #ffd006;
  }
}
.btn-wrap {
  padding: 50px 20px;
  .pay-btn {
    width: 100%;
    background-color: #ffd006;
    color: #000;
  }
}
</style>
