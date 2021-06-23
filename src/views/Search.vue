<template>
    <div class="search">
        <div>
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                >
                <template #action>
                    <div @click="onSearch">搜索</div>
                </template>
            </van-search>
        </div>

        <div class="hot">
            <div>
                热门搜索
            </div>
            <div>
                <li v-for="(item,index) in search" :key="index" @click="click(item)">{{item}}</li>
            </div>
        </div>

        <div class="productList" v-if="!(list==undefined)">
        <div v-for="k in list" :key="k.id" @click="xianqing(k.id)">
              <van-card
                :title="k.store_name"
                :thumb="k.image"
              >
              <template #price>
                <div class="vipprice">
                      ¥{{k.vip_price}}
                    <span><img src="@/assets/vip.png" alt=""></span>
                    <span>已售{{k.sales}}{{k.unit_name|formatNum}}</span>
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
        </div>
    </div>



    <commodity-card :item="commoditydata" v-if="!list.length"></commodity-card>



    </div>
</template>
<script>
import CommodityCard from '../components/CommodityCard.vue';
export default {
     components: { 
    CommodityCard,
 },
    data(){
        return{
            value:'',
            search:[],
            list:[],
            commoditydata:[],
        }
    },
    created() {
        this.$axios.get('/api/search/keyword').then(d=>{
            this.search=d.data.data
        })
    },
    methods: {
        onSearch(){
            console.log(this.value)
            this.$axios.get('/api/products?page=1&limit=20&keyword='+this.value).then(d=>{
                this.list=d.data.data
            })
            if(this.list.length<=0){
                this.$axios.get('/api/product/hot?page=1&limit=20').then(da=>{
                   this.commoditydata=da.data.data
                })
            }
        },
         xianqing(id){
            this.$router.push(`/detail/${id}`)
            },

        click(event){
            this.value=event;
            this.$axios.get('/api/products?page=1&limit=20&keyword='+event).then(d=>{
                this.list=d.data.data
            })
        }
    },
    filters: {
    formatNum(value) {
      if(value==''){
          return "件";
      }
      return value
    },
  },
}
</script>
<style lang="less">
li{
    list-style: none;
}
.search{
    .hot{
        &>div{
            &:first-child{
                font-size: 14px;
                color: #999;
                width: 345px;
                margin: 10px auto;
            }
            &:last-child{
                display: flex;
                width: 345px;
                margin: 0 auto;
                padding-bottom: 15px;
                border-bottom: 0.5px solid #eee;
                li{
                    border: 1px solid #ccc;
                    font-size: 13px;
                    padding: 5px 10px;
                    margin-left: 10px;
                    &:first-child{
                        margin-left: 0px;
                    }
                }
            }
        }
    }




    .productList{
      .van-card__title{
        font-size: 14px;
      }
      .van-card{
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




}
</style>