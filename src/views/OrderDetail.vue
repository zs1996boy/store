<template>
    <div class="ordertaildata" v-if="ordertaildata">
        <div>
            <div>
                <div><img :src="ordertaildata.status_pic" alt=""></div>
            <div>
                <li>{{status._msg}}</li>
                <li>{{ordertaildata._add_time}}</li>
            </div>
            </div>
        </div>
        <div>
            <van-steps :active="active" active-color="#e93323" class="mysteps">
                <van-step>待付款</van-step>
                <van-step>待发货</van-step>
                <van-step>待收货</van-step>
                <van-step>待评价</van-step>
                <van-step>已完成</van-step>
            </van-steps>
        </div>
        <div>
            <div>{{ordertaildata.real_name}}<span>{{ordertaildata.user_phone}}</span></div>
            <div>{{ordertaildata.user_address}}</div>
        </div>
        <div><img :src="img" alt=""></div>


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




    <div class="van-cell aa">
              <div>订单编号:</div>
              <div>{{ordertaildata.order_id}}</div>
    </div>
    <div class="van-cell aa">
              <div>下单时间:</div>
              <div>{{ordertaildata._add_time}}</div>
    </div>
    <div class="van-cell aa">
              <div>订单类型:</div>
              <div>普通订单</div>
    </div>
    <div class="van-cell aa">
              <div>支付状态:</div>
              <div>{{status._title}}</div>
    </div>
    <div class="van-cell aa">
              <div>支付方式:</div>
              <div>{{status._payType}}</div>
    </div>
    <div class="van-cell aa">
              <div>支付金额:</div>
              <div>¥{{ordertaildata.total_price}}</div>
    </div>
    <div class="van-cell aa bb">
        <div>实付款:<span>¥{{ordertaildata.total_price}}</span></div>
    </div>
    <div class="button" v-if="status._title=='未支付'">
        <van-button round plain type="danger" @click="no">取消订单</van-button>
        <van-button round type="danger" @click="atonce" >立即付款</van-button>
    </div>
    <div class="button" v-if="status._title=='未发货'">
        <van-button round plain type="danger" color="#ccc">申请退款</van-button>
    </div>
    <div>
        <van-action-sheet v-model="show" title="选择支付方式">
            <div class="tanchuangcontent">
                <div @click="pay(0)">
                    <div>
                        <van-icon name="wechat-pay" class="green"/>
                        <div class="tancontent">
                            <li>微信支付</li>
                            <li>使用微信快捷支付</li>
                        </div>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div @click="pay(1)">
                    <div>
                        <van-icon name="gold-coin" class="red"/>
                        <div class="tancontent">
                            <li>余额支付</li>
                            <li>当前可用余额:<span>{{loginUser.now_money}}</span></li>
                        </div>
                    </div>
                    <van-icon name="arrow" />
                </div>
                
            </div>
        </van-action-sheet>
    </div>
        <van-loading size="24px" color="#000" class="Loading" v-if="Loading">加载中...</van-loading>
    </div>
    
