<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: black; border-color: white; border-width: 5px;">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main" style="color: darksalmon; position: fixed; z-index: 100;">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="3" type="flex" justify="end" v-if="!this.isLogin">
          <el-menu-item index="3">
            <el-button type="text" @click.native="register" v-if="!this.isLogin" class="nav_btn"  icon="icon_register"> 注册</el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="3" type="flex" justify="end" v-if="this.isLogin">
          <el-menu-item index="4">
              {{ userName }}
          </el-menu-item>
        </el-col>
        <el-col :span="3" type="flex" justify="end">
          <el-menu-item index="2" style="z-index: 100;">
            <el-button type="text" @click.native="login" v-if="!this.isLogin" class="nav_btn" icon="icon_login"> 登录</el-button>
            <el-button type="text" @click.native="exitLogin" v-else class="nav_btn">退出登录</el-button>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    
    <div class="outer_label">
      <div class="slogan" style="left:10%; z-index: 0;animation: updown 3s linear 0s infinite normal none;">Make Coding Easy</div>
      <div class="slogan" style="left:15%; animation: updown2 4s linear 0s infinite normal none;">All-Ages Friendly</div>
      <div class="slogan" style="left:60%; top:40%; animation: updown3 6s linear 0s infinite normal none;">solve mazes using programming</div>
      <img class="inner_label login_logo" src="../assets/game_logo.png" style="z-index:1;">
    </div>
    <div class="login_form"> <!--style="background-color: #663333;"-->
      <el-button class="main_btn" @click.native="game" type="primary" round>选关</el-button>
      <el-button class="main_btn" @click.native="community" type="primary" round>社区</el-button>
      <el-button class="main_btn" @click.native="center" type="primary" round>个人中心</el-button>
    </div>
    <div class="back_label" style="z-index: 0;">
      <img  style="width: 100%; height: 95%; top: 0;" src="../assets/bg_login.jpg">
    </div>
    <div style="position: absolute; top: 105%; left: 44%;">
      <span style="color: #000099; left: 30%;" @click="login" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 108%; left: 44%;">
      <span style="color: #A9A9AB; left: 30%;">版权归属@软工苟命组</span>
    </div>
  </div>
</template>



<script>
//  import { userLogin } from '../../api/api';

  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false,
        activeIndex: '1',
        loginStatus: false
      }
    },
    created () {

    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      },
      loginText() {
        if (this.isLogin){
          return "退出登录";
        }
        else {
          return "登录";
        }
      },
      isLogin: {
        get: function() {
          return this.loginStatus
        },
        set: function(newValue) {
          this.loginStatus = newValue
        }
      },
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    },
    methods: {
      register() {
        this.$router.push('/register');
      },
      login() {
        this.$router.push('/login');
      },
      exitLogin() {
        localStorage.setItem('Authorization', '');
        location.reload();
        this.$message.info("登录状态已注销");
      },
      game() {
        this.$router.push('/game');
      },
      community() {
        this.$router.push('/community');
      },
      center() {
        if (this.isLogin)
          this.$router.push('/center');
        else
          this.$message.error("请先登录");
      },
      main() {
        this.$router.push('/');
      },
      nativeHandler() {
        let localstorage = require('../../static/localstorage');
        let authorization = localstorage.get('Authorization');
        console.log('Hello');
        console.log(authorization);
      },
      goBack() {
        this.$router.replace({path: '/'});
      }
    },
    mounted() {
      // let authorization = localStorage.getItem('Authorization');
      let localstorage = require('../../static/localstorage');
      let authorization = localstorage.get('Authorization');
      if (authorization)
        this.loginStatus = true;
      else
        this.loginStatus = false;

      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
      if (this.loginStatus) {
        this.$axios({
          methods: "post",
          url: this.HOST + "/user/level/"
        })
        .then((response) => {
          console.log(response)
          this.userName = response.data.username;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.goBack, false);
    }
  }
</script>
<style>
  .qxs-ic_user {
    background: url("../assets/ic_user.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background: url("../assets/ic_password.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }

  .icon_login {
    background: url('../assets/denglu.png') left no-repeat ;
    background-size: cover;
  }

  .icon_login:before {
    content:"题";
    font-size: 16px;
    visibility: hidden;
  }

  .icon_register {
    background: url('../assets/register_icon.png');
    background-size: cover;
  }

  .icon_register:before {
    content:"题";
    font-size: 16px;
    visibility: hidden;
  }

  .login_logo {
    height: 100%;
  }
  .main_btn {
    width: 200px;
    font-size: 20px;
    margin-top: 20px;
    background: #d6780d; /* 标准的语法 */
    filter: brightness(1.4);
  }
  .outer_label {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 200px;
    background: #ffffff; /* 标准的语法 */
    /*background-color: #000099;*/
    text-align: center;
    filter: brightness(1.4);
  }
  .back_label {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 0;
   /* background-image: url("../assets/bg1.jpg");
    background-size: 100%;*/
  }
  .login_form {
    position: absolute;;
    top: 250px;
    right: 30%;
    height: 400px;
    width: 40%;
    padding-top: 3%;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 3%;
    z-index: 1;
  }
  .login_form:hover + .back_label {
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
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

  .nav_btn {
    width: 40%;
    height: 100%;
    margin: 0;
    color: bisque;
    text-align: center;
  }
</style>
