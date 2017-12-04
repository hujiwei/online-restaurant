<template>
  <div class="cart">
    <mt-header fixed title="点餐">
      <router-link to="/ordering" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <!-- 菜品列表 -->
    <div class="food-wrap" ref="foodswrap">
      <div class="food-class clearfix" ref="menu">
        <span v-for="(list, index) in goodslist" :key="index" @click="contentScroll(index)" :class='{active: index == 0}'>{{list.cat_name}}</span>
      </div>
      <div class="food-list" ref="foodslist">
        <div class="class-item" v-for="(list, index) in goodslist" :key="index">
          <h2 class="classtitle"><i :class="['icon','icon-cartIcon'+ list.cat_id]"></i>{{list.cat_name}}</h2>
          <ul class="list">
            <li v-for="(goodsItem, index) in list.goods" :key="index">
              <div class="img">
                <img :src="goodsItem.goods_thumb" :alt="goodsItem.goods_name">
              </div>
              <div class="info">
                <h3><span>{{goodsItem.goods_name}}<i class="icon icon-recommend1"></i></span></h3>
                <div class="price">
                  <strong>￥{{goodsItem.shop_price}}</strong>/个
                  <div class="add_remove_btn">
                    <i @click="reduce_food(goodsItem.goods_id)" v-if="shoppingCarList[goodsItem.goods_id]" class="icon icon-cart-minus"></i>
                    <span class="commodity_count" v-if="shoppingCarList[goodsItem.goods_id]">{{ shoppingCarList[goodsItem.goods_id].count }}</span>
                    <i @click="add_food(list, goodsItem, $event)" class="icon icon-cart-add"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 购物车列表 -->
    <mt-popup class="popupCart" v-model="shoppingCarShow" position="bottom" style="width:100%">
      <section class="sp_lists">
        <header>
          <span class="sp_words">购物车</span>
          <div class="clear" @click="shoppingCarList = {};spChangeComputeAll();shoppingCarShow = false">
            <i class="icon icon-clear"></i>清空
          </div>
        </header>
        <ul class="sp_content">
          <li v-for="(item, index) in shoppingCarList" :key="index">
            <div class="food_name ell">
              {{ item.goods_name }}
            </div>
            <div class="food_unit_price">
              ￥{{ item.shop_price * item.count }}
            </div>
            <div class="food_nub">
              <i @click="reduce_food(item.goods_id)" class="icon icon-cart-minus"></i>
              <span class="commodity_count" >{{ item.count }}</span>
              <i @click="add_shopping_car(item.cat_id, item.cat_name, item.goods_name, item.goods_id, item.shop_price)" class="icon icon-cart-add"></i>
            </div>
          </li>
        </ul>
      </section>
    </mt-popup>

    <!-- 底部统计 -->
    <div class="total-footer">
      <div class="total-wrap clearfix">
        <i class="icon icon-cart" ref="carIcon" @click="shoppingCarShow = !shoppingCarShow">
          <em>{{allNub}}</em>
        </i>
        <span>总计：￥{{totalPrice}}</span>
      </div>
      <mt-button class="pay-btn" @click="submitForm">选好了</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
  name: 'cart',
  data () {
    return {
      showMe: false,
      shoppingCarList: {},  // 购物车列表
      reNub: {},  // 大类数量
      allNub: 0,  // 购物车总数
      totalPrice: 0,  // 商品总价格
      shoppingCarShow: false,  // 是否弹出购物车
      goodslist: [],
      loadingtime: 0
    }
  },
  mounted () {
    this.getgoodslist()
  },
  watch: {
    showMe: function (value) {
      if (value) {
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  updated () {
    setTimeout(() => {
      this.showMe = true;
    }, this.loadingtime)
  },
  methods: {
    // 初始化
    init () {
      this.menuClass();
      // 给购物车添加animationend事件，动画结束后去掉有animation的class
      this.$refs.carIcon.addEventListener('animationend', () => {
        this.$refs.carIcon.classList.remove('tantantan');
      }, false);
    },
    // 内容列表滚动控制分类菜单样式
    menuClass () {
      var menu = this.$refs.menu;
      var menuItem = menu.getElementsByTagName('span');
      var foodswrap = this.$refs.foodswrap;
      var foodslist = this.$refs.foodslist;
      var classtitle = foodslist.querySelectorAll('.classtitle')
      var asIndex = 0;
      foodswrap.addEventListener('scroll', () => {
        var thisST = foodswrap.scrollTop + 40;
        for (var i = 0; i < classtitle.length; i++) {
          if (thisST >= classtitle[i].offsetTop) {
            asIndex = i;
          }
        };
        for (var j = 0, x = menuItem.length; j < x; j++) {
          menuItem[j].classList.remove('active');
        }
        menuItem[asIndex].classList.add('active');
      }, false);
    },
    // 分类菜单点击控制内容列表滚动
    contentScroll (index) {
      /**
       * [scrollMove 右侧Ul滚动，以当前scrollTop与目标的差值/10为滚动距离，滚动过远的话会有点生硬]
       * @param  {[DOM]} ele    [目标元素ul]
       * @param  {[Number]} target [滚动到的位置]
       * @return {[void]}        [description]
       */
      var scrollMove = (ele, target) => {
        // 根据当前scrollTop与目标点距离算出单次改变量
        var vector = Math.round((target - ele.scrollTop) / 10);
        console.log('vector', vector);
        var scrollTimer = setInterval(() => {
          ele.scrollTop += vector;
          // 超出目标点后 或者 已经滚动到底清空定时器
          // 上滑(scrollTop>=目标点 且 vector为正) 或 下滑(scrollTop <= 目标点 且 vector为负)或 滑到最底
          if (((ele.scrollTop >= target) && vector > 0) || ((ele.scrollTop <= target) && vector < 0) || ((ele.scrollTop + ele.clientHeight + 1) >= ele.scrollHeight)) {
            // +1 正确激活当前左栏状态
            ele.scrollTop = target - 40;
            clearInterval(scrollTimer);
          }
        }, 1000 / 100);
      };
      var foodswrap = this.$refs.foodswrap;
      var foodslist = this.$refs.foodslist;
      var contentTo_ = foodswrap.querySelectorAll('.classtitle')[index].offsetTop;
      scrollMove(foodswrap, contentTo_);
    },
    // 列表中的加按钮点击
    add_food (n, x, e) { // n 为大类 x为大类种商品
      // 大类标记 c1 ,大类名字 热销榜 ,商品名 吮指原味鸡 ,单个商品id 100001 ,单价 11
      // console.log(n.type_accumulation, n.name, x.name, x.one_food_id, x.unit_price);
      this.add_shopping_car(n.cat_id, n.cat_name, x.goods_name, x.goods_id, x.shop_price);
      this.ball_fly(e);
    },
    // 向购物车添加
    add_shopping_car (type, typename, foodname, foodid, foodprice) {
      if (!this.shoppingCarList[foodid]) {
        this.shoppingCarList[foodid] = {
          'cat_id': type,
          'cat_name': typename,
          'goods_name': foodname,
          'goods_id': foodid,
          'shop_price': foodprice,
          'count': 1
        };
      } else {
        this.shoppingCarList[foodid].count++;
      }
      // 购物车改变 相关计算
      this.spChangeComputeAll();
    },
    // 减去单个食物--
    reduce_food (foodid) {
      // console.log(this.shoppingCarList[foodid].count);
      if (this.shoppingCarList && this.shoppingCarList[foodid].count > 0) {
        this.shoppingCarList[foodid].count--;
        this.shoppingCarList[foodid].count <= 0 && delete this.shoppingCarList[foodid];
      }
      // 购物车改变 相关计算
      this.spChangeComputeAll();
    },
    // 购物车改变 相关计算
    spChangeComputeAll () {
      // console.log('dasd', this.shoppingCarList);
      // 清空左列表数字 再次计算
      this.reNub = {};
      for (var x in this.shoppingCarList) {
        if (!this.reNub[this.shoppingCarList[x].cat_id]) {
          this.reNub[this.shoppingCarList[x].cat_id] = this.shoppingCarList[x].count;
        } else {
          this.reNub[this.shoppingCarList[x].cat_id] += this.shoppingCarList[x].count;
        }
      }
      // 计算总件数
      var key = 0;
      for (var j in this.reNub) {
        key += this.reNub[j];
      }
      this.allNub = key;
      // 计算总价格
      var allPrice = 0;
      for (var z in this.shoppingCarList) {
        // +=数量乘单价
        allPrice += this.shoppingCarList[z].count * this.shoppingCarList[z].shop_price;
      }
      this.totalPrice = allPrice;
    },
    // 抛球效果
    ball_fly (e) {
      // 被点元素位置
      var bound = e.target.getBoundingClientRect();
      var boundTop = bound.top;// 点击top值
      var boundLeft = bound.left;// 点击left值
      // 目标元素位置
      var target = this.$refs.carIcon;
      var targetData = target.getBoundingClientRect();
      var targetTop = targetData.top;// 目标top值
      var targetLeft = targetData.left;// 目标left值
      // 创建父球（父球横向运动）
      var father = document.createElement('div');
      father.className = 'father flyball';
      // 创建子球（子球垂直css3贝塞尔曲线运动，先上后下，得到抛球效果）
      var child = document.createElement('div');
      child.className = 'child inner';
      father.appendChild(child);
      // 设置父盒子生成的位置
      // father.style.cssText = 'top:' + boundTop + 'px;left:' + boundLeft + 'px;';
      father.style.top = boundTop + 'px';
      father.style.left = boundLeft + 'px';
      // append小球到页面中
      document.body.appendChild(father);
      setTimeout(() => {
        // 目标left - 所点元素left + 目标元素宽度的一半（修正落点）
        father.style.transform = 'translate3d(' + (targetLeft - boundLeft + targetData.width / 2) + 'px, 0px, 0px)';
        child.style.cssText = 'transform: translate3d(0px, ' + (targetTop - boundTop) + 'px, 0px);';
        // 运动结束后删掉小球
        setTimeout(() => {
          // 移除小球
          father.parentNode.removeChild(father);
          // 购物车添加弹弹弹的css
          this.$refs.carIcon.classList.add('tantantan');
        }, 500);
      }, 10);
    },
    submitForm () {
      // this.$router.push('/pay')
    },
    // 获取菜品列表
    getgoodslist () {
      var starttime = new Date().getTime()
      var form = {
        app_id: this.$appId,
        nonce: this.$mobile.getRandom(0, 1000000) + '',
        method: 'v3.good.lists'
      }
      form.sign = this.$mobile.mysign(form);
      Indicator.open()
      this.$http.post(this.$ajaxurl, form)
        .then(response => {
          Indicator.close()
          if (response.data.status) {
            this.goodslist = response.data.data.category
            this.loadingtime = new Date().getTime() - starttime
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
.food-wrap{
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 45px;
  background-color: #fff;
  overflow-y: scroll;
  padding-top: 40px;
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
    &.active{
      color: #FFD006;
    }
  }
}
.food-list{
  padding: 10px 0;
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
      display: flex;
      .img{
        width: 60px;
        line-height: 0;
        margin-right: 5px;
        img{
          max-width: 100%;
        }
      }
      .info{
        flex: 1;
        padding-top: 5px;
        h3{
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 5px;
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
          line-height: 30px;
          strong{
            color: #F45706;
          }
          .add_remove_btn{
            float: right;
            display: flex;
            span{
              width: 30px;
              line-height: 20px;
              text-align: center;
              font-size: 12px;
            }
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
  z-index: 9999;
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
/* 购物车 */
.sp_lists{
  padding-bottom: 50px;
  width: 100%;
  background: #fff;
  font-size: 12px;
  header{
    border-bottom: 1px solid #eee;
    padding: 5px 10px;
    height: 25px;
    line-height: 25px;
    color: #666;
    .sp_words{
      padding: 0 5px;
      border-left: 3px solid #FFD006;
      font-size: 12px;
    }
    .clear{
      float: right;
      font-size: 12px;
      padding-left: 20px;
      position: relative;
      i.icon{
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -12px;
      }
    }
  }
  ul.sp_content{
    max-height: 180px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    li{
      height: 30px;
      border-bottom: 1px solid #eee;
      padding: 5px 10px;
      line-height: 30px;
      > div{
        float: left;
      }
      .food_name{
        width: 50%;
        font-size: 12px;
      }
      .food_unit_price{
        width: 20%;
        text-align: right;
        color: #f60;
      }
      .food_nub{
        float: right;
        text-align: right;
        display: flex;
        i.icon{
          margin-top: 5px;
        }
        span{
          line-height: 30px;
          width: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
