<template>
    <div class="status">
        <van-overlay :show="show">
            <div class="wrapper">
                <van-loading type="spinner" />
            </div>
        </van-overlay>
        <div class="statusconter" v-if="!show">
            <div>
                <div>
                    <van-icon name="checked" v-if="type==1"/>
                    <van-icon name="close" v-if="type==0"/>
                    <div>{{type==1?'订单支付成功':'订单创建失败'}}</div>
                </div>
                
            </div>
            <div class="orderId">
                <van-cell title="订单编号" :value="orderId" />
            </div>
            
            <van-cell title="下单时间"  :value="Time" />
            <van-cell title="支付方式"  arrow-direction="down" :value="mypayType" />
            <van-cell title="支付金额"  :value="pay_price" />
            <div class="button">
                <van-button round type="danger" :to="`/orderdetail/${orderId}`">查看订单</van-button>
                <van-button round plain type="danger" to="/">返回首页</van-button>
            </div>
            
            
        </div>
        
    </div>
</template>
<script>
export default {
    props:['orderKey','payTypes','siteids'],
    data(){
        return{
            show:true,
            pay_price:'',
            Time:'',
            orderId:'',
            mypayType:'',
            type:0,
        }
    },
    methods:{
    },
    created(){
        this.$axios.post('/api/order/create/'+this.orderKey,{
          addressId: this.siteids,
          bargainId: 0,
          combinationId: 0,
          couponId: 0,
          from: "weixinh5",
          mark: "",
          payType: this.payTypes,
          phone: "",
          pinkId: 0,
          real_name: "",
          seckill_id: 0,
          shipping_type: 1,
          store_id: 0,
          useIntegral: 0
        }).then(da=>{
            console.log(da);
            this.orderId=da.data.data.result.orderId;
            this.$axios.get('/api/order/detail/'+this.orderId).then(d=>{
                console.log(d.data.data)
                this.mypayType=d.data.data._status._payType;
                this.type=d.data.data._status._type;
                this.Time=d.data.data._pay_time;
                this.pay_price=d.data.data.pay_price;
                this.show = false;
            })
        })
    }
}
</script>
<style lang="less">
.status{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    width: 375px;
    height: 100vh;
    background-color: #f5f5f5;
    .orderId{
        span{
            font-size: 13.5px;
        }
    }
    .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
    .statusconter{
        width: 345px;
        margin: 0 auto;
        padding-top: 100px;
        .button{
            background-color: white;
            display: flex;
            &>button{
                flex: 1;
            }
        }
        &>div{
                &:first-child{
                padding-top: 40px;
                background-color: white;
                text-align: center;
                position: relative;
                font-size: 18px;
                font-weight: bold;
                &>div{
                    width: 315px;
                    border-bottom: 1px solid #ccc;
                    margin: 0 auto;
                    padding-bottom: 10px;
                    .van-icon{
                    color: #e93323;
                    font-size: 50px;
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                }
                
            
            }
            
        }
    }
}
</style>