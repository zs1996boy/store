<template>
    <div class="Mydata" v-if="loginUser">
        <div class="headdata">
            <div>管理我的账号</div>
        <div>
            <ul class="Mymain">
            <div>
                <van-image
                round
                width="2rem"
                height="2rem"
                fit="cover"
                :src="loginUser.avatar"
                />
            </div>
            <div>
                <li>{{loginUser.nickname}}</li>

                <li>绑定手机号:{{loginUser.phone}}</li>
            </div>
        </ul>
        </div>
        </div>


        <div class="belly">
            <div>
                <div><span>昵称</span><span><input type="text" v-model="value"></span></div>
                <div><span>ID号</span><span>{{loginUser.uid}} <van-icon name="lock" /></span></div>
                <div><span>手机号码</span><span>{{loginUser.phone}} <van-icon name="lock" /></span></div>
                <div><span>密码</span><span @click="clickdata">点击修改密码 <van-icon name="arrow" /></span></div>
            </div>
        </div>
        <div class="quit">
            <van-button round color="#e93323" type="danger" @click="save">保存修改</van-button>
            <van-button round plain color="#e93323" type="danger" @click="quitMy">退出登录</van-button>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import img from "../assets/mybj.png"
export default {
    data(){
        return{
            value:'',
            img,
            loginUser:[],
        }
    },
    created(){
        this.newdata();
    },
    methods:{
        newdata(){
            this.$axios.get('/api/user').then(d=>{
            console.log(d);
            if(d.data.status!=200){
                this.$toast(
                {
                    message:"登录已失效",
                    icon:"warning-o",
                    onClose:()=>{
                        this.$router.push('/login')
                    }
                
                })
                return
            }else{
                this.loginUser=d.data.data;
                this.value=d.data.data.nickname;
                console.log(this.loginUser)
            }
        })
        },
        save(){
            //保存修改
            console.log(this.value)
            this.$axios.post('/api/user/edit',{
                avatar: "http://kaifa.crmeb.net/uploads/attach/2019/08/20190807/723adbdd4e49a0f9394dfc700ab5dba3.png",
                nickname: this.value
            }).then(d=>{
                console.log(d)
                if(d.data.status==200){
                    this.$toast("修改成功");
                    this.newdata();
                }
            })
        },
        clickdata(){
            //点击修改密码
            this.$router.push('/changepassword')
        },
        quitMy(){
            this.LoginOut();
            this.$toast({
                message:"退出成功!",
                onClose:()=>{
                    this.$router.go(0);
                this.$router.push('/login');
                }
            })
        },
        ...mapMutations(['LoginOut'])
    },
}
</script>
<style lang="less">
.Mydata{
    top: 0;
    left: 0;
    width: 375px;
    height: 100vh;
    background-color: #f5f5f5;
    position: fixed;
    z-index: 9;
    .headdata{
        width: 375px;
        background-color: white;
        padding: 20px 0;
            &>div{
        &:first-child{
            width: 345px;
            margin: 0 auto;
            margin-bottom: 10px;
            font-size: 16px;
        }
        &:nth-child(2){
            width: 345px;
            border: 1px solid red;
            border-radius: 10px;
            overflow: hidden;
            margin: 0 auto;
            background: url(../assets/mybj.png) no-repeat 0 0;
            background-size: 100% 100%;
            background-color: #fff9f9;
            .Mymain{
                    display: flex;
                    align-items: center;
                    &>div{
                        &:first-child{
                            margin: 5px 10px;
                            display: flex;
                            align-items: center;
                            .van-image{
                                width: 61px !important;
                                height: 61px !important;
                            }
                        }
                        &:last-child{
                            width: 260px;
                            margin-left: 20px;
                            &>li{
                                font-size: 16px;
                                &:nth-child(1){
                                    display: flex;
                                    align-items: center;
                                }
                                &:nth-child(2){
                                    color: #999;
                                    font-size: 13px;
                                    margin-top: 5px;
                                }
                            }
                        }
                    }
                }
        }
    }
    }

    .belly{
        margin-top: 5px;
        width: 375px;
        background: white;
        &>div{
            width: 345px;
            margin: 0 auto;
            &>div{
                display: flex;
                justify-content: space-between;
                font-size: 15px;
                border-bottom: 1px solid #f2f2f2;
                padding: 15px 0;
                span{
                    display: flex;
                    align-items: center;
                    .van-icon{
                        margin-left: 5px;
                        font-size: 17px;
                    }
                    &:last-child{
                        color: #999;
                    }
                    input{
                        text-align: right;
                        border: none;
                    }
                }
            }
        }
    }



    .quit{
        display: flex;
        flex-direction: column;
        width: 345px;
        height: 150px;
        margin: 0 auto;
        margin-top: 30px;
        justify-content: space-around;
        .van-button{
            font-size: 16px;
        }
    }
    
    
}

    

</style>