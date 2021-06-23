<template>
    <div class="changepassword">
         <van-form @submit="xiuonSubmit">
                <div class="zhuce">当前手机号:<span>{{phone|data()}}</span></div>
                <van-field
                    v-model="xiupassword"
                    type="password"
                    name="xiupassword"
                    placeholder="设置新密码"
                    :rules="[
                    { pattern:/^\w{4,10}$/,message:'密码由4~10位数字,大小写字母组成'}
                    ]"
                />
                <van-field
                    v-model="xiupasswords"
                    type="password"
                    name="xiupasswords"
                    placeholder="确认新密码"
                    @blur="blur(xiupasswords)"
                    :rules="[
                    { pattern:/^\w{4,10}$/,message:'密码由4~10位数字,大小写字母组成'}
                    ]"
                />
                 <van-field
                    v-model="xiusms"
                    name="xiusms"
                    center
                    clearable
                    placeholder="填写验证码"
                    >
                <template #button>
                    <van-button size="small" type="primary" round @click.stop.prevent="sms" color="linear-gradient(to right, #f55d45, #fe8b3c)">发送验证码</van-button>
                </template>
                </van-field>
                <div style="margin: 30px;">
                    <van-button round block type="info" native-type="submit" color="linear-gradient(to right, #f55d45, #fe8b3c)">确定修改</van-button>
                </div>
            </van-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            phone:'',
            xiupassword:'',
            xiupasswords:'',
            xiusms:'',
            yes:false,
            smskey:'',
        }
    },
    created() {
        //1.获取发送短信的key
        this.axios.get('/api/verify_code').then(d=>{
            console.log(d);
            this.smskey=d.data.data.key;//获取发送短信的key
        });
        this.$axios.get('/api/userinfo').then(d=>{
            console.log(d)
            this.phone=d.data.data.phone
        })
    },
    methods: {
        sms(){
            if(this.yes==true){
            console.log("发送成功")
            this.$axios.post('api/register/verify',{
            key:this.smskey,//发送验证码的key
            phone:this.phone,//当前手机号
            code:''
        }).then(d=>{
            console.log("获取验证码",d);
            d=d.data;
            if(d.status==200){
                //发送成功
                this.$toast(d.msg)
            }else{
                this.$toast(d.msg)
            }
        })
            }else{
                console.log("发送失败")
            }
        },
        xiuonSubmit(event){
            console.log(event)
            this.$axios.post('/api/register/reset',{
                account: this.phone,
                captcha: event.xiusms,
                code: "",
                password: event.xiupasswords
            }).then(d=>{
                this.$toast(d.data.msg)
                if(d.data.status==200){
                    this.$router.go(-1);
                }
            })
        },
        blur(value){
            if(this.xiupassword==value){
                console.log("验证成功")
                this.yes=true
            }else{
                this.$toast("两次密码不一样")
                this.yes=false
            }
        }
    },
    filters:{
        data(value){
            let a=value.substring(0,3);
            let b=value.substring(7)
            return a+'****'+b
        }
        
    }
}
</script>
<style lang="less">
.changepassword{
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height: 100vh;
    background-color: white;
    z-index: 9;
    .zhuce{
        margin-top: 30px;
        display: flex;
        justify-content: center;
        font-size: 16px;
        align-items: center;
        font-weight: bold;
        span{
            color: #333;
            font-weight: normal;
        }
    }
}
</style>