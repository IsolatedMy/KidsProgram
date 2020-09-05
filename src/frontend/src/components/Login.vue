<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: black;">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main"  style="color: darksalmon; position: fixed; z-index: 100;">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="3">
          <el-menu-item index="2">
            <el-button type="text" @click.native="login" v-if="!isLogin" disabled>登录</el-button>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    
    <div class="outer_label">
      <div class="slogan" style="left:10%; animation: updown 3s linear 0s infinite normal none;">Make Coding Easy</div>
      <div class="slogan" style="left:15%; animation: updown2 4s linear 0s infinite normal none;">All-Ages Friendly</div>
      <div class="slogan" style="animation: updown3 6s linear 0s infinite normal none;">solve mazes using programming</div>
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
   <div class="back1">
      <img style= "height: 100%; width:100%;" src="../assets/login_bg1.png">
    </div>
    <div class="back2">
      <img style="width: 100%; height: 100%; top:0;" src="../assets/login_bg2.png">
    </div>
    <div class="login_form">
      <el-input type="text" v-model="userName" v-show="testShow" class="qxs-ic_user" prefix-icon="icon_login_user" placeholder="用户名">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/user.png">
        </i>
      </el-input>
      <el-input type="password" v-model="password" v-show="testShow" class="qxs-ic_password" prefix-icon="icon_login_password" placeholder="密码">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_password" src="../assets/password.png">
        </i>
      </el-input>
      <el-row>
        <el-button class="login_btn" style="top: 50%; left:10%;" @click.native="userlogin" type="primary" round><span class="btn_text">登录</span></el-button>
        <el-button class="login_btn" style="top: 50%; left:60%;" @click.native="register" type="primary" round><span class="btn_text">注册</span></el-button>
      </el-row>
      <el-row>
        <a  @click="retrieve()"><span style="position: relative; top: 50%; left: 0%;" class="btn_text">找回密码</span></a>
      </el-row>
    </div> 
    <div class="back_label">
      <img  style="width: 100%; height: 100%; top: 0; border-radius: 10px;" src="../assets/register_bg1.jpg">
    </div> 
    
    <div style="position: absolute; top: 102%; left: 44%; margin-top: 20px;">
      <span style="color: #000099; left: 30%;" @click="userlogin" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 108%; left: 44%;">
      <span style="color: #A9A9AB; left: 30%;">版权归属@软工苟命组</span>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import store from '../store'
//  import { userLogin } from '../../api/api';
  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false,
        isLogin: false,
        loginText: "登录",
        testShow: true,
        activeIndex: '1'
      }
    },
    created () {
      let localstorage = require('../../static/localstorage');
      let token = localstorage.get('Authorization');
      console.log(token);
      if (token != '<b>Login Suceess</b>') {
        this.isLogin = false;
        this.loginText = "登陆";
        this.testShow = true;
      }
      else {
        this.isLogin = true;
        this.loginText = "退出登陆";
        this.testShow = false;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      userlogin() {
        if(this.isLogin){
          let _this = this;
          this.isLogin = false;
          this.loginText = "登陆";
          this.testShow = true;
        // 08.04.2020

          this.$axios({
            method: "post",
            url: this.HOST + "/user/login/",
            data: this.$qs.stringify({
              username: this.userName,
              password: this.password
            })
          })
          .then(function (response) {
            localStorage.setItem('Authorization', '');
            _this.$router.push({path:'/', query:{isLogin: false}});
          })
          .catch(function (error) {
            console.log(error);
          });
        }

        else{
          let _this = this;
          if (!this.userName) {
            this.$message.error('请输入用户名');
            return;
          }
          if (!this.password) {
            this.$message.error('请输入密码');
            return;
          }
          // 08.04.2020

          this.$axios({
            method: "post",
            url: this.HOST + "/user/login/",
            data: this.$qs.stringify({
              username: this.userName,
              password: this.password
            })
          })
          .then((response)=>{
            console.log(response);
            let token = response.data
            _this.changeLogin({Authorization: token})
            if (token == '<b>Login Failed</b>')
            {
              this.$message({
                message: '登录失败',
                type: 'warning'
              });
            }
            else{
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              _this.$router.push({path:'/', query:{isLogin: true}});
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }

      },
      register() {
        this.$router.push('/register');
      },
      retn() {
        this.$router.go(-1);
      },
      retrieve() {
        this.$router.push('/retrieve');
      },
      main() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
 .back1 {
   position: absolute;
   top: 45%;
   right: 0;
   height: 75%;
   width: 35%;
   z-index: 0;
   background: no-repeat;
 }
.back2 {
   position: absolute;
   top: 75%;
   left: 0;
   height: 35%;
   width: 40%;
   z-index: 0;
   background: no-repeat;
 }

 .back_label {
    position: absolute;
    top: 40%;
    left: 23%;
    width: 55%;
    height: 400px;
    border-radius: 10px;
    opacity: 0.7;
    z-index: 0;
    filter: progid: DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
    box-shadow:2px 2px 10px #909090;
  }
  .login_form {
    position: absolute;;
    top: 40%;
    left: 30%;
    height: 400px;
    width: 40%;
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 10%;
    z-index: 1;
    
  }
 .login_form:hover + .back_label {
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
  }
  .login_form:hover {
    transform: scale(1.1);
    filter: progid: DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
    box-shadow:2px 2px 10px #909090;
  }

  .qxs-ic_user {
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;  
  }
  .qxs-ic_password  {
    background-size: 20px 20px;
    background-position: 3%;
    margin-bottom: 20px;  
  }
 .icon_login_user {
    width:16px; 
    height:16px;
    background-size: cover;
    margin-top: 12px;
    margin-left: 5px;
    border-width: 0;
  }
  .icon_login_password {
    width:16px;
    height:16px;
    border: none;
    background-size: cover;
    margin-top: 12px;
    margin-left: 5px;
  }
  

  .login_logo {
    height: 100%;
  }
  .login_btn {
    position: absolute;
    width: 30%;
    font-size: 10px;
    margin-top: 20px;
    border-radius: 5px;
    border-color: none;
    background: linear-gradient(to right, #003d99 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
  .btn_text {
    display: flex;
    justify-content: center;
  }

 .slogan {
   position: absolute;
   text-align: center;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 35px;
   color: rgb(187, 55, 15);
   border: 5px solid rgb(187, 55, 15);
   border-radius: 5px;
   margin:2px;
   background-color: none;
 }

 @keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

 @-o-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

 @-moz-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

 @-webkit-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

 @keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

 @-o-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

 @-moz-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

 @-webkit-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

@keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%}
   100% {top:40%;left:58%}
 }

 @-o-keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%}
   100% {top:40%;left:58%}
 }

 @-moz-keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%}
   100% {top:40%;left:58%}
 }

 @-webkit-keyframes updown3 {
  0%  {top:40%; left:58%;}
   25% {top:35%; left:60%}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%}
   100% {top:40%;left:58%}
 }
</style>
