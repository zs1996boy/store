<template>
  <div class="hotnewgoods">
    <!-- 轮播图2 -->
    <div class="swipes">
      <van-swipe :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(image, index) in bastBanner" :key="index">
          <img v-lazy="image.img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="titleconter">
      <div class="title">
        <div class="line"></div>
        <div class="name">
          <span>
              <van-icon name="gem-o" v-if="num==1"/>
              <van-icon name="fire-o" v-if="num==2"/>
              <van-icon name="new-arrival-o" v-if="num==3"/>
              <van-icon name="todo-list-o" v-if="num==4"/>
          </span>{{titltdata[num-1]}}
        </div>
        <div class="line"></div>
      </div>
    </div>


    <div class="productList" v-if="!(num==4)">
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



    <div v-if="num==4">
        <div v-for="item in list" :key="item.id" class="promotioncommodity" @click="xianqing(item.id)">
            <van-card
                :thumb="item.image"
            >
            <template #title>
                <div class="promotioncommodityfront">
                {{item.store_name}}
                </div>
            </template>
                <template #price>
                <div class="promotioncommoditycentre">
                    <li>促销价:¥{{item.price}}</li>
                </div>
                </template>

                <template #bottom>
                <div class="promotioncommodityfinally">
                    <li>
                    <span><s>日常价:&nbsp;&nbsp;&nbsp;¥{{item.ot_price}}</s></span>
                    <span>仅剩:{{item.stock}}{{item.unit_name|formatNum}}</span>
                    </li>
                </div>
                </template>
            </van-card>
        </div>
    </div>



  </div>
</template>
<script>
export default {
  props: ["num"],
  data() {
    return {
      bastBanner: [],
      list:[],
      titltdata:['精品推荐','热门榜单','新品首发','促销单品']
    };
  },
  created() {
    this.$axios
      .get("/api/groom/list/" + this.num + "?page=1&limit=20")
      .then((d) => {
        this.list=d.data.data.list;
        this.bastBanner=d.data.data.banner;
      });
  },
  methods: {
      xianqing(id){
      this.$router.push(`/detail/${id}`)
    },
  },
  filters: {
    formatNum(value) {
      if(value==''){
          return "件";
      }
      return value
    },
  },
};
</script>
<style lang="less">
li{
    list-style: none;
}
.hotnewgoods {
  .swipes {
    width: 375px;
    margin: 0 auto;
    .van-swipe-item {
      height: 141px;
    }
    img {
      width: 100%;
      height: 141px;
    }
  }
  .titleconter{
      width: 375px;
      background-color: #f5f5f5;
    .title{
      width: 345px;
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      .line{
            width: 100px;
            height: 1px;
            background-color: #e9e9e9;
        }
        .name{
            display: flex;
            align-items: center;
            .van-icon{
                font-size: 16px;
                 display: flex;
                align-items: center;
                text-align: center;
                margin-right: 5px;
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



    .promotioncommodity{
      display: flex;
      align-items: center;
      height: 125px;
      border-bottom: 1px solid #ccc;
      .van-card{
        background-color: white;
        padding: 0px 0px 0px 15px;
      }
      .promotioncommodityfront{
        font-size: 15px;
        width: 247px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .promotioncommoditycentre{
        padding-bottom: 10px;
        width: 247px;
        li{
            color: #fff;
            display: inline-block;
            text-align: justify;
            padding: 3px 8px;
            background-image: linear-gradient(to right,#fcad05,#ff3e1e);
            border-radius: 14px 0px 14px 0px;
          
        }
      }

      .promotioncommodityfinally{
        width: 247px;
        li{
            position: relative;
            span{
              
                color: #999;
              &:last-child{
                position: absolute;
                right: 0;
                top: 0;
              }
            }
          }
      }
    }
 
}
    
</style>