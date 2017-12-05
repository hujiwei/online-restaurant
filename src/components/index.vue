<template>
  <div class="index">
    <mt-header fixed title="在线点餐"></mt-header>

    <!-- 轮播 -->
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="banner in banners" :key="banner.id">
          <a :href="banner.ad_link">
            <img :src="banner.ad_file" :alt="banner.ad_name">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 推荐套餐 -->
    <div class="recommend-combo">
      <h1 class="title">
        <i class="icon icon-recommend"></i> 推荐套餐
      </h1>
      <ul class="combo-list">
        <li v-for="(combo, index) in combos" :key="index">
          <div class="img">
            <img :src="combo.goods_thumb" :alt="combo.goods_name">
          </div>
          <div class="info clearfix">
            <div class="text">{{combo.goods_name}} 提供免费wifi</div>
            <div class="price">
              <strong>￥{{combo.shop_price}}</strong>
              <a class="buy" href="#">马上抢购</a>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 推荐菜品 -->
    <div class="recommend-ingredient">
      <h1 class="title">
        <i class="icon icon-recommend"></i> 推荐菜品
      </h1>
      <ul class="ingredient-list clearfix">
        <li v-for="(ingredient, index) in ingredients" :key="index">
          <div class="img">
            <img :src="ingredient.goods_thumb" :alt="ingredient.goods_name">
          </div>
          <div class="info clearfix">
            <div class="text">{{ingredient.goods_name}}</div>
            <div class="price">
              <strong>￥{{ingredient.shop_price}}</strong>
            </div>
          </div>
        </li>
      </ul>
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
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
  name: "index",
  data() {
    return {
      selected: this.$route.name,
      banners: [],
      combos: [],
      ingredients: []
    };
  },
  created() {
    this.getinfo()
  },
  methods: {
    getinfo: function(){
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.home.index'
      }
      form.sign = this.$mobile.mysign(form);
      Indicator.open()
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          Indicator.close()
          if (response.data.status) {
            this.banners = response.data.data.banners
            this.combos = response.data.data.f1
            this.ingredients = response.data.data.f2
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
};
</script>

<style lang="scss" scoped>
.index{
  padding: 40px 0 73px;
}
.swipe {
  height: 36vh;
  img {
    width: 100%;
    height: 100%;
  }
}
h1.title{
  height: 40px;
  line-height: 42px;
  font-size: 16px;
  position: relative;
  padding-left: 35px;
  font-weight: normal;
  i{
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -15px;
  }
}
.recommend-combo{
  .combo-list{
    li{
      position: relative;
      min-height: 170px;
      & + li{
        margin-top: 8px;
      }
    }
    .img{
      line-height: 0;
      img{
        width: 100%;
      }
    }
    .info{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 8px 0;
      .text{
        float: left;
        color: #fff;
        font-size: 14px;
        padding-left: 10px;
      }
      .price{
        float: right;
        padding-right: 10px;
        color: #FFD006;
        .buy{
          display: inline-block;
          padding: 0 10px;
          background-color: #FFD006;
          font-size: 14px;
          border-radius: 3px;
          margin-left: 10px;
        }
      }
    }
  }
}
.recommend-ingredient{
  .ingredient-list{
    padding-right: 5px;
    li{
      position: relative;
      padding: 0 0 5px 5px;
      float: left;
      width: 50%;
      box-sizing: border-box;
    }
    .img{
      line-height: 0;
      img{
        width: 100%;
        min-height: 128px;
      }
    }
    .info{
      position: absolute;
      left: 5px;
      right: 0;
      bottom: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px 0;
      .text{
        float: left;
        color: #fff;
        font-size: 14px;
        padding-left: 10px;
      }
      .price{
        float: right;
        padding-right: 10px;
        color: #FFD006;
      }
    }
  }
}
</style>
