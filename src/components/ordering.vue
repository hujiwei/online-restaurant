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
          <mt-field placeholder="请填写联系人姓名" v-model="form.username"></mt-field>
        </li>
        <li class="clearfix">
          <label>&nbsp;</label>
          <div class="sex-wrap">
            <mt-radio v-model="form.sex" :options="options"></mt-radio>
          </div>
        </li>
        <li class="clearfix">
          <label>联系电话：</label>
          <mt-field placeholder="请填写联系电话" v-model="form.phone"></mt-field>
        </li>
        <li class="clearfix">
          <label>预定人数：</label>
          <mt-field placeholder="请填写预定人数" v-model="form.number"></mt-field>
        </li>
        <li class="clearfix">
          <label>预定时间：</label>
          <mt-field placeholder="请选择预定时间" v-model="form.time" @click.native="open('picker')"></mt-field>
        </li>
        <li class="clearfix">
          <label>选择桌号：</label>
          <mt-field placeholder="请选择桌号" v-model="form.table" @click.native="showTablePopup"></mt-field>
        </li>
      </ul>
    </div>

    <!-- 选择时间 -->
    <mt-datetime-picker ref="picker" type="time" :startHour="10" :endHour="22" v-model="value" @confirm="handleChange"></mt-datetime-picker>

    <!-- 选择桌号 -->
    <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
      <mt-picker valueKey="table_name" :showToolbar="true" :slots="tableSlot" @change="onTableChange" :visible-item-count="5">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancleTable">取消</span>  
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectTable">确定</span>
      </mt-picker>
    </mt-popup>
    

    <div class="btn-wrap">
      <mt-button class="order-btn" type="default" @click="reserve(1)">在线预订并点餐</mt-button>
      <mt-button class="go-btn" type="default" @click="reserve(0)">到店点餐</mt-button>
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
import { Toast, MessageBox } from 'mint-ui';
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
      tableSlot: [{
        flex: 1,
        values: [],
        className: 'slot1'
      }],
      form: {
        username: '',
        phone: '',
        sex: '1',
        number: '',
        time: '',
        table: ''
      },
      value: '',
      table_id: '',
      popupVisible: false,
      tableData: []
    }
  },
  created () {
    if(!!localStorage.getItem('user_id')){
    }else{
      this.$router.push('/login')
    }
  },
  mounted () {
    this.getwebtable()
  },
  methods: {
    // 获取空闲桌号
    getwebtable: function(){
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.table.webtable'
      }
      form.sign = this.$mobile.mysign(form);
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          if (response.data.status) {
            this.tableData = response.data.data
          }else{
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
    },

    // 预定位置，到店点餐
    reserve: function(type){
      var regex = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/g;
      if (this.form.username == '') {
        Toast({
          message: '请填写联系人姓名',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      if (!regex.test(this.form.phone)) {
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      if (this.form.number == '') {
        Toast({
          message: '请填写预定人数',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      if (this.form.time == '') {
        Toast({
          message: '请选择预定时间',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      if (this.form.table == '') {
        Toast({
          message: '请选择桌号',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      localStorage.setItem('order_consignee', this.form.username)
      localStorage.setItem('order_denger', this.form.sex)
      localStorage.setItem('order_mobile', this.form.phone)
      localStorage.setItem('order_number', this.form.number)
      localStorage.setItem('order_time', this.form.time)
      localStorage.setItem('order_table', this.table_id)
      if(type == 1){
        this.$router.push('/cart')
      }
      if(type == 0){
        this.$router.push('/pay')
      }
    },
    open: function(picker) {
      this.$refs[picker].open();
    },
    handleChange: function(value) {
      this.form.time = value
    },
    onTableChange: function(picker, values) {
      for (var key in values[0]) {
        if( key == 'table_id'){
          this.form.table = values[0]['table_name']
          this.table_id = values[0]['table_id']
        }
      }
    },
    cancleTable: function(){
      this.popupVisible = false
    },
    selectTable: function(){
      this.popupVisible = false
    },
    showTablePopup: function(){
      this.tableSlot[0].values = this.tableData
      this.popupVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ordering{
  padding: 40px 0 73px;
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
