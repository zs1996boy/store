<template>
  <div>
    <div class="mian" v-show="!show">
      <div class="search">
        <van-image :src="logoUrl" />
        <van-search
          placeholder="请输入搜索关键词"
          shape="round"
          @click="Search"
        />
      </div>
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="#fff">
          <van-swipe-item v-for="(image, index) in banner" :key="index">
            <img v-lazy="image.pic" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="mygrid">
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="item in menus" :key="item.id">
            <van-image :src="item.pic">
              <template v-slot:loading>
                <van-loading type="spinner" size="20" />
              </template>
            </van-image>
            {{ item.name }}
          </van-grid-item>
        </van-grid>
      </div>
      <div class="journalism">
        <div>
          <img src="@/assets/xinwen.png" alt="" />
        </div>
        <van-swipe vertical :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="i in roll" :key="i.id"
            >{{ i.info }}<span><van-icon name="arrow" /></span
          ></van-swipe-item>
        </van-swipe>
      </div>
      <fast-select :select="select"></fast-select>

      <!-- 快速选择 -->
      <div class="box_clothing">
        <div>
          <div
            v-for="j in clothing"
            :key="j.id"
            @click="kuaisu(j.cate_name, j.id)"
          >
            <li><img :src="j.pic" alt="" /></li>
            <li>{{ j.cate_name }}</li>
          </div>
        </div>
      </div>

      <!-- 精品更多 -->
      <fast-select :select="selectone" :num="1"></fast-select>

      <!-- 轮播图2 -->
      <div class="swipes">
        <van-swipe :autoplay="3000" indicator-color="red">
          <van-swipe-item v-for="(image, index) in bastBanner" :key="index">
            <img v-lazy="image.img" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 精品推荐 -->
      <div class="productList">
        <div v-for="k in bastList" :key="k.id" @click="xianqing(k.id)">
          <van-card :title="k.store_name" :thumb="k.image">
            <template #price>
              <div class="vipprice">
                ¥{{ k.vip_price }}
                <span><img src="@/assets/vip.png" alt="" /></span>
                <span>已售{{ k.sales }}{{ k.unit_name | formatNum }}</span>
                <span>
                  <van-icon name="shopping-cart-o" />
                </span>
              </div>
            </template>
            <template #price-top>
              <div class="prices">
                <p>¥{{ k.price }}</p>
              </div>
            </template>
          </van-card>
        </div>
      </div>

      <!-- 热门榜单 -->
      <div class="HotList">
        <div class="HotListBoxfront">
          <van-row type="flex" justify="space-around">
            <van-col span="18" class="HotListfront">
              <span>热门榜单</span>
              <span>根据销量、搜索、好评等综合得出</span>
            </van-col>
            <van-col span="2" class="HotListqueen"
              ><span @click="num(2)">更多<van-icon name="arrow" /></span
            ></van-col>
          </van-row>
        </div>

        <div class="HotListBox">
          <van-grid :border="false" :column-num="3">
            <van-grid-item
              v-for="item in firstList"
              :key="item.id"
              @click="xianqing(item.id)"
            >
              <van-image :src="item.image">
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <div class="HotListBoxcontent">
                <li>{{ item.store_name }}</li>
                <li>¥{{ item.price }}</li>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

      <!-- 新品首发 -->
      <fast-select :select="selecttwo" :num="3">NEW~</fast-select>
      <div class="newcontent">
        <div>
          <div v-for="j in firstLists" :key="j.id" @click="xianqing(j.id)">
            <li><img :src="j.image" alt="" /></li>
            <li>{{ j.store_name }}</li>
            <li>¥{{ j.price }}</li>
          </div>
        </div>
      </div>

      <fast-select :select="selectthree" :num="4"></fast-select>
      <div
        v-for="item in benefit"
        :key="item.id"
        class="promotioncommodity"
        @click="xianqing(item.id)"
      >
        <van-card :thumb="item.image">
          <template #title>
            <div class="promotioncommodityfront">
              {{ item.store_name }}
            </div>
          </template>
          <template #price>
            <div class="promotioncommoditycentre">
              <li>促销价:¥{{ item.price }}</li>
            </div>
          </template>

          <template #bottom>
            <div class="promotioncommodityfinally">
              <li>
                <span
                  ><s>日常价:&nbsp;&nbsp;&nbsp;¥{{ item.ot_price }}</s></span
                >
                <span
                  >仅剩:{{ item.stock }}{{ item.unit_name | formatNum }}</span
                >
              </li>
            </div>
          </template>
        </van-card>
      </div>
    </div>
    <!-- 遮罩层 -->
    <my-shade :show="show"></my-shade>
  </div>
