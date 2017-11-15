<template>
  <div class="ordering">
    <mt-header fixed title="订位">
      <router-link to="/index" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 订位表单 -->
    <div class="ordering-form">
      <ul>
        <li class="clearfix">
          <label>联系人：</label>
          <mt-field placeholder="请输入姓名" v-model="form.username"></mt-field>
        </li>
        <li class="clearfix">
          <label>&nbsp;</label>
          <div class="sex-wrap">
            <mt-radio v-model="form.value" :options="options"></mt-radio>
          </div>
        </li>
        <li class="clearfix">
          <label>联系电话：</label>
          <mt-field placeholder="请输入联系电话" v-model="form.phone"></mt-field>
        </li>
        <li class="clearfix">
          <label>预定人数：</label>
          <mt-field placeholder="请输入预定人数" v-model="form.number"></mt-field>
        </li>
        <li class="clearfix">
          <label>预定时间：</label>
          <mt-field placeholder="请输入预定人数" v-model="form.time"></mt-field>
        </li>
      </ul>
    </div>

    <div class="btn-wrap">
      <router-link to="/cart">
        <mt-button class="order-btn" type="default">在线预订并点餐</mt-button>
      </router-link>
      <router-link to="/pay">
        <mt-button class="go-btn" type="default">到店点餐</mt-button>
      </router-link>
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
export default {
  name: 'ordering',
  data () {
    return {
      selected: this.$route.name,
      options: [{
        label: '先生',
        value: '1'
      },
      {
        label: '女士',
        value: '2'
      }],
      form: {
        username: '',
        phone: '',
        value: '1',
        number: '',
        time: ''
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.ordering{
  padding: 40px 0 78px;
  background-color: #fff;
}
.ordering-form{
  padding: 20px 20px 20px 0;
  li{
    & + li{
      margin-top: 20px;
    }
    label{
      float: left;
      width: 90px;
      font-size: 14px;
      text-align: right;
      line-height: 42px;
    }
    .mint-field{
      border: 1px solid #ddd;
      background: none;
      min-height: 40px;
    }
  }
}
.btn-wrap{
  padding: 20px;
  .mint-button{
    display: block;
    width: 100%;
    margin-bottom: 10px;
    &.order-btn{
      background-color: #FFD006;
      color: #000;
    }
  }
}
</style>
