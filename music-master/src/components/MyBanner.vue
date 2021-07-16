<template>
  <div class="my_banner_html">
    <ul v-if="!isshow">
      <transition-group @after-leave="afterLeave">
        <img
          :src="item.imageUrl"
          alt=""
          v-for="(item, index) in banner"
          :key="index"
          :style="{'opacity':(showIndex==index?'1':'0')}"
          @click="right"
        />
      </transition-group>
    </ul>
    <div v-if="isshow" class="box_bj">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components:{
  },
  data() {
    return {
      banner: [],
      showIndex: 0,
      isEnd: true,
      intervalID:null,
      isshow:true
    };
  },
  mounted() {
     //轮播图
    this.isshow=true;
    this.$nextTick(()=>{
      this.$axios.get("/banner").then((d) => {
      this.banner = d.data.banners.splice(0, 4);
      this.isshow=false;
    });
    })
    //加载组件并渲染完成
    this.autostart();
  },
  beforeDestroy() {
    this.stop(); //销毁定时器..
  },
  methods: {
    stop() {
      clearInterval(this.intervalID);
    },
    autostart() {
      this.intervalID = setInterval(() => {
        this.right();
      }, 3000);
    },
    right() {
      if (!this.isEnd) return;
      this.showIndex++;
      if (this.showIndex >= this.banner.length) {
        this.showIndex = 0;
        this.isEnd = false;
      }
    },
    afterLeave() {
      this.isEnd = true;
    },
  },
};
</script>
<style lang="less" scoped>
.my_banner_html {
  width: 100vw;
  ul {
    position: relative;
    width: 100vw;
    height: 40vw;
    overflow: hidden;
    }
    img {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 1s 0s linear;
    }
    .box_bj{
      position: relative;
      width: 100vw;
      height: 40vw;
      background-color: rgb(238, 238, 238);
      &>.spinner{
        position: absolute;
        width: 10vw;
        height: 10vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        justify-content: space-around;
      }
.spinner > div {
  background-color: #f12391;
  height: 100%;
  width: 6px;
  display: inline-block;
   
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
    }
  }
</style>