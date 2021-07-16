<template>
    <div>
        <p>热门搜索:</p>
        <ul v-for="(item,index) in hots" :key="index">
            <li @click.stop="$emit('submits',{value:item.first})">{{item.first}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            hots:[]
        }
    },
    created(){
        this.axios.get("/search/hot").then(d=>{
            this.hots=d.data.result.hots;
            console.log(this.hots)
        })
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
        width: 100%;
        li{
            border: 1px solid #ccc;
            float: left;
            line-height: 30px;
            padding: 0 5px;
            margin: 2px 5px;
            font-size: 14px;
            border-radius: 30px;
        }
    }
}
</style>