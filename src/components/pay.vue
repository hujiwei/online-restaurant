<template>
  <div class="pay">
    <mt-header fixed title="支付">
      <a href="javascript:history.go(-1);" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>

    <!-- 支付金额 -->
    <div class="pay-amount">
      支付金额：<strong>￥50（定金）</strong>
    </div>

    <!-- 支付方式 -->
    <div class="pay-type">
      <h2 class="title">选择支付方式</h2>
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
  name: "pay",
  data() {
    return {
      selected: this.$route.name,
      payType: ""
    };
  },
  created () {
    // console.log(this.payType)
  },
  methods: {
    submitForm: function(){
      console.log(this.payType)
    }
  }
};
</script>

<style lang="scss" scoped>
.pay {
  padding: 40px 0 0;
  background-color: #fff;
}
.pay-amount {
  padding: 10px 20px;
  font-size: 18px;
  strong {
    font-size: 20px;
    color: #f35707;
    font-weight: normal;
  }
}
.pay-type {
  .mint-cell{
    min-height: 60px;
    background: none;
  }
  h2.title {
    padding: 0 20px;
    color: #d1d1d0;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
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
