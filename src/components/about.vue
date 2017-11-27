<template>
  <div class="about">
    <mt-header fixed title="关于">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="logo-wrap">
      <div class="img">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <p>关于APP</p>
      <p>iosv1.0/andridv1.0</p>
    </div>
    <div class="list">
      <mt-cell title="官方微博" is-link>
        <span><i class="icon icon-weibo"></i></span>
      </mt-cell>
      <mt-cell title="官方微信" is-link>
        <span><i class="icon icon-weixin"></i></span>
      </mt-cell>
      <mt-cell title="官方QQ" is-link>
        <span>475219984</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      selected: this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.about{
  padding: 40px 0 0;
}
.logo-wrap{
  background-color: #fff;
  padding: 20px 0;
  .img{
    text-align: center;
    margin-bottom: 10px;
    img{
      width: 80px;
    }
  }
  p{
    text-align: center;
    margin-top: 5px;
  }
}
</style>
