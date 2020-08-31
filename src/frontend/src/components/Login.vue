<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
          <el-menu-item index="2">
            <el-button type="text" @click.native="login" v-if="!isLogin" disabled>登录</el-button>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="back_label"></div>
    <div class="login_form">
      <el-input type="text" v-model="userName" v-show="testShow" class="qxs-ic_user" placeholder="用户名"/>
      <el-input type="text" v-model="password" v-show="testShow" class="qxs-ic_password" placeholder="密码"/>
      <el-button class="login_btn" @click.native="userlogin" type="primary" round :loading="isBtnLoading">{{loginText}}</el-button>
      <el-button class="login_btn" @click.native="register" type="primary" round :loading="isBtnLoading">注册</el-button>
      <el-button class="login_btn" @click.native="retrieve" type="primary" round :loading="isBtnLoading">找回密码</el-button>
      <el-button class="login_btn" @click.native="retn" type="primary" round :loading="isBtnLoading">返回</el-button>
    </div>
    <div style="position: absolute; top: 600px; left: 44%; margin-top: 20px;">
      <span style="color: #000099; left: 30%;" @click="userlogin" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 645px; left: 44%;">
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
        testShow: true
      }
    },
    created () {
      let token = localStorage.getItem('Authorization');
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
          .then(function (response) {
            console.log(response);
            let token = response.data
            _this.changeLogin({Authorization: token})
            if (token == '<b>Login Failed</b>')
            {
              alert('登陆失败！');
            }
            else{
              alert('登陆成功！');
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
      }
    }
  }
</script>
<style>
  .login_form {
    position: absolute;;
    top: 200px;
    left: 30%;
    height: 400px;
    width: 40%;
    padding-top: 5%;
    padding-left: 10%;
    padding-right: 10%;
  }
 .back_label {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
    height: 400px;
    opacity: 0.75;
    z-index: 0;
    background-image: url("../assets/register_bg1.jpg");
  }
  .dec_1 {
    z-index: 1;
    width: 10px;
    height: 10px;
    background-color: #ccff33;
    color: #000033;
    font-size: 10px;
    border-radius: 5px;
    transition: 0.3s;
  }
  .dec_1:hover {
    transform: scale(7);
  }

  .qxs-ic_user {
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background-size: 20px 20px;
    background-position: 3%;
    margin-bottom: 20px;
  }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 50%;
    font-size: 20px;
    margin-top: 20px;
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
