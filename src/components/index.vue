<template>
  <div class="index">
    <mt-header fixed title="在线点餐"></mt-header>

    <!-- 轮播 -->
    <div class="swipe">
      <mt-swipe :auto="4000">
        <!-- <mt-swipe-item v-for="ad in ads" :key="ad.id">
          <a :href="ad.ad_link">
            <img :src="ad.ad_file" alt="">
          </a>
        </mt-swipe-item> -->
        <mt-swipe-item>
          <a href="#">
            <img src="../assets/images/banner1.png" alt="">
          </a>
        </mt-swipe-item>
        <mt-swipe-item>
          <a href="#">
            <img src="../assets/images/banner1.png" alt="">
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
        <li>
          <div class="img">
            <img src="../assets/images/taocan1.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">3-5人套餐提供免费wifi</div>
            <div class="price">
              <strong>￥98</strong>
              <a class="buy" href="#">马上抢购</a>
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="../assets/images/taocan2.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">2-3人套餐提供免费wifi</div>
            <div class="price">
              <strong>￥68</strong>
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
        <li>
          <div class="img">
            <img src="../assets/images/caipin1.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">蟹饺</div>
            <div class="price">
              <strong>￥98</strong>
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="../assets/images/caipin2.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">精品羊肉</div>
            <div class="price">
              <strong>￥68</strong>
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="../assets/images/caipin3.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">羊肚</div>
            <div class="price">
              <strong>￥68</strong>
            </div>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="../assets/images/caipin4.png" alt="">
          </div>
          <div class="info clearfix">
            <div class="text">蔬菜拼盘</div>
            <div class="price">
              <strong>￥68</strong>
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
export default {
  name: "index",
  data() {
    return {
      ads: [],
      selected: this.$route.name
    };
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.index{
  padding: 40px 0 78px;
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
