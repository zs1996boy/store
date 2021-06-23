<template>
  <div class="order">
    <div class="form">
        <van-form @submit="onSubmit">
    <van-tabs v-model="active" @disabled="mytab">
      <van-tab title="快速配送">
        <van-contact-card
          type="edit"
          :name="currentContact.name"
          :tel="currentContact.tel"
          @click="onEdit"
      /></van-tab>
      <van-tab title="到店自提" disabled>内容 2</van-tab>
    </van-tabs>
    <div class="mycart">
      <div>
        <div>共<span>{{orderdata.length}}</span>件商品</div>
        <div class="cartconter">
          <van-card
            :price="item.productInfo.attrInfo.price"
            :desc="item.productInfo.attrInfo.suk"
            v-for="item in orderdata" :key="item.id"
          >
          <template #thumb>
              <img :src="item.productInfo.attrInfo.image" alt="" class="cartimg">
          </template>
            <template #title>
                <div class="cardtitle">
                    <li>{{item.productInfo.store_name}}</li>
                    <li>x{{item.cart_num}}</li>
                </div>
            </template>
          </van-card>
        </div>
      </div>
    </div>


    
            <!-- 优惠券单元格 -->
            <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
            />
            <!-- 优惠券列表 -->
            <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;"
            >
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
            />
            </van-popup>
             <div  class="van-cell aa" >
              <div>积分抵扣</div>
              <div class="jifeng">当前积分<span>{{loginUser.integral}}</span>
                <van-checkbox-group v-model="result" direction="horizontal" checked-color="#f44939">
                  <van-checkbox></van-checkbox>
                </van-checkbox-group>
              </div>
            </div>
            <div class="van-cell aa">
              <li>
                会员优惠
              </li>
              <li>
                -¥<span>{{vipPrice}}</span>
              </li>
              </div>
            <div class="van-cell aa">
              <li>快递费用</li>
              <li>{{storePostage|myprices()}}</li>
            </div>

            <!-- 留言 -->
            <div class="myfield">
              <van-field
              v-model="message"
              rows="5"
              autosize
              label="备注消息"
              type="textarea"
              maxlength="150"
              placeholder="请添加备注(150字以内)"
              show-word-limit
            />
            </div>
            

            <div class="pay">
              <div>支付方式</div>
              <div :class="[showcolor?'bordercolor':'','van-cell','bb']" @click="showcolor=!showcolor">
                <li>
                  <van-icon name="wechat" />微信支付
                </li>
                <li>微信快捷支付</li>
              </div>

              <div :class="[!showcolor?'bordercolor':'','van-cell','bb']" @click="showcolor=!showcolor">
                <li><van-icon name="gold-coin" class="color"/>余额支付</li>
                <li>可用余额:{{loginUser.now_money}}</li>
              </div>
            </div>


            <div class="totalprices van-cell aa">
              <div>商品总价:</div>
              <div>¥{{totalPrice}}</div>
            </div>
            <div class="totalprices van-cell aa" v-if="storePostage>0">
              <div>运费:</div>
              <div>+¥{{storePostage}}</div>
            </div>
        <div style="margin: 16px;">
            <div>
              <van-submit-bar :price="total_price" button-text="立即结算" native-type="submit"/>
            </div>
            



            <my-status v-if="Statusshow" :orderKey="orderKey" :payTypes="payType" :siteids="siteid"></my-status>
        </div>
</van-form>
    </div>

  </div>
