<template>
    <div>新增地址
        <van-button round type="danger">返回首页</van-button>
        <add-address></add-address>
    </div>
</template>
<script>
import AddAddress from '@/components/AddAddress'
export default {
    components: { AddAddress },
  data() {
    return {}
  },
  methods: {
  },
};
</script>