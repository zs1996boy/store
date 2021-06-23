<template>
    <div v-if="detail" class="detail">
        <van-tabs v-model="active" scrollspy sticky>
            <van-tab  title="商品">
                    <van-swipe @change="onChange" :autoplay="3000" :show-indicators="false">
                            <van-swipe-item v-for="(image, index) in detail.storeInfo.slider_image" :key="index">
                                <img v-lazy="image" class="detailimg" />
                            </van-swipe-item>
                        
                        <template #indicator>
                            <div class="custom-indicator">{{ current + 1 }}/{{detail.storeInfo.slider_image.length}}</div>
                        </template>
                    </van-swipe>
                    <div class="myprices">
                        <div class="pricecontent">
                            <li>
                                <span>¥{{detail.storeInfo.price}}</span>
                                <span>¥{{detail.storeInfo.vip_price}}<img src="@/assets/vip.png" alt=""></span>
                            </li>
                            <li><van-icon name="share-o" /></li>
                        </div>
                        <div>
                            {{detail.storeInfo.store_name}}
                        </div>
                        <div>
                            <span>原价:¥{{detail.storeInfo.ot_price}}</span>
                            <span>库存:{{detail.storeInfo.stock}}</span>
                            <span>销量:{{detail.storeInfo.fsales}}</span>
                        </div>
                        <br/>
                    </div>
            </van-tab>
            <van-tab  title="评论">
                <div class="comment">
                    <div>
                        <li>用户评价(0)</li>
                        <li><span>0%</span>好评率</li>
                    </div>
                </div>
            </van-tab>
            <van-tab  title="详情">
                <div class="detailhtml">
                    <div class="title">产品介绍</div>
                    <div v-html="detail.storeInfo.description" class="detailcontent"></div>
                </div>
            </van-tab>
        </van-tabs>
        
       
       
       <van-goods-action class="goodsaction">
            <van-goods-action-icon icon="chat-o" text="客服"  />
            <van-goods-action-icon icon="cart-o" text="购物车"  :badge="bnum" @click="addmycart"/>
            <van-goods-action-icon icon="shop-o" text="店铺"  />
            <van-goods-action-button type="warning" text="加入购物车" @click="addskucart" />
            <van-goods-action-button
                type="danger"
                text="立即购买"
                @click="addskucart"
            />
        </van-goods-action>

        <van-sku
            v-model="show"
            :sku="sku"
            :goods="goods"
            :goods-id="goodsId"
            @add-cart="addCart"
            @buy-clicked="buyclicked"
        />
    </div>