</template>
<script>
import { Toast } from "vant";
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
import {mapGetters} from 'vuex'
import MyStatus from '../components/MyStatus.vue';
export default {
  components: { MyStatus },
  computed:{
    ...mapGetters(['loginUser']),
  },
  props: ["id"],
  data() {
    return {
      payType:'yue',
      siteid:0,
      myid:'',
      storePostage:'',
      Statusshow:false,
      showcolor:false,
      totalPrice:'',
      vipPrice:'',
      total_price:null,
      result:[],
      message:'',
        showList:false,
        chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
        checkbox: false,
      active: 0,
      orderdata:[],
      currentContact: {
        name: "张三",
        tel: "13000000000",
      },
    };
  },
  filters:{
       myprices(value){
            if(value==0){
              return "免运费"
            }
            return "¥"+value
        }
    },
  methods: {
      onSubmit(){
        console.log(this.showcolor)
          if(this.showcolor==true){
            if(this.Statusshow==false){
              this.$toast({
              message: "不支持微信,支付失败",
              icon: "warn-o",
            })
            }
            this.Statusshow=true;
            this.payType='weixin';
            return
          }else{
            this.Statusshow=true;
            this.payType='yue';
          }
      },
    mytab() {
      this.$toast({
        message: "暂时无门店信息,您无法选择到店自提!",
        icon: "close",
      });
    },
    onEdit() {
      Toast("编辑");
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(code);
    },
  },
  created() {
  //  console.log(this.$store.getters.loginUser);
    this.$axios
      .post("/api/order/confirm", {
        cartId: this.id,
      })
      .then((d) => {
        this.orderdata=d.data.data.cartInfo;
        console.log(d.data.data.addressInfo);
        this.siteid=d.data.data.addressInfo.id;
        this.currentContact.name=d.data.data.addressInfo.real_name;
        this.currentContact.tel=d.data.data.addressInfo.phone;
        this.storePostage=d.data.data.priceGroup.storePostage;
        this.totalPrice=d.data.data.priceGroup.totalPrice;
        
        this.vipPrice=d.data.data.priceGroup.vipPrice;
        this.orderKey=d.data.data.orderKey;
        this.myid=d.data.data.addressInfo.id;
        this.$axios.post("/api/order/computed/"+this.orderKey,{
            addressId: this.myid,
            couponId: 0,
            payType: this.payType,
            shipping_type: 1,
            useIntegral: 0
        }).then(dd=>{
          this.total_price=Number(dd.data.data.result.pay_price)*100;
        })
        console.log(d)
      })
  },
};
</script>
<style lang="less">
li{
    list-style: none;
}
.order{
  .bordercolor{
    border-color: #fc4141  !important;
  }
  .jifeng{
    display: flex;
    span{
      color: #fc4141;
      margin-left: 5px;
    }
    .van-checkbox{
      margin: 0 0 0 5px;
    }
  }
  .pay{
    border-top: 10px solid #eee;
    border-bottom: 10px solid #eee;
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bb{
        justify-content: space-between;
        border: 1px solid #eee;
        li{
          &:last-child{
            color: #AAA;
            font-size: 13px;
          }
        }
        .van-icon{
          font-size: 15px;
          color: #fffdf2;
          padding: 5px;
          background-color: #5ab035;
          border-radius: 50%;
          margin-right: 5px;
        }
        .color{
          background-color: #fe960f;
        }
      }
    &>div{
      width: 345px;
      font-size: 15px;
      margin: 8px 0;
    }
  }
  .myfield{
    .van-cell__title{
    height: 160px;
    }
    .van-field__control{
      background-color: #f9f9f9;
      text-indent: 1em;
    }
  }
  
  .aa{
    justify-content: space-between;
  }
    .mycart{
        margin-top: 10px;
        &>div{
            border: 1px solid #ccc;
            &>div{
                &:first-child{
                    font-size: 15px;
                    padding: 5px 20px;
                    border-bottom: 1px solid #ccc;
                }
            }
        }
    }
    .cartimg{
        width: 65px;
        height: 65px;
    }
    .cartconter{
        .van-card{
        margin: 10px 0;
        height: 90px;
        background-color: white;
        position: relative;
        &:last-child{
            .van-card__header{
            border-bottom: none;
            
            }
        }
        .van-card__header{
            border-bottom: 1px solid #ccc;
        }
        }
    }
    
    .van-card__bottom{
        position: absolute;
        bottom: 20px;
    }
    
    .van-card__price{
        color: red;
    }
    .cardtitle{
        display: flex;
        li{
            font-size: 14px;
            &:first-child{
                display: block;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                width: 80%;
            }
            &:last-child{
                display: block;
                width: 20%;
                text-align: right;
            }
        }
    }
}
</style>