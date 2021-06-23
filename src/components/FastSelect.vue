<template>
    <div class="fastselect">
      <div>
         <div>
          <li>{{select[0]}}<span><slot></slot></span></li>
          <li>{{select[1]}}</li>
        </div>
        <div @click="click">更多<van-icon name="arrow" size="12px"/></div>
      </div>
    </div>
</template>
<script>
export default {
    props:['select','num'],
    methods: {
      click(){
        if(this.num==undefined){
          this.$router.push('/category')
        }else{
          this.$router.push('/hotnewgoods/'+this.num)
        }
        }
        
      
    },
}
</script>
<style lang="less" scoped>
li{list-style: none;}
.fastselect{
      padding-top: 17px;
      width: 375px;
      height: 39px;
      display: flex;
      justify-content: center;
      &>div{
        width: 345px;
        display: flex;
        justify-content: space-between;
        &>div{
          &:first-child{
          li{
            &:first-child{
              font-size: 16px;
              color: #282828;
              font-weight: bold;
              position: relative;
              span{
                position: absolute;
                top: 0px;
                color: #fc4141;
                font-size: 10px;
              }
            }
            &:last-child{
              font-size: 14px;
              color: #999;
            }
          }
        }

        &:last-child{
          min-width: 40px;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        }
        
      }
    }
</style>