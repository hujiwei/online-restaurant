<template>
  <div class="wxlogin">
    <div class="login-form">
      <div class="input-wrap">
        <mt-field placeholder="请输入手机号" v-model="phone"></mt-field>
      </div>
      <div class="input-wrap verifynCode">
        <mt-field placeholder="请输入验证码" v-model="verifynCode">
          <mt-button v-bind:disabled="disabled" @click="sendsms" class="sendsms" type="default">{{verifyCodeBtnText}}</mt-button>
        </mt-field>
      </div>
      <div class="input-wrap">
        <mt-button class="login-btn" type="default" @click="submitForm">登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
  name: 'wxlogin',
  data () {
    return {
      phone: '',
      verifynCode: '',
      verifyCodeBtnText: '获取验证码',
      disabled: false,
      code: this.$mobile.GetQueryString('code'),
      wx_openid: '',
      wx_nickname: '',
      wx_sex: '',
      wx_headimgurl: '',
      wx_unionid: '',
    }
  },
  created () {
    this.getopenid()
  },
  methods: {
    ctimer: function(time) {
      var t = time;
      var that = this;
      if (t > 0) {
        this.disabled = true;
        this.verifyCodeBtnText = t + '秒';
        t--;
        setTimeout(function() {
          that.ctimer(t);
        }, 1000);
      } else {
        this.disabled = false;
        this.verifyCodeBtnText = '获取验证码';
      }
    },
    sendsms: function() {
      var regex = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/g;
      if (!regex.test(this.phone)) {
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.login.send',
        mobile_phone: this.phone
      }
      form.sign = this.$mobile.mysign(form);
      Indicator.open()
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          Indicator.close()
          if (response.data.status) {
            Toast({
              message: '发送成功',
              position: 'bottom',
              duration: 2000
            });
            this.ctimer(60);
          } else {
            if (response.data.msg == '手机号已经注册过系统帐号,请去登陆!') {
              MessageBox.alert(response.data.msg).then(action => {
                this.$router.push('/login')
              });
            } else {
              Toast({
                message: response.data.msg,
                position: 'bottom',
                duration: 2000
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm: function() {
      var regex = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|66|7[^249\D]|8\d|9[89])\d{8}$/g;
      if (!regex.test(this.phone)) {
        Toast({
          message: '请输入正确的手机号码',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.login.wxregister',
        mobile_phone: this.phone,
        code: this.verifynCode,
        headimg: this.wx_headimgurl,
        nickname: this.wx_nickname,
        sex: this.wx_sex,
        openid: this.wx_unionid
      }
      form.sign = this.$mobile.mysign(form);
      Indicator.open()
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          Indicator.close()
          Toast({
            message: response.data.msg,
            position: 'bottom',
            duration: 2000
          });
          if (response.data.status) {
            localStorage.setItem('headimg', response.data.data.headimg);
            localStorage.setItem('mobile_phone', response.data.data.mobile_phone);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user_id', response.data.data.user_id);
            localStorage.setItem('user_money', response.data.data.user_money);
            localStorage.setItem('user_name', response.data.data.user_name);
            this.$router.push('/index')
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取openid及用户微信信息
    getopenid: function() {
      console.log('获取openid')
      this.$http.get('https://order.iwoke.club/openid?type=1&code=' + this.code)
        .then(response => {
          if (response.data.status) {
            var data = JSON.parse(response.data.data);
            this.wx_openid = data.openid;
            this.wx_nickname = data.nickname;
            this.wx_sex = data.sex;
            this.wx_headimgurl = data.headimgurl;
            this.wx_unionid = data.unionid;

            // 微信登录
            var form = {
              app_id: this.$appId,
              nonce: this.$mobile.getRandom(0, 1000000) + '',
              method: 'v3.login.wxlogin',
              openid: data.unionid
            }
            form.sign = this.$mobile.mysign(form);
            this.$http.post(this.$ajaxurl, form)
              .then(response => {
                Indicator.close()
                Toast({
                  message: response.data.msg,
                  position: 'bottom',
                  duration: 2000
                });
                if (response.data.status) {
                  localStorage.setItem('headimg', response.data.data.headimg);
                  localStorage.setItem('mobile_phone', response.data.data.mobile_phone);
                  localStorage.setItem('token', response.data.data.token);
                  localStorage.setItem('user_id', response.data.data.user_id);
                  localStorage.setItem('user_money', response.data.data.user_money);
                  localStorage.setItem('user_name', response.data.data.user_name);
                  this.$router.push('/index')
                }
              })
              .catch(function(error) {
                console.log(error);
              });

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
  }
}
</script>

<style lang="scss" scoped>
.wxlogin{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../assets/images/login_bg.png) no-repeat;
  background-size: cover;
}
.login-form{
  padding: 80px 20px;
  .input-wrap{
    margin-bottom: 20px;
  }
  .mint-field{
    background-color: rgba(255, 255, 255, 0.45);
    background-image: none;
  }
  .sendsms{
    font-size: 14px;
    background-color: #FFCE08;
    color: #000;
    min-width: 100px;
    height: 48px;
    border-radius: 0;
  }
  .login-btn{
    width: 100%;
    background-color: #FFCE08;
    color: #000;
    height: 48px;
    border-radius: 0;
  }
}
</style>
