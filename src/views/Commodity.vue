<template>
    <div class="commodity">
        <div class="search">
            <div class="myinput">
                <van-search v-model="value" shape="round" background="#e93323" placeholder="请输入搜索关键词" />
            </div>
            <div class="myicon" @click="iconshow=!iconshow">
                <van-icon name="apps-o" v-show="iconshow"/>
                <van-icon name="qr" v-show="!iconshow"/>
            </div>
        </div>
        <van-grid>
            <van-grid-item>
                <template #text>
                    <div class="text">
                        {{title}}
                    </div>
                </template>
            </van-grid-item>
            <van-grid-item @click="aa">
                <template #text>
                    <div class="jg">
                        价格
                        <div class="jg_icon">
                            <li v-show="jgiconshow"></li>
                            <li v-show="jgiconshows"></li>
                        </div>
                    </div>
                </template>
            </van-grid-item>
            <van-grid-item @click="bb">
                <template #text>
                    <div class="jg">
                        销量
                        <div class="jg_icon">
                            <li v-show="xliconshow"></li>
                            <li v-show="xliconshows"></li>
                        </div>
                    </div>
                </template>
            </van-grid-item>
            <van-grid-item @click="news">
                <template #text>
                    <div class="newstext" :style="{'color':newsindex==1?'red':''}">
                        新品
                    </div>
                </template>
            </van-grid-item>
        </van-grid>
            <commodity-card :item="commoditydata" v-if="newsindex==1?true:iconshow"></commodity-card>
            <card-vertical :item="commoditydata" v-if="newsindex==1?false:!iconshow"></card-vertical>
    </div>
</template>
<script>
import CardVertical from '../components/CardVertical.vue';
import CommodityCard from '../components/CommodityCard.vue';
export default {
  components: { 
    CommodityCard,
   CardVertical,
   },
    props:['id'],
    data(){
        return{
            commoditydata:[],
            xin:true,
            value:'',
            iconshow:true,
            jgiconshow:false,
            jgiconshows:false,
            xliconshow:false,
            xliconshows:false,
            indexicon:0,
            indexiconxiaoliang:0,
            newsindex:0,
            priceOrder:'',
            salesOrder:'',
            searchshow:true,
        }
    },
    created(){
        this.title=this.$route.query.title;
        this.search();
    },
    methods: {
        aa(){
            this.salesOrder="";
            this.xliconshow=false;
            this.xliconshows=false;
            this.indexiconxiaoliang=0;
            this.indexicon++;
            if(this.indexicon==1){
                this.priceOrder="asc";
                this.jgiconshows=false;
                this.jgiconshow=true;
            }else if(this.indexicon==2){
                this.priceOrder="desc";
                this.jgiconshow=false;
                this.jgiconshows=true;
            }else if(this.indexicon==3){
                this.priceOrder="";
                this.jgiconshow=false;
                this.jgiconshows=false;
                this.indexicon=0;
            }
            if(this.searchshow){
                this.search();
            }else{
                this.new();
            }
            
        },
        bb(){
            this.priceOrder="";
            this.jgiconshow=false;
            this.jgiconshows=false;
            this.indexicon=0;
            this.indexiconxiaoliang++;
            if(this.indexiconxiaoliang==1){
                this.salesOrder="asc";
                this.xliconshows=false;
                this.xliconshow=true;
            }else if(this.indexiconxiaoliang==2){
                this.salesOrder="desc";
                this.xliconshow=false;
                this.xliconshows=true;
            }else if(this.indexiconxiaoliang==3){
                this.salesOrder="";
                this.xliconshow=false;
                this.xliconshows=false;
                this.indexiconxiaoliang=0
            }
            if(this.searchshow){
                this.search();
            }else{
                this.new();
            }
            
        },
        news(){
            this.newsindex++;
            if(this.newsindex==1){
                this.new();
                this.searchshow=false;
                console.log("新品")
            }else{
                console.log("不是新品")
                this.newsindex=0;
                this.search();
                this.searchshow=true;
            }
        },
        search(){
             this.$axios.get('/api/products',{
                 params:{
                    page: 1,
                    limit: 8,
                    keyword:'',
                    sid: this.id,
                    news: 0,
                    priceOrder:this.priceOrder,
                    salesOrder:this.salesOrder
                 }
             }).then(d=>{
                this.commoditydata=d.data.data;
                console.log(d)
            })
        },
        new(){
            //新品
             this.$axios.get('/api/products',{
                 params:{
                    page: 1,
                    limit: 8,
                    keyword:'',
                    sid: this.id,
                    news: 1,
                    priceOrder:this.priceOrder,
                    salesOrder:this.salesOrder
                 }
             }).then(d=>{
                this.commoditydata=d.data.data;
                console.log(d)
            })
        },
    },
    
}
</script>
<style lang="less">
li{
    list-style: none;
}
.commodity{
    .search{
        width: 375px;
        background-color: #e93323;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .myinput{
            width: 80%;
        }
        .myicon{
            display: flex;
            align-items: center;
            // padding: 10px;
            color: white;
            .van-icon{
                font-size: 24px;
            }
        }
    }
    .text{
        color: #fc4141;
        font-size: 13px;
    }
    .newstext{
        font-size: 13px;
    }
    .jg{
        position: relative;
        font-size: 13px;
        .jg_icon{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -20px;
            display: flex;
            align-items: center;
            li{
                &:first-child{
                    border-top: 10px solid red;
                    border-right: 10px solid transparent;
                    transform: rotate(45deg);
                }
                &:last-child{
                    border-top: 10px solid transparent;
                    border-right: 10px solid red;
                    transform: rotate(45deg);
                }
            }
        }
    }
}

</style>