</template>
<script>
import FastSelect from "@/components/FastSelect.vue";
import MyShade from "@/components/MyShade";
import { mapMutations } from "vuex";
export default {
  components: { FastSelect, MyShade },
  data() {
    return {
      logoUrl: "",
      banner: [],
      menus: [],
      roll: [],
      select: ["快速选择", "上百种商品分类任你选择"],
      selectone: ["精品推荐", "诚意推荐品质商品"],
      selecttwo: ["首发新品", "根据销量、搜索、好评等综合得出"],
      selectthree: ["促销单品", "库存商品优惠促销活动"],
      clothing: [],
      bastBanner: [],
      bastList: [],
      firstList: [],
      firstLists: [],
      benefit: [],
      show: true,
      datas: [],
    };
  },
  created() {
    this.show = true;
    this.$axios.get("/api/index").then((d) => {
      this.datas = d.data.data;
      this.logoUrl = d.data.data.logoUrl;
      this.banner = d.data.data.banner;
      this.menus = d.data.data.menus;
      this.roll = d.data.data.roll;
      this.bastBanner = d.data.data.info.bastBanner;
      this.bastList = d.data.data.info.bastList;
      this.firstLists = d.data.data.info.firstList;
      this.firstList = d.data.data.info.firstList.slice(0, 3);
      this.benefit = d.data.data.benefit;
      console.log(this.bastList);
      console.log(d.data.data);
      this.show = false;
    });
    this.$axios.get("/api/category").then((da) => {
      this.clothing = da.data.data[1].children; //服装
      console.log(this.clothing);
    });
  },
  filters: {
    formatNum(value) {
      if (value == "") {
        return "件";
      }
      return value;
    },
  },
  methods: {
    ...mapMutations(["showoverlay"]),
    kuaisu(name, id) {
      console.log(name, id);
      this.$router.push(`/commodity/${id}?title=${name}`);
    },
    xianqing(id) {
      this.$router.push(`/detail/${id}`);
    },
    num(num) {
      this.$router.push("/hotnewgoods/" + num);
    },
    Search() {
      this.$router.push("/search");
    },
  },
};
</script>
<style lang="less">
li,
ol,
ul {
  list-style: none;
}
.mian {
  div {
    //搜索
    &.search {
      display: flex;
      height: 49px;
      justify-content: center;
      align-items: center;
      .van-image {
        width: 63.5px;
        height: 22.5px;
        margin-right: 12.5px;
      }
      .van-search {
        width: 250px;
        padding: 0px 14px;
      }
    }
    //轮播图
    &.swipe {
      img {
        width: 375px;
        height: 187.5px;
      }
    }
    //宫格
    &.mygrid {
      font-size: 13px;
      .van-image {
        width: 45px;
        height: 45px;
      }
    }
    //新闻
    &.journalism {
      width: 375px;
      height: 38.5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #f4f4f4;
      border-bottom: 1px solid #f4f4f4;
      box-shadow: 0 3px 10px #f5f5f5;
      & > div {
        &:first-child {
          width: 74.5px;
          img {
            width: 62px;
            height: 14px;
          }
        }
      }
      .van-swipe {
        height: 20px;
        width: 240px;
        line-height: 20px;
        font-size: 14px;
      }
      .van-swipe-item {
        line-height: 20px;
        font-size: 14px;
        color: #666;
        position: relative;
        span {
          position: absolute;
          right: 0;
          top: 15%;
        }
      }
    }

    &.box_clothing {
      margin-top: 19px;
      width: 375px;
      height: 120px;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 15px;
      // background-color: blueviolet;
      & > div {
        width: 345px;
        height: 122px;
        // background-color: brown;
        overflow-x: auto;
        display: flex;
        overflow-y: scroll;
        & > div {
          padding: 0 5px;
          li {
            font-size: 14px;
            &:first-child {
              img {
                width: 90px;
                height: 90px;
                display: block;
              }
            }
            &:last-child {
              border-left: 1px solid #f5f5f5;
              border-right: 1px solid #f5f5f5;
              text-align: center;
            }
          }
        }
      }
    }

    &.swipes {
      width: 345px;
      margin: 0 auto;
      margin-top: 16px;
      .van-swipe-item {
        height: 150px;
      }
      img {
        width: 100%;
        height: 130px;
      }
    }

    &.productList {
      .van-card__title {
        font-size: 14px;
      }
      .van-card {
        background-color: white;
        padding: 0px 0px 0px 15px;
      }
      .van-card__title {
        display: block;
        width: 247px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .prices {
        font-weight: bold;
        color: #fc4141;
        font-size: 16px;
      }
      .van-card__price {
        * {
          font-size: 10px;
        }
      }
      .van-card__header {
        display: flex;
        align-items: center;
      }
      .van-card__content {
        padding: 12px 12px 12px 0px;
        border-bottom: 1px solid #f5f5f5;
      }
      .van-card__thumb {
        margin-right: 15px;
      }
      .vipprice {
        width: 240px;
        position: relative;
        span {
          img {
            height: 10px;
          }
          &:first-child {
            margin-right: 11px;
          }
          &:nth-child(2) {
            color: #aaa;
          }
          &:last-child {
            position: absolute;
            right: 0px;
            top: -8px;
            .van-icon {
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

    &.HotList {
      position: relative;
      height: 209px;
      background-color: transparent;

      &::after {
        position: absolute;
        background: url("../assets/index-bg.png") no-repeat 0 0;
        background-size: 100% 50%;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 208px;
        z-index: -1;
      }
      .HotListBox {
        position: absolute;
        width: 345px;
        height: 165px;
        background-color: white;
        border-radius: 14.7px;
        overflow: hidden;
        top: 43px;
        left: 16px;
        box-shadow: 0 0 3px 0.5px #aaa;
        .van-grid {
          .van-grid-item {
            .van-image {
              width: 98px;
              height: 98px;
            }
          }
        }
        .HotListBoxcontent {
          li {
            font-size: 14px;
            display: block;
            width: 90px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &:last-child {
              color: #fc4141;
              text-align: center;
              font-weight: 700;
            }
          }
        }
      }
      .van-col {
        font-size: 13px;
      }
      .HotListBoxfront {
        line-height: 43.5px;
        color: #fff;
      }
      .HotListfront {
        display: flex;
        align-items: flex-end;
        span {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:first-child {
            font-size: 17px;
            margin-right: 10px;
          }
        }
      }
      .HotListqueen {
        display: flex;
        align-items: flex-end;
        span {
          min-width: 40px;
          display: flex;
          align-items: center;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    &.promotioncommodity {
      display: flex;
      align-items: center;
      height: 125px;
      border-bottom: 1px solid #ccc;
      .van-card {
        background-color: white;
        padding: 0px 0px 0px 15px;
      }
      .promotioncommodityfront {
        font-size: 15px;
        width: 247px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .promotioncommoditycentre {
        padding-bottom: 10px;
        width: 247px;
        li {
          color: #fff;
          display: inline-block;
          text-align: justify;
          padding: 3px 8px;
          background-image: linear-gradient(to right, #fcad05, #ff3e1e);
          border-radius: 14px 0px 14px 0px;
        }
      }

      .promotioncommodityfinally {
        width: 247px;
        li {
          position: relative;
          span {
            color: #999;
            &:last-child {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
      }
    }

    &.newcontent {
      margin-top: 19px;
      width: 375px;
      height: 174px;
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 15px;
      // background-color: blueviolet;
      & > div {
        width: 345px;
        height: 174px;
        // background-color: brown;
        overflow-x: auto;
        display: flex;
        & > div {
          margin: 0 5px;
          border: 1.5px solid #e4e1e1;
          border-radius: 20px;
          box-sizing: border-box;
          li {
            font-size: 14px;
            &:first-child {
              img {
                width: 120px;
                height: 120px;
                display: block;
                overflow: hidden;
                border-radius: 18px 18px 0 0;
              }
            }
            &:nth-child(2) {
              text-align: center;
              width: 120px;
              text-indent: 1em;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &:last-child {
              color: #fc4141;
              text-align: center;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>