<template>
    <div class="orderlist">

        <div>
            <div>
                <div>
                    <li>订单信息</li>
                    <li>累计订单:<span>{{order}}</span>总消费:<span>¥{{sum}}</span></li>
                </div>
                <div>
                    <img :src="img" alt="">
                </div>
                <div>
                    <van-tabs v-model="active" :ellipsis="false">
                        <van-tab>
                            <template #title>
                                <div @click="type=0">
                                    <li>待付款</li>
                                    <li>{{unpaid-num-nums}}</li>
                                </div>
                                
                            </template>
                        </van-tab>
                        <van-tab>
                            <template #title>
                                <div @click="type=1">
                                    <li>待发货</li>
                                    <li>{{unshipped+nums}}</li>
                                </div>
                            </template>
                        </van-tab>
                        <van-tab>
                            <template #title>
                                <div @click="type=2">
                                    <li>待收货</li>
                                    <li>{{received}}</li>
                                </div>
                            </template>
                        </van-tab>
                        <van-tab>
                            <template #title>
                                 <div @click="type=3">
                                     <li>待评价</li>
                                    <li>{{evaluated}}</li>
                                </div>
                            </template>
                        </van-tab>
                        <van-tab>
                            <template #title>
                                 <div @click="type=4">
                                     <li>已完成</li>
                                    <li>{{complete}}</li>
                                </div>
                            </template>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </div>

        <div class="return" @click="$emit('returns',false)"><van-icon name="share" /></div>
        <cart-main :type="type" @xiugaishuju="xiugaishuju" @xiugaishujus="xiugaishujus"></cart-main>
    </div>
</template>
<script>
import img from '@/assets/orderTime.png'
import CartMain from '@/components/CartMain'
export default {
    props:['unpaid','unshipped','evaluated','complete','received','order','sum','typenum'],
    components: { CartMain },
    data(){
        return{
            type:this.typenum,
            img,
            num:0,
            nums:0,
            active: this.typenum,
            obligation:[],
        }
    },
    methods: {
        xiugaishuju(event){
            this.num=event
        },
        xiugaishujus(event){
            this.nums=event
        }
    },
    
}
</script>
<style lang="less">
.orderlist{
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height: 100vh;
    background-color: #f5f5f5;
    overflow-y: auto;
    .return{
        position: absolute;
        top: 5px;
        left: 10px;
        transform: rotateY(-180deg);
        color: #fff;
    }
    &>div{
        &:first-child{
            background-color: #e93323;
            margin-bottom: 50px;
            &>div{
                width: 345px;
                margin: 0 auto;
                &:first-child{
                    padding: 30px 0;
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    &>div{
                        &:first-child{
                            &>li{
                                &:first-child{
                                    font-size: 17px;
                                    color: #fff;
                                }
                                &:last-child{
                                    font-size: 13px;
                                    color: hsla(0,0%,100%,.8);
                                }
                            }
                        }
                        &:nth-child(2){
                            width: 61px;
                            img{
                                width: 60px;
                                height: 60px;
                            }
                        }
                        &:nth-child(3){
                            left: 0;
                            bottom: -40px;
                            position: absolute;
                            width: 345px;
                            text-align: center;
                            .van-tabs__wrap{
                                height: 70px;
                                li{
                                    padding: 2px 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
    
}
</style>