</template>
<script>
export default {
    props:["id"],
    data(){
        return {
            detail:null,
            show:false,
            current: 0,
            active:0,
            bnum:0,
            sku: {
                //初始化demo数据
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [],
                // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
                list: [],
                price:'0.00',
                stock_num: 227, // 商品总库存
                none_sku: false,  // 是否无规格商品 
                hide_stock: false  // 是否隐藏剩余库存
            },
            goods:{},
            goodsId:1
        }
    },
    created(){
        this.cartnum();
        this.axios.get('api/product/detail/'+this.id).then(d=>{
            // console.log(d)
            let arrs=d.data.data.productAttr;
            let listValue=d.data.data.productValue;
            // console.log("我是v的上头",listValue)
            this.detail=d.data.data;
            // console.log(this.detail);
            this.goods.picture=this.detail.storeInfo.image
            this.sku.stock_num=this.detail.storeInfo.stock;
            this.sku.price=this.detail.storeInfo.price;
            if(listValue.length==0){
                return
            }
            this.goodsId=this.id;
            // this.goods=d.data.data.storeInfo;
            //sku 数据转换
            let id=1;
            let idobj={};
            let ssk=1;
            this.sku.list=[];
            //获取产品属性里面第一个值默认图片
            this.goods.picture=listValue[Object.keys(listValue)[0]].image;
            //循环产品属性 组装购物车 属性tree
                this.sku.tree=arrs.map((atr,ads)=>{
                let va=atr.attr_value.map((at,index)=>{
                    id++;
                    idobj[at.attr]=id;
                    let attrs= {
                        id: id,
                        name: at.attr
                    }
                    if(ads<1){
                        attrs.imgUrl=listValue[Object.keys(listValue)[index]].image
                    }
                    return attrs;
                })
                var ks='s'+ssk;
                ssk++;
                return {
                        k: atr.attr_name,
                        k_id: atr.attr_name,
                        v: va,
                        k_s:ks
                }
            });
            
            //循环产品属性组合,组装sku 列表
            for(let key in listValue){
                let v=listValue[key];
                let keys=key.split(',');
                this.sku.list.push({
                    id: v.unique,
                    price: v.price*100, //价格
                    s1: idobj[keys[0]],
                    s2: idobj[keys[1]],
                    stock_num: v.stock, //库存 
                    goods_id: v.product_id,
                    imgUrl:v.image   
                });
            }
        });
    },
    methods:{
        addskucart(eve){
            this.show=true;
            console.log("你点击了购物车",eve)
        },
        addmycart(){
            this.$router.push('/cart')
        },
        cartnum(){
            this.$axios.get('/api/cart/list').then(dat=>{
                        console.log(dat);
                        if(dat.data.status!=200){
                            this.$toast(
                            {
                                message:"登录已失效",
                                icon:"warning-o",
                                onClose:()=>{
                                    this.$router.push('/login')
                                }
                            }
                        )
                        }
                        let arraynum=dat.data.data.valid;
                        let num=0;
                        for(let j=0;j<=arraynum.length-1;j++){
                            num+=arraynum[j].cart_num;
                        }
                        this.bnum=num;
                        console.log(this.bnum)
                    });
        },
        buyclicked(event){
            console.log("下单",event);
            this.show=false;
            if(event.selectedSkuComb==undefined){
                this.$axios.post('/api/cart/add',{
                    cartNum: event.selectedNum,
                    new: 1,
                    productId: this.id,
                    uniqueId:''
                }).then(d=>{
                    this.$router.push('/order/'+d.data.data.cartId)
                })
                return
            }
            this.$axios.post('/api/cart/add',{
                    cartNum: event.selectedNum,
                    new: 1,
                    productId: this.id,
                    uniqueId:event.selectedSkuComb.id
            }).then(d=>{
                this.$router.push('/order/'+d.data.data.cartId)
            })
        },
        addCart(event){
            console.log(event);
            this.show=false;
            if(event.selectedSkuComb==undefined){
                this.$axios.post('/api/cart/add',{
                    cartNum: event.selectedNum,
                    new: 0,
                    productId: this.id,
                    uniqueId:''
                }).then(d=>{
                    console.log(d)
                    this.cartnum();
                })
                return
            }
            this.$axios.post('/api/cart/add',{
                    cartNum: event.selectedNum,
                    new: 0,
                    productId: this.id,
                    uniqueId:event.selectedSkuComb.id
            }).then(d=>{
                console.log(d)
                this.cartnum();
            })
        },
         onChange(index) {
      this.current = index;
    },
    }
}
</script>
<style lang="less">
li{
    list-style: none;
}
.detail{
    width: 375px;
    background-color: #f5f5f5;
    position: relative;
    .myprices{
        background-color: white;
        div{
            &:nth-child(2){
                color: #333;
                font-weight: bold;
                font-size: 16px;
                width: 345px;
                margin: 0 auto;
            }
            &:nth-child(3){
                font-size: 12px;
                color: #82848f;
                width: 345px;
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
                margin-top: 11px;
            }
        }
        .pricecontent{
        display: flex;
        width: 345px;
        margin: 0 auto;
        padding-top: 10px;
        justify-content: space-between;
        li{
            &:first-child{
                span{
                    &:first-child{
                        font-size: 24px;
                        font-weight: bold;
                        color: #fc4141;
                    }
                    &:last-child{
                        margin-left: 6.5px;
                        font-size: 14px;
                        img{
                            height: 10px;
                        }
                    }
                }
            }
        }
    }
    
    }
    .comment{
                font-size: 14px;
                color: #282828;
                width: 100%;
                background-color: #fff;
                text-align: center;
                line-height: 34px;
                margin: 10px 0;
                div{
                    width: 354px;
                    display: flex;
                    justify-content: space-between;
                    margin: 0 auto;
                    li{
                        &:last-child{
                            span{
                                color: #fc4141;
                            }
                        }
                    }
                }
    }
     .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 50px;
    padding: 2px 5px;
    font-size: 12px;
    background: transparent;
  }
    .detailimg{
        display: block;
        width: 375px;
        height: 375px;
    }
    .goodsaction{
        z-index: 99;
    }
    .detailhtml{
        .title{
                font-size: 15px;
                color: #282828;
                width: 100%;
                background-color: #fff;
                text-align: center;
                line-height: 34px;
        }
        .detailcontent{
            width: 375px;
            font-size: 14px;
            overflow: hidden;
            .content{
                width: 375px!important;
            }
            img{
                width: 375px!important;
            }
        }
    }
}

</style>