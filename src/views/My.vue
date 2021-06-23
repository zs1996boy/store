<template>
    <div class="Mypage" v-if="loginUser">
        <div>
            <li><van-icon name="setting-o"  @click="setMy"/></li>
            <ul class="Mymain">
            <div>
                <van-image
                round
                width="2rem"
                height="2rem"
                fit="cover"
                :src="loginUser.avatar"
                />
            </div>
            <div>
                <li>{{loginUser.nickname}}<span><img :src="loginUser.vip_icon" alt="">{{loginUser.vip_name}}</span></li>

                <li>ID:{{loginUser.uid}}</li>
            </div>
        </ul>
        <ul class="Mymoney">
            <div>
                <div>
                <li>我的余额</li>
                <li>{{loginUser.now_money}}</li>
            </div>
            <div>
                <li>当前佣金</li>
                <li>0.00</li>
            </div>
            <div>
                <li>优惠券</li>
                <li>0</li>
            </div>
            </div>
            
        </ul>
    </div>
    <div>
        <van-cell title="我的订单">
            <template #default>
                <div @click="aa">全部订单 &gt;</div>
            </template>
        </van-cell>
        <van-grid :border="false">
            <van-grid-item :icon="img1" text="待付款" :badge="unpaid_count" @click="clicktype(0)"/>
            <van-grid-item :icon="img2" text="待发货" :badge="pay_count" @click="clicktype(1)"/>
            <van-grid-item :icon="img3" text="待收货" @click="clicktype(2)"/>
            <van-grid-item :icon="img4" text="待评价" @click="clicktype(3)"/>
            <van-grid-item :icon="img5" text="售后/退款" @click="clicktype(4)"/>
        </van-grid>
    </div>

    <div>
        <van-cell title="我的服务"/>
        <van-grid square :border="false">
            <van-grid-item v-for="(value,index) in imglist" :key="value.id" :icon="value.pic" :text="value.name" :to="url[index]"/>
        </van-grid>
    </div>
        <order-list 
        v-if="orderlistshow" 
        :unpaid="unpaid_count" 
        :unshipped="unshipped_count"
        :received="received_count"
        :complete="complete_count"
        :evaluated="evaluated_count"
        :order="order_count"
        :sum="sum_price"
        :typenum="typenum"
        @returns="returns"
        ></order-list>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import img1 from "@/assets/download01.png"
import img2 from "@/assets/download02.png"
import img3 from "@/assets/download03.png"
import img4 from "@/assets/download04.png"
import img5 from "@/assets/download05.png"
import OrderList from '@/components/OrderList.vue'
export default {
  components: { OrderList },
    data(){
        return{
            url:['/none','/none','/none','/none','/none','/none','/none','/none'],
            img1,
            img2,
            img3,
            img4,
            img5,
            typenum:0,
            unshipped_count:'',
            evaluated_count:'',
            complete_count:'',
            received_count:'',
            pay_count:'',
            unpaid_count:'',
            order_count:'',
            orderlistshow:false,
            imglist:[],
            loginUser:[],
        }
    },
    created(){
        this.$axios.get('/api/user').then(d=>{
            console.log(d);
            this.pay_count=d.data.data.orderStatusNum.order_count;
            this.unpaid_count=d.data.data.orderStatusNum.unpaid_count;//待支付
            this.unshipped_count=d.data.data.orderStatusNum.unshipped_count;//待发货
            this.evaluated_count=d.data.data.orderStatusNum.evaluated_count;//待评价
            this.complete_count=d.data.data.orderStatusNum.complete_count;//已完成
            this.received_count=d.data.data.orderStatusNum.received_count;//待收货
            this.order_count=d.data.data.orderStatusNum.order_count//总订单
            this.sum_price=d.data.data.orderStatusNum.sum_price//总金额
            if(d.data.status!=200){
                this.$toast(
                {
                    message:"登录已失效",
                    icon:"warning-o",
                    onClose:()=>{
                        this.$router.push('/login')
                    }
                
                })
                return
            }else{
                this.loginUser=d.data.data;
            }
        })
        this.$axios.get('/api/menu/user').then(d=>{
            this.imglist=d.data.data.routine_my_menus;
            console.log(d.data.data.routine_my_menus)
        })
    },
    methods:{
        returns(event){
            this.orderlistshow=event
        },
       clicktype(event){
           //待收款
            this.orderlistshow=true;
            this.typenum=event;
       },
        aa(){
            console.log("全部订单");
            if(this.orderlistshow==true){
                this.orderlistshow=false;
            }else{
                this.orderlistshow=true;
            }
        },
        setMy(){
            this.$router.push("/mydata")
        },
        ...mapMutations(['LoginOut'])
    },
}
</script>
<style lang="less">
li{
    list-style: none;
}
.Mypage{
    width: 375px;
    background-color: #f5f5f5;
    height: 100vh;
    &>div{
            &:first-child{
                            background-color: #e93323;
                            border-radius: 0 0 30px 30px;
                            position: relative;
                            padding-top: 30px;
                            margin-bottom: 50px;
                        &>li{
                            top: 20px;
                            right: 10px;
                            position: absolute;
                            font-size: 18px;
                            text-align: right;
                            color: white;
                        }
                        .Mymain{
                    display: flex;
                    align-items: center;
                    &>div{
                        &:first-child{
                            margin-left: 10px;
                        }
                        &:last-child{
                            width: 260px;
                            margin-left: 20px;
                            &>li{
                                font-size: 16px;
                                &:nth-child(1){
                                    display: flex;
                                    align-items: center;
                                    color: white;
                                    span{
                                        margin-left: 10px;
                                        display: flex;
                                        align-items: center;
                                        img{
                                            display: block;
                                            width: 16px;
                                        }
                                    }
                                }
                                &:nth-child(2){
                                    color: #f6ada7;
                                    font-size: 13px;
                                }
                            }
                        }
                    }
                }
        
             }
             &:nth-child(2){
                 width: 345px;
                 margin: 0 auto;
                 .van-grid{
                     .van-grid-item{
                             flex-basis: 20% !important;
                     }
                 }
             }

             &:nth-child(3){
                 width: 345px;
                 margin: 10px auto;
             }



    .Mymoney{
        position: relative;
        height: 30px;
        &>div{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        &>div{
            color: #aaaaaa;
            margin: 20px 0;
            padding-right:30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right:1px solid #ccc;
            li{
                &:last-child{
                    color: #565656;
                }
            }
            &:last-child{
                border: none;
                padding-right: 0;
            }
        }
        display: flex;
        width: 345px;
        justify-content: space-around;
        font-size: 16px;
        height: 70px;
        background: #ffffff;
        margin: 0 auto;
    }
    }
    }
    
}
</style>