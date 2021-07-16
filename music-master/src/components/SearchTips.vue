<template>
    <div>
        <p>搜索提示:<span v-show="songs.length<=0"></span></p>
        <ul v-for="item in songs" :key="item.id">
            <li @click.stop="$emit('submits',{value:item.name})">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['value'],
    data(){
        return{
            songs:[]
        }
    },
    created(){
        this.Mydata(this.value);
    },
    watch:{
        value(newValue){
            this.Mydata(newValue);
        }
    },
    methods:{
        Mydata(value){
            this.axios.get("/search/suggest?keywords="+value).then(d=>{
            this.songs=d.data.result.songs;
            })
        },
        clicks(event){
            this.value=event;
        }
    }
}
</script>
<style lang="less" scoped>
div{
    padding: 0 8vw;
    p{
        text-indent: 0.5em;
        color: #f12391;
    }
    ul{
        padding: 10px;
    }
}
</style>