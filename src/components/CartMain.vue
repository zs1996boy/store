<template>
    <div class="cartmainmys">
        <van-loading color="#0094ff" v-if="!cartmainshow" class="cartmianLoading"/>
        <div v-if="cartmainshow">

        
        <div class="cartmian" v-for="item in obligation" :key="item.id"  @click="cartskip(item.order_id)">
                <van-cell-group>
                    <van-cell :title="item._add_time" :value="item._status._title" />
                    <div class="cartlistmy">
                        <div v-for="i in item.cartInfo" :key="i.id" class="cartlistmyconter">
                            <div>
                                <img :src="i.productInfo.image" alt="">
                            </div>
                            <div>
                                <li>{{i.productInfo.store_name}}</li>
                                <li><span>¥{{i.productInfo.price}}</span><span>x{{i.cart_num}}</span></li> 
                            </div>
                        </div>
                        <div>
                            共<span>{{item.total_num}}</span>件商品,总金额<span>¥{{item.total_price}}</span>
                        </div>
                    </div>
                    <div class="button" v-if="type==0">
                        <van-button round plain type="danger" @click.prevent.stop="cancel(item.order_id)">取消订单</van-button>
                        <van-button round type="danger" @click.prevent.stop="payment(item.order_id)">立即付款</van-button>
                    </div>
                    <div class="button" v-if="type==1">
                        <van-button round type="danger" @click.prevent.stop="cartskip(item.order_id)">查看详情</van-button>
                    </div>
                
                </van-cell-group>
            </div>
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

            <my-loading :loading="Loading"></my-loading>
    </div>
</template>
<script>
import MyLoading from '@/components/MyLoading'
export default {
    props:["type"],
    components:{MyLoading},
    data(){
        return{
            obligation:[],
            cartmainshow:false,
            num:0,
            show: false,
            loginUser:[],
            Loading:false,
            order_id:''
        }
    },
    created() {
        this.zongdata();
        this.$axios.get('/api/user').then(d=>{
            console.log(d);
            this.loginUser=d.data.data;
            })
    },
    methods: {
        payment(event){
            console.log("你点击了支付");
            this.show=true;
            this.order_id=event;
        },
        cancel(event){
            console.log("你点击了取消")
            this.$dialog.confirm({
            title: '提示',
            message: '确定取消订单?',
            })
            .then(() => {
                this.$axios.post('/api/order/cancel',{
                    id:event
                }).then(d=>{
                    console.log(d)
                    this.$toast({
                        message: d.data.msg,
                        icon: 'passed',
                    });
                    this.$emit('xiugaishuju',1)
                    this.zongdata()
                })
            })
            .catch(() => {
                
            });

        },
        cartskip(event){
            this.$router.push('/orderdetail/'+event)
        },
        zongdata(){
            this.$axios.get('/api/order/list?page=1&limit=20&type='+this.type).then(d=>{
            this.obligation=d.data.data;
            this.cartmainshow=true;
        })
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
                uni: this.order_id,
                }).then(d=>{
                    this.Loading=false;
                    this.$toast({
                        message: d.data.msg,
                    })
                    this.$emit('xiugaishujus',1)
                    this.zongdata()
                    // this.$router.go(0)
                })
            }else{
                this.$axios.post('/api/order/pay',{
                from: "weixinh5",
                paytype: "weixin",
                uni: this.order_id,
                }).then(d=>{
                    this.Loading=false;
                    this.$toast({
                        message: d.data.msg,
                    })

                    this.zongdata()
                })
            }
            this.show=false;
        }

    },
    watch:{
        type(a){
            this.cartmainshow=false;
            this.$axios.get('/api/order/list?page=1&limit=20&type='+a).then(d=>{
                this.obligation=d.data.data;
                this.cartmainshow=true;
            })
        }
    }
}
</script>
<style lang="less">
.cartmainmys{
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
    .Loading{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }
.cartmianLoading{
    display: flex;
    justify-content: center;
}
.cartmian{
            margin-bottom: 50px;
            margin: 10px auto;
            width: 345px;
            .van-cell__value{
                color: #fc4141;
            }
            .cartlistmy{
                &>div{
                    width: 345px;
                    // display: flex;
                    img{
                        width: 60px;
                    }
                    &.cartlistmyconter{
                        display: flex;
                        justify-content: space-around;
                        font-size: 14px;
                        &>div{
                            &:first-child{
                                width: 20%;
                            }
                            &:last-child{
                                width: 70%;
                                display: flex;
                                justify-content: space-evenly;
                                li{
                                    &:first-child{
                                        margin: 10px 0;
                                        width: 166px;
                                        word-break: break-all;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 2;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        height: 38px;
                                    }
                                    &:last-child{
                                        margin: 10px 0;
                                        width: 30%;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: flex-end;
                                        color: #999;
                                    }
                                }
                            }
                        }
                    }
                    &:last-child{
                        font-size: 13px;
                        width: 315px;
                        margin: 0 auto;
                        margin-bottom: 10px;
                        text-align: right;
                        span{
                            &:last-child{
                                color: #fc4141;
                                margin-left: 5px;
                            }
                        }
                    }
                    
                }
            }

            .button{
                border-top: 1px solid #ebedf0;
                padding: 10px 0;
                width: 315px;
                margin: 0 auto;
                display: flex;
                justify-content: flex-end;
                button{
                    margin-left: 5px;
                }
            }
        }
}
</style>