<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form" > <!--style="background-color: #663333;"-->
      <el-button class="main_btn" @click.native="game" type="primary" round :loading="isBtnLoading">选关</el-button>
      <el-button class="main_btn" @click.native="center" type="primary" round :loading="isBtnLoading" >个人中心</el-button>
      <el-button class="main_btn" @click.native="community" type="primary" round :loading="isBtnLoading">社区</el-button>
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="main_btn" @click.native="register" type="primary" round :loading="isBtnLoading">注册</el-button>
      <el-button class="main_btn" id="login" @click.native="login" type="primary" round :loading="isBtnLoading">{{loginText}}</el-button>
    </div>
    <div class="back_label"></div>
    <div style="position: absolute; top: 600px; left: 44%; margin-top: 20px;">
      <span style="color: #000099; left: 30%;" @click="login" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 645px; left: 44%;">
      <!--<span style="float: right; color: #A9A9AB; left: 20px;">版权归属@软工苟命组</span>-->
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
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      },
      loginText() {
        if (this.isLogin){
          return "退出登陆";
        }
        else {
          return "登陆";
        }
      },
      isLogin() {
        return this.$route.query.isLogin
      }
    },
    methods: {
      register() {
        this.$router.push('/register');
      },
      login() {
        this.$router.push('/login');
      },
      game() {
        this.$router.push('/game');
      },
      community() {
        this.$router.push('/community');
      },
      center() {
        this.$router.push('/center');
      }
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
    top: 200px;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 0;
    background-image: url("../assets/bg1.jpg");
  }
  .login_form {
    position: absolute;;
    top: 200px;
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
</style>
