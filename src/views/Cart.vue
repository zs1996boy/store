<template>
    <div class="cart">
        <div class="carthead">
            <span><van-icon name="passed" />100%正品保证</span>
            <span><van-icon name="passed" />所有商品精挑细选</span>
            <span><van-icon name="passed" />售后无忧</span>
        </div>
        <div>
            <div>
                <li>购物数量<span>{{this.cart.length}}</span></li>
                <li>
                    <button @click="buttonshow=!buttonshow">{{buttonshow==true?"管理":"取消"}}</button>
                </li>
            </div>
        </div>
        <div v-if="cart">
            <van-checkbox-group v-model="result" ref="checkboxGroup">
            <div v-for="(item,index) in cart" :key="item.id" class="maincart"
            >
                    <van-checkbox 
                    :name="item.id"
                     @click="toggle(index)"
                    clickable 
                    :checked-color="buttonshow==true?'red':'#ccc'"
                    ref="checkboxes"
                     :v-model="true"
                     ></van-checkbox>
                    <div class="cartconter">
                        <van-image
                        fit="cover"
                        :src="item.productInfo.image"
                        />
                        <div class="cartconter_a">
                            <li>{{item.productInfo.store_name}}</li>
                            <li>{{item.productInfo.attrInfo.suk}}</li>
                            <li>{{item.truePrice}}</li>
                        </div>
                        <van-stepper integer 
                        :value="item.cart_num" 
                        @plus="plus(index)" 
                        @minus="minus(index)"
                        v-model="item.cart_num" 
                        @change="cartvalue"
                        />
                    </div>
                    
                
            </div>
            </van-checkbox-group>
        </div>

        <div class="cartbotton">
            <div>
                <van-button type="primary" round color="#999999" plain @click="checkAll">全选</van-button>
                <van-button type="info" round color="#999999" plain @click="toggleAll">反选</van-button>
            </div>
            <div>
                <span>¥{{mymoney.toFixed(2)}}</span>
                <van-button type="default" round color="#999999" plain v-if="!buttonshow" @click="del">删除</van-button>
                <router-link :to="`/order/${this.result}`"><van-button type="danger" round v-if="buttonshow" color="#e93323">立即下单</van-button></router-link>
            </div>
            
            
        </div>
        <div class="paddingBotton"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            ids:null,
            buttonshow:true,
            myindex:0,
            num:0,
            mymoney:0,
            result:[],
            cart:[]
        }
    },
    methods: {
        del(){
            this.$axios.post('/api/cart/del',{
                ids:this.result
            }).then(d=>{
                if(d.data.status==200){
                    this.$toast({
                    message:"删除成功",
                    icon:"passed",
                })
                this.mymoney=0;
                }
                this.datalist();
            })
        },
        toggle(index){
            this.ids=this.cart[index].id;
            //当前所点击的复选框
            if(this.$refs.checkboxes[index].checked){//当前的复选框是否选中
                //如果选中就加上当前的金额
                this.mymoney+=this.cart[index].truePrice*this.cart[index].cart_num;
            }else{
                //如果从选中状态切到没选中状态,就减去当前的金额
                this.mymoney-=this.cart[index].truePrice*this.cart[index].cart_num;
            }
        },
        checkAll() {
            //全选
            this.$refs.checkboxGroup.toggleAll(true);
            this.countmoney()
        },
        countmoney(){
            // 计算总金额
            let aa=this.cart;
            let money=0;
            let num=0;
            let price=0;
            for(let i=0;i<aa.length;i++){
                num=Number(aa[i].cart_num);
                price=Number(aa[i].truePrice);
                money+=num*price
            }
            this.mymoney=money;
        },
         toggleAll() {
             //反选
            this.$refs.checkboxGroup.toggleAll();
            console.log(this.$refs.checkboxGroup)
                console.log(this.$refs.checkboxes)
                let fanxuan=0;
                for(let j=0;j<this.$refs.checkboxes.length;j++){
                    if(!this.$refs.checkboxes[j].checked){
                        fanxuan+=this.cart[j].truePrice*this.cart[j].cart_num;
                    }
                }
                this.mymoney=fanxuan;
        },
        cartvalue(value){
            //加减数量变化时触发
            this.num=value;
        },
        plus(index){
            //加
            this.myindex=index;
            this.mymoney+=this.cart[index].truePrice;
        },
        minus(index){
            //减
            this.myindex=index;
            this.mymoney-=this.cart[index].truePrice;
        },
        datalist(){
            this.$axios.get('/api/cart/list').then(d=>{
            console.log(d);
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
                this.cart=d.data.data.valid;
            }
        })
        }
    },
    created(){
        this.datalist();
    },
    watch:{
        num(newdata,old){
            console.log(newdata,old);
            this.$axios.post('/api/cart/num',{
                        id: this.cart[this.myindex].id,
                        number: newdata
                }).then(da=>{
                    console.log(da)
                })
        }
    }
}
</script>
<style lang="less">
li{
    list-style: none;
}
.cart{
    width: 375px;
    height: 100vh;
    background-color: #f5f5f5;
    .cartbotton{
        background-color: #fafafa;
        position: fixed;
        width: 375px;
        height: 40px;
        bottom: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div{
            &:first-child{
                display: flex;
                align-items: center;
                margin-left: 10px;
                button{
                   height: 30px;
                   margin-left: 5px;
                }
            }
            &:last-child{
                margin-right: 12px;
                display: flex;
                align-items: center;
                button{
                    height: 30px;
                }
                &>span{
                    font-size: 16px;
                    margin-right: 10px;
                    color: #fc4141;
                }
            }
        }
    }
    &>div{
        &:nth-child(2){
            font-size: 14px;
            width: 100%;
            background-color:white;
            div{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                width: 92%;
                margin: 0 auto;
                li{
                    span{
                        margin-left: 5px;
                        color: #fc4141;
                    }
                    button{
                        font-size: 13px;
                        color: #282828;
                        border: 1px solid #868686;
                        background-color: transparent;
                        border-radius: 2px;
                        padding: 2px 13px;
                    }
                }
            }
        }


        &:nth-child(3){
            
            .maincart{
                background-color: white;
                width: 100%;
                height: 105px;
                margin: 10px auto;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .van-checkbox{
                    width: 30px;
                    margin-left: 20px;
                }
                .van-checkbox-group{
                    width: 100%;
                    height: 100%;
                    display: flex;
                }
                .cartconter{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .van-image{
                        display: block;
                        width: 80px;
                        height: 80px;
                        border-radius: 10px;
                        overflow: hidden;
                    }
                    div{
                        font-size: 14px;
                        &.cartconter_a{
                            color: tomato;
                            width: 180px;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                        }
                        &.van-stepper{
                            position: absolute;
                            bottom: 10px;
                            right: 10px;
                        }
                    }
                }
                
                
            }
        }
    }
    .carthead{
        width: 92%;
        height: 38px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span{
            font-size: 12px;
            color: #8c8c8c;
            display: flex;
            align-items: center;
        }
    }



    .paddingBotton{
        width: 357px;
        padding-bottom: 100px;
    }
}
</style>