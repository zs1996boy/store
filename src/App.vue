<template>
  <div id="main">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <div class="imgbutton" ref="touchhome"
    style="right:10px;top:500px;z-index:9999999"
      >
      <div @touchstart.stop="touchstart"
      @touchmove.stop.prevent="touchmov">
        <van-image
        class="img"
        round
        :src="!imgcontentshow?imgs:imgss"
        @click="imgcontentshow=!imgcontentshow"
      />
      </div>
      
      <div class="imgcontent" v-if="imgcontentshow">
        <van-icon name="home-o" color="#fff" @click="myindex"/>
        <van-icon name="shopping-cart-o" color="#fff" @click="mycart"/>
        <van-icon name="contact" color="#fff" @click="myMy"/>
      </div>
      </div>
    <!-- <van-overlay :show="showoverlay"/> -->
    <div class="paddingBottom"></div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import img from "@/assets/open.gif"
import imgs from "@/assets/close.gif"
export default {
  data(){
    return {
      imgs:img,
      imgss:imgs,
      imgcontentshow:false
    }
  },
  components: { NavBar },
  methods: {
     touchstart(e) {
       console.log(this);
      this.offsetTop = this.$refs.touchhome.offsetTop;
      this.y = e.changedTouches[0].clientY;
    },
    touchmov(e) {
      if (
        this.offsetTop + (e.changedTouches[0].clientY - this.y) > 0 &&
        this.offsetTop + (e.changedTouches[0].clientY - this.y) < 500
      ) {
        document.querySelector(".imgbutton").style.top =
          this.offsetTop + (e.changedTouches[0].clientY - this.y) + "px";
      }
    },
    myindex(){
      this.$router.push('/')
    },
    mycart(){
      this.$router.push('/cart')
    },
    myMy(){
      this.$router.push('/my')
    }

  },
};
</script>
<style lang="less">
#main{
  .imgbutton{
    position: fixed;
    // bottom: 120px;
    // right: 10px;
    display: flex;
    flex-direction: row-reverse;
    // z-index: 9999999;
    .img{
    width: 50px;
    height: 50px;
    transform: rotate(90deg);
  }
  .imgcontent{
    background-color: #f44939;
    width: 150px;
    border-radius: 50px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .van-icon{
      margin: 0 5px;
      font-size: 20px;
    }
  }
  }
  
}
.paddingBottom{
  padding-bottom: 50px;
}

</style>
