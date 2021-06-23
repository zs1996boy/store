<template>
<div>
    <div class="productList" v-show="items">
      <img src="../assets/noGood.png" alt="" v-if="item.length==0" class="productListimg">
      <div v-show="item.length==0">
        <div v-for="k in items" :key="k.id">
          <router-link :to='`/detail/${k.id}`'>
              <van-card
                :title="k.store_name"
                :thumb="k.image"
              >
              <template #thumb>
                <img :src="k.image" alt="" class="cardimg">
              </template>
              <template #tags>
                <div class="prices">
                  <p>¥{{k.price}}</p>
                </div>
              </template>
              </van-card>
              </router-link>
        </div>
        
      </div>
      
        <div v-for="k in item" :key="k.id">
          <router-link :to='`/detail/${k.id}`'>
              <van-card
                :title="k.store_name"
                :thumb="k.image"
              >
              <template #price>
                <div class="vipprice">
                      ¥{{k.vip_price}}
                    <span><img src="@/assets/vip.png" alt=""></span>
                    <span>已售{{k.sales}}件</span>
                    <span>
                        <van-icon name="shopping-cart-o"/>
                    </span>
                </div>
              </template>
              <template #price-top>
                <div class="prices">
                  <p>¥{{k.price}}</p>
                </div>
              </template>
              </van-card>
              </router-link>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['item'],
    data(){
      return{
        items:[],
      }
    },
    methods: {
        
    },
    created(){
      this.$axios.get('/api/product/hot',{
        params:{
          page: 1,
          limit: 20
        }
      }).then(d=>{
        this.items=d.data.data;
      })
    }
}
</script>
<style lang="less">
.productList{
  width: 375px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .productListimg{
    width: 200px;
    padding: 50px 0;
    display: block;
  }
  .cardimg{
    display: block;
    width: 90px;
    height: 90px;
  }
      .van-card__title{
        font-size: 14px;
      }
      .van-card{
        width: 375px;
        background-color: white;
        padding: 0px 0px 0px 15px;
      }
      .van-card__title{
        display:block;
        width: 247px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .prices{
        font-weight: bold;
        color: #fc4141;
        font-size: 16px;
      }
      .van-card__price{
        *{
          font-size: 10px;
        }
      }
      .van-card__header{
        display: flex;
        align-items: center;
      }
      .van-card__content{
        padding: 12px 12px 12px 0px;
        border-bottom: 1px solid #f5f5f5;
      }
      .van-card__thumb{
              margin-right:15px;
            }
      .vipprice{
        width: 240px;
        position: relative;
        span{
          img{
            height: 10px;
          }
          &:first-child{
            margin-right: 11px;
          }
          &:nth-child(2){
            color: #aaa;
          }
          &:last-child{
            position: absolute;
            right: 0px;
            top: -8px;
            .van-icon{
              color: #fc4141;
              border: 1px solid #fc4141;
              border-radius: 50%;
              padding: 5px;
              font-size: 13px;
            }
          }
        }
        
      }
    }
</style>