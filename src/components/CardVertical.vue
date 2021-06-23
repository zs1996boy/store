<template>
<div>
    <div class="productLists">
      <img src="../assets/noGood.png" alt="" v-if="item.length==0" class="productListimg">
      <div class="vertical" v-for="k in item" :key="k.id">
          <img :src="k.image" alt="">
          <p>{{k.store_name}}</p>
          <div class="price">¥{{k.price}}</div>
          <div class="vipprice">
                ¥{{k.vip_price}}
            <span><img src="@/assets/vip.png" alt=""></span>
            <span>已售{{k.sales}}件</span>
            </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
    props:['item'],
    data(){
      return{
        items:[]
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
<style lang="less" scoped>
.productLists{
    width: 375px;
    display: flex;
    flex-wrap: wrap;
    .productListimg{
    width: 200px;
    padding: 50px 0;
    display: block;
    margin: 0 auto;
  }
   .vertical{
       margin: 8px;
       border-radius: 8px;
       box-shadow: 1px 1px 5px 1px #ccc;
       overflow: hidden;
       font-size: 12px;
       width: 168px;
       display: flex;
       flex-direction: column;
       img{
           display: block;
           width: 168px;
           height: 172px;
       }
       p{
           padding: 0;
           margin: 0 0 5px 5px;
           height: 20px;
           font-size: 15px;
           white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
       }
       &>div{
           height: 20px;
           margin: 0 0 0 8px;
           &.price{
            color: #fc4141;
            font-size: 17px;
            font-weight:bold;
            margin-bottom: 5px;
           }
           &.vipprice{
            width: 168px;
            position: relative;
            display: flex;
        span{
          img{
              width: 20px;
            height: 10px;
          }
          &:first-child{
            margin-right: 11px;
          }
          &:nth-child(2){
            color: #aaa;
            margin: 0 10px;
          }
        }
           }
       }
   } 
}
</style>