</template>
<script>
import img from '@/assets/line.jpg'
export default {
    props:['id'],
    data(){
        return{
            img,
            ordertaildata:[],
            status:[],
            active: 1,
            orderdata:[],
            show: false,
            loginUser:[],
            Loading:false,
        }
    },
    created() {
        this.$axios.get('/api/user').then(d=>{
            console.log(d);
            this.loginUser=d.data.data;
            })
        this.$axios.get('/api/order/detail/'+this.id).then(d=>{
            this.ordertaildata=d.data.data;
            this.status=d.data.data._status;
            if(this.status._title=="未支付"){
                this.active=0
            }else if(this.status._title=="已支付"){
                this.active=1
            }
            this.orderdata=d.data.data.cartInfo;
            console.log(this.ordertaildata.id)
        })
    },
    methods: {
        no(){
            this.$dialog.confirm({
            title: '提示',
            message: '确定取消订单?',
            })
            .then(() => {
                this.$axios.post('/api/order/cancel',{
                    id:this.ordertaildata.order_id
                }).then(d=>{
                    console.log(d)
                    this.$toast({
                        message: d.data.msg,
                        icon: 'passed',
                    });
                    this.$router.push('/my')
                })
            })
            .catch(() => {
                
            });
        },
        atonce(){
            this.show=true;
        },
        onCancel() {
        this.$toast('取消');
        },
        pay(event){
            this.Loading=true;
            if(event==1){
                this.$axios.post('/api/order/pay',{
                from: "weixinh5",
                paytype: "yue",
                uni: this.ordertaildata.order_id,
                }).then(d=>{
                    this.show=false;
                    this.Loading=false;
                    this.$toast({
                        message: d.data.msg,
                    })
                    this.$router.push('/')
                })
            }else{
                this.$axios.post('/api/order/pay',{
                from: "weixinh5",
                paytype: "weixin",
                uni: this.ordertaildata.order_id,
                }).then(d=>{
                    this.show=false;
                    this.Loading=false;
                    this.$toast({
                        message: d.data.msg,
                    })
                    // this.$router.push('/')
                })
            }
            
        }

    },
}
</script>
<style lang="less">
li{
    list-style: none;
}
.ordertaildata{
    .Loading{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }
    background-color: #f5f5f5;
    .aa{
    justify-content: space-between;
  }
  .bb{
      justify-content:flex-end;
      span{
          margin-left: 5px;
          color: red;
      }
  }
    width: 375px;
    &>div{
        &:first-child{
            width: 100%;
            background-color: #e93323;
            
            
            img{
                width: 55px;
                height: 55px;
            }
            &>div{
                height: 70px;
                width: 345px;
                display: flex;
            align-items: center;
            margin: 0 auto;
                &>div{
                    &:last-child{
                    color: #fff;
                    margin-left: 13.5px;
                    li{
                        &:first-child{
                            font-size: 15px;
                            font-weight: bold;
                            margin-bottom: 5px;
                        }
                        &:last-child{
                            font-size: 12px;
                        }
                    }
                }
                }
                
            }
        }


        //步骤条
        &:nth-child(2){
            background-color: #fff;
            width: 375px;
            .mysteps{
                width: 345px;
                margin: 0 auto;
            }
        }

        //地址
        &:nth-child(3){
            background-color: #fff;
            width: 375px;
            margin: 0 auto;
            &>div{
                width: 345px;
                margin: 0 auto;
                &:first-child{
                    font-size: 15px;
                    margin-bottom: 5px;
                    // margin-top: 15px;
                    span{
                        margin-left: 20px;
                    }
                }
                &:last-child{
                    font-size: 13px;
                    color:#868686;
                }
            }
        }

        //地址边框
        &:nth-child(4){
            background-color: #fff;
            margin-bottom: 10px;
            img{
                width: 375px;
                height: 1.5px;
            }
        }


        &.mycart{
            margin-bottom: 10px;
        .van-card{
            background-color: #fff;
            border-bottom: 1px solid #ccc;
            margin: 0;
        }
        &>div{
            // border: 1px solid #ccc;
            &>div{
                &:first-child{
                    font-size: 15px;
                    padding: 5px 20px;
                    background-color: #fff;
                    border-bottom: 1px solid #ccc;
                }
            }
        }
        .cartimg{
        width: 65px;
        height: 65px;
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
    }


    .button{
                border-top: 1px solid #ebedf0;
                background-color: #fff;
                width: 375px;
                padding: 5px 0;
                margin: 0 auto;
                margin-top: 10px;
                display: flex;
                justify-content: flex-end;
                button{
                    padding: 0px 10px;
                    height: 30px;
                    margin:0 10px;
                }
            }


    .tanchuangcontent{
        margin-bottom: 20px;
        .green{
            color: #09bb07;
        }
        .red{
            color: #ff9900;
        }
        &>div{
            display: flex;
            width: 360px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
            height: 65px;
            &>div{
                display: flex;
                align-items: center;
                .tancontent{
                    margin-left: 10px;
                    li{
                        &:first-child{
                            font-size: 16px;
                            color: #282828;
                        }
                        &:last-child{
                            font-size: 12px;
                            color: #999;
                            span{
                                margin-left: 5px;
                                color: #ff9900;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>