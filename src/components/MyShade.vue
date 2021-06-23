<template>
    <div class="zhezhao">
      <van-overlay :show="show">
        <div class="wrapper" @click.stop>
          <van-image :src="jzimg" class="block">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>
      </van-overlay>
    </div>
</template>
<script>
import jzimg from '@/assets/加载.gif'
export default {
    props:['show'],
    data(){
        return{
            jzimg:jzimg
        }
    }
}
</script>
<style lang="less">
&.zhezhao{
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        z-index:9999;
      }

      .block {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
</style>