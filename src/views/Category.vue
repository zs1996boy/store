<template>
    <div class="category">
        <div class="myinput">
            <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @click="input"/>
        </div>
        <div class="categorytab">
            <van-tabs  scrollspy sticky class="mytab" v-model="active">
                <van-tab v-for="cate in category" :key="cate.id" :title="cate.cate_name" class="mytabb">
                    <div class="right">
                        <li>{{cate.cate_name}}</li>
                        <ul class="children">
                        <!-- 循环子分类 -->
                        <li v-for="c in cate.children" :key="c.id">
                            <router-link tag="div" :to='`/commodity/${c.id}?title=${c.cate_name}`'>
                                <van-image :src="c.pic"/>
                                <span>{{c.cate_name}}</span>
                            </router-link>
                        </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        

        <!-- 遮罩层 -->
        <my-shade :show="show"></my-shade>
    </div>
</template>
<script>
import MyShade from '@/components/MyShade'
export default {
     components: { MyShade },
    data() {
    return {
      value: '',
      category:[],
      active:0,
      show:true
    };
  },
   created(){
       this.show=true;
    this.$axios.get('api/category').then(d=>{
      this.category=d.data.data;
      this.show=false;
    })
    
  },
  methods: {
      input(){
          this.$router.push('/search')
      }
  },
}
</script>
<style lang="less">
.category{
    .van-tabs__content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .van-tabs__line{
            opacity: 0;
        }
    .van-tab--active{
        color: #fc4141;
        border-left: 3px solid #fc4141;
        box-sizing: border-box;
    }
    .right{
        // border: 1px solid red;
        &>li{
            // background-color: royalblue;
            text-align: center;
            font-size: 16px;
            list-style: none;
            position: relative;
            &::after{
                content: "";
                margin-left: 5px;
                position: absolute;
                width: 50px;
                height: 1px;
                background-color: #999;
                top: 50%;
                right: 15px;
                transform: translateY(-50%);
            }
            &::before{
                content: "";
                margin-right: 5px;
                position: absolute;
                width: 50px;
                height: 1px;
                background-color: #999;
                top: 50%;
                left: 15px;
                transform: translateY(-50%);
            }
        }
        .children{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li{
                width: 30%;
                margin: 10px 0;
            }
            span{
                font-size: 12px;
                display: block;
                text-align: center;
            }
        }
    }
    .myinput{
        width: 375px;
        position: fixed;
        z-index: 9;
    }
    .categorytab{
        position: absolute;
        top: 50px;
        padding-bottom: 60px;
        // background-color: chocolate;
        .mytab{
            display: flex;
            &>div{
                &:first-child{
                    position: fixed;
                    overflow-y: auto;
                    height: 570px;
                    width: 90px;
                    .van-tabs__wrap{
                        height: auto;
                    }
                    .van-tabs__nav{
                        display: flex;
                        width: 90px;
                        flex-wrap: wrap;
                        height: auto;
                        .van-tab{
                            height: 40px;
                        }
                    }
                }
                &:last-child{
                    margin-left: 90px;
                    .mytabb{
                        width: 80%;
                        padding-top: 40px;
                    }
                }
            }
        }
    }
    
}
</style>