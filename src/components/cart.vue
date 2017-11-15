<template>
  <div class="cart">
    <mt-header fixed title="点餐">
      <router-link to="/ordering" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 菜品列表 -->
    <div class="food-wrap">
      <div class="food-class clearfix">
        <span>锅底</span>
        <span>招牌菜</span>
        <span>荤菜</span>
        <span>素菜</span>
        <span>酒水饮料</span>
        <span>其他</span>
      </div>
      <div class="food-list">
        <div class="class-item">
          <h2><i class="icon icon-guodi"></i>锅底</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="class-item">
          <h2><i class="icon icon-zhaopai"></i>招牌菜</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="class-item">
          <h2><i class="icon icon-huncai"></i>荤菜</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="class-item">
          <h2><i class="icon icon-sucai"></i>素菜</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="class-item">
          <h2><i class="icon icon-jiuyin"></i>酒水饮料</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="class-item">
          <h2><i class="icon icon-qita"></i>其他</h2>
          <ul class="list">
            <li class="clearfix">
              <div class="img">
                <img src="../assets/images/cartimg.png" alt="">
              </div>
              <div class="info">
                <h3><span>养生清汤锅底<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥10</strong>/个
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 底部统计 -->
    <div class="total-footer">
      <div class="total-wrap clearfix">
        <i class="icon icon-cart">
          <em>10</em>
        </i>
        <span>总计：￥50</span>
      </div>
      <mt-button class="pay-btn">选好了</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      selected: this.$route.name,
    }
  }
}
</script>

<style lang="scss" scoped>
.cart{
  padding: 40px 0 45px;
  background-color: #fff;
}
.food-class{
  display: flex;
  background-color: #F5F5F5;
  position: fixed;
  left: 0;
  top: 40px;
  width: 100%;
  z-index: 1;
  span{
    display: block;
    flex: 1;
    padding: 10px 0;
    text-align: center;
    font-size: 12px;
  }
}
.food-list{
  padding: 10px 0;
  margin-top: 40px;
  .class-item{
    padding: 0 10px;
    & + .class-item{
      margin-top: 10px;
    }
    h2{
      position: relative;
      padding-left: 35px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      .icon{
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -15px;
      }
    }
  }
  .list{
    li{
      margin-top: 10px;
      .img{
        float: left;
        width: 60px;
        line-height: 0;
        margin-right: 5px;
        img{
          max-width: 100%;
        }
      }
      .info{
        float: left;
        padding-top: 5px;
        h3{
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 10px;
          span{
            position: relative;
            padding-right: 25px;
            .icon{
              position: absolute;
              right: 0;
              top: 50%;
              margin-top: -12px;
            }
          }
        }
        .price{
          font-size: 14px;
          strong{
            color: #F45706;
          }
        }
      }
    }
  }
}
.total-footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  height: 50px;
  .total-wrap{
    height: 50px;
    line-height: 50px;
    .icon{
      float: left;
      margin: 10px 0 10px 15px;
      position: relative;
      em{
        display: block;
        width: 18px;
        height: 18px;
        position: absolute;
        right: -6px;
        top: -6px;
        background-color: #E41C23;
        color: #fff;
        text-align: center;
        line-height: 18px;
        font-size: 12px;
        font-style: normal;
        border-radius: 15px;
      }
    }
    span{
      display: inline-block;
      margin-left: 20px;
    }
  }
  .pay-btn{
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #FFD006;
    color: #000;
    border: none;
    box-shadow: 0 0 0;
    border-radius: 0;
    padding: 0 25px;
  }
}
</style>
