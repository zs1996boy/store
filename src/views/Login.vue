<template>
    <div class="Loginmian">
        <div class="Loginimg">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="Logincontent">
            <van-tabs v-model="activeName" v-if="!formshow">
                <van-tab title="账号登录" name="a">
                    <van-form @submit="onSubmit">
                        <van-field
                            left-icon="phone-o"
                            v-model="account"
                            name="account"
                            label=" "
                            label-width="5px"
                            placeholder="输入手机号码"
                            :rules="[
                            { required: true, message: '输入手机号码' },
                            { pattern:/^1[345678]\d{9}$/,message:'手机号码格式错误'}
                            ]"
                        />
                        <van-field
                            left-icon="lock"
                            v-model="password"
                            type="password"
                            name="password"
                            label=" "
                            label-width="5px"
                            placeholder="请填写登录密码"
                            :rules="[
                            { required: true, message: '请填写登录密码' },
                            { pattern:/^\w{4,10}$/,message:'密码由4~10位数字,大小写字母组成'}
                            ]"
                        />
                        <div class="wjmm"><van-icon name="question-o" />忘记密码</div>
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit" color="linear-gradient(to right, #f55d45, #fe8b3c)">登录</van-button>
                        </div>
                        <div class="LoginBottom">没有账号?<span @click.stop.prevent="zhuce">立即注册</span></div>
                        </van-form>
                </van-tab>
                <van-tab title="快速登录" name="b" class="speediness">
                    <van-form @submit="smsonSubmit">
                        <van-field
                            left-icon="phone-o"
                            v-model="mobile"
                            name="mobile"
                            label=" "
                            label-width="5px"
                            placeholder="输入手机号码"
                            :rules="[
                            { required: true, message: '输入手机号码' },
                            { pattern:/^1[345678]\d{9}$/,message:'手机号码格式错误'}
                            ]"
                        />
                        <van-field
                            left-icon="lock"
                            v-model="sms"
                            name="sms"
                            center
                            clearable
                            label=" "
                            label-width="5px"
                            placeholder="请输入短信验证码"
                            >
                        <template #button>
                            <van-button size="small" type="primary" @click.stop.prevent="smsSubmit">{{countdown>=60?"发送验证码":`${countdown}秒`}}</van-button>
                        </template>
                        </van-field>
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit" color="linear-gradient(to right, #f55d45, #fe8b3c)">登录</van-button>
                        </div>
                        <div class="LoginBottom">没有账号?<span @click.stop.prevent="zhuce">立即注册</span></div>
                        </van-form>
                </van-tab>
            </van-tabs>
            <van-form @submit="zconSubmit" v-if="formshow">
                <div class="zhuce">注册账号</div>
                <van-field
                    left-icon="phone-o"
                    v-model="zcusername"
                    name="zcusername"
                    label=" "
                    label-width="5px"
                    placeholder="输入手机号码"
                    :rules="[{ required: true, message: '输入手机号码' },{ pattern:/^1[345678]\d{9}$/,message:'手机号码格式错误'}]"
                />
                <van-field
                    left-icon="lock"
                    v-model="zcsms"
                    name="zcsms"
                    center
                    clearable
                    label=" "
                    label-width="5px"
                    placeholder="请输入短信验证码"
                    >
                <template #button>
                    <van-button size="small" type="primary" @click.stop.prevent="zcsmsSubmit">发送验证码</van-button>
                </template>
                </van-field>
                <van-field
                    left-icon="lock"
                    v-model="zcpassword"
                    type="password"
                    name="zcpassword"
                    label=" "
                    label-width="5px"
                    placeholder="请填写登录密码"
                    :rules="[
                    { required: true, message: '请填写登录密码' },
                    { pattern:/^\w{4,10}$/,message:'密码由4~10位数字,大小写字母组成'}
                    ]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" color="linear-gradient(to right, #f55d45, #fe8b3c)">提交</van-button>
                </div>
                <div class="LoginBottom">已有账号?<span @click.stop.prevent="formshow=!formshow">立即登录</span></div>
            </van-form>
        </div>
    </div>
</template>
<script>
import {mapMutations,mapActions} from 'vuex';
export default {
    data() {
    return {
      activeName: 'a',
      account: '',//账号登录的手机号
      password: '',//账号登录的密码
      mobile:'',//快速登录的手机号
      sms:'',//快速登录的验证码
      smskey:'',//发送短信的key
      formshow:false,//注册页面是否显示
      zcusername:'',//注册页面的手机号
      zcsms:'',//注册短信
      zcpassword:'',//注册密码
      countdown:60,
    };
  },
  created(){
      //1.获取发送短信的key
      this.axios.get('/api/verify_code').then(d=>{
        console.log(d);
        this.smskey=d.data.data.key;//获取发送短信的key
      });
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      this.$axios.post("api/login",values).then(d=>{
          if(d.data.status==200){
              //登录成功
              console.log(d.data.data)
              this.saveToken(d.data.data.token);
              this.getLoginInfo(d.data.data.token);
              this.$toast({
                  message:d.data.msg,
                  icon:"passed",
                  onClose:()=>{
                      this.$router.go(-1);
                  }
              })
          }else{
              //登录失败
              this.$toast(d.data.msg);
          }
      })
    },
    smsonSubmit(value){
        console.log(value)
        this.$axios.post('/api/login/mobile',{
            captcha:value.sms,
            phone:value.mobile,
            spread:null
        }).then(d=>{
            console.log(d)
            if(d.data.status==200){
                //登录成功
                //存token
                this.saveToken(d.data.data.token);
                //登录成功的token,用户信息
                this.getLoginInfo(d.data.data.token);
                //提示信息,跳转
                this.$toast({
                  message:d.data.msg,
                  icon:"passed",
                  onClose:()=>{
                      this.$router.go(-1);
                  }
              })
            }else{
                //登录失败
                this.$toast(d.data.msg)
            }
        })
    },
    smsSubmit(){
        let mobile=this.mobile;
        console.log(mobile)
        this.$axios.post('api/register/verify',{
            key:this.smskey,//发送验证码的key
            phone:mobile,//当前手机号
            type:'login'//短信类的登录
        }).then(d=>{
            console.log("获取验证码",d);
            d=d.data;
            if(d.status==200){
                //发送成功
                let ints=setInterval(()=>{
                    this.countdown--;
                    if(this.countdown<=0){
                        clearInterval(ints);
                        this.countdown=60;
                    }
                },1000)
                this.$toast(d.msg)
            }else{
                this.$toast(d.msg)
            }
        })
    },
    zhuce(){
        this.formshow=true;
    },
    zcsmsSubmit(){
        this.$axios.post('api/register/verify',{
            key:this.smskey,//发送验证码的key
            phone:this.zcusername,//当前手机号
            type:'register'//短信类的登录
        }).then(d=>{
            console.log(d)
            if(d.data.status==200){
                //发送成功
            }else{
                //发送失败
            }
        })
    },
    zconSubmit(value){
        console.log(value)
        this.$axios.post('/api/register',{
            account:value.zcusername,
            captcha:value.zcsms,
            password:value.zcpassword,
            spread:null
        }).then(d=>{
            console.log(d)
            if(d.data.status==200){
                //注册成功
                this.$toast(
                    {
                        message:d.data.msg,
                        icon:"passed",
                        onClose:()=>{
                            this.formshow=false;
                        }
                    }
                )
            }else{
                //注册失败
                this.$toast(d.data.msg)
            }
        })
    },
    ...mapMutations(['saveToken']),
    ...mapActions(['getLoginInfo'])
  },
}
</script>
<style lang="less">
.Loginmian{
    position: fixed;
    top: 0px;
    left: 0px;
    overflow: auto;
    background-image: linear-gradient(180deg,#ff493b,#ff8e3b);
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    // justify-content: center;
    flex-direction: column;
    z-index: 1;
    .Loginimg{
        height: 150px;
        width: 100vw;
        background: url("../assets/index-bg.png") no-repeat -5px 0;
        background-size: 110% 100%;
        img{
            display: block;
            margin: 30px auto;
            width: 82px;
            height: 82px;
            border: 1px solid black;
            border-radius:50%;
        }
    }
    .Logincontent{
        width: 310px;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        position: relative;
        &::after{
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 95%;
            height: 100%;
            background-color: #feb990;
            opacity: 0.8;
            border-radius: 5px;
            z-index: -1;
        }
        &::before{
             content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 86%;
            height: 100%;
            background-color: #feb990;
            opacity: 0.5;
            border-radius: 3px;
            z-index: -1;
        }
        .van-tab__text{
            font-size: 18px;
        }
    }
    .wjmm{
        display: flex;
        align-items: center;
        font-size: 14px;
        justify-content: flex-end;
        margin-right: 10px;
    }
    .LoginBottom{
        display: flex;
        justify-content: center;
        font-size: 15px;
        margin-bottom: 20px;
        span{
            color: #fc6464;
        }
    }
    .speediness{
        .van-form{
            &>div{
                &:last-child{
                    position: relative;
                    .mybutton{
                        position: absolute;
                        top: 0px;
                        right: 0;
                    }
                }
            }
        }
    }
    .zhuce{
        height: 44px;
        text-align: center;
        line-height: 45px;
        font-size: 18px;
    }
}
</style>