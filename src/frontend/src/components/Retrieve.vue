<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
          <el-menu-item index="2">

          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="back_label"></div>
    <div class="login_form">
      <el-input type="text" v-model="userName" class="qxs-ic" placeholder="用户名"/>
      <el-input type="text" v-model="retrieveKey" class="qxs-ic" placeholder="电子邮箱/手机号"/>
      <el-input type="password" v-model="newPassword" class="qxs-ic" placeholder="新密码"/>
      <el-input type="password" v-model="newPasswordAgain" class="qxs-ic" placeholder="重复新密码"/>
      <el-button class="retrieve_btn" @click.native="retrieve_password"><span>确定</span></el-button>
    </div>
    <div style="position: absolute; top: 600px; left: 44%; margin-top: 20px;">
    </div>
    <div style="margin-top: 5px; position: absolute; top: 645px; left: 44%;">
      <!--<span style="float: right; color: #A9A9AB; left: 20px;">版权归属@软工苟命组</span>-->
      <span style="color: #A9A9AB; left: 30%;">版权归属@软工苟命组</span>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        userName: '',
        retrieveKey: '',
        newPassword: '',
        newPasswordAgain: '',
        loginStatus: false,
        activeIndex: '1'
      }
    },
    created () {

    },
    mounted () {
      let authorization = localStorage.getItem('Authorization');
      if (authorization) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
      if (this.loginStatus) {
        this.$message.error("错误代码:00001");
      }
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
      }
    },
    methods: {
      main() {
        this.$router.push('/');
      },
      retrieve_password() {
        let _this = this;
        let newPassword = this.newPassword;
        let newPasswordAgain = this.newPasswordAgain;
        if (newPassword != newPasswordAgain) {
          this.$message.warning('两次输入的新密码不一致');
          return;
        }
        if (!this.userName) {
          this.$message.warning("请输入用户名");
          return;
        }
        if (!this.retrieveKey) {
          this.$message.warning('请根据注册情况输入你的手机号或者邮箱');
          return;
        }
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
  .qxs-ic {
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;
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
  .retrieve_btn {
    width: 40%;
    font-size: 20px;
    margin-top: 20px;
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
  .btn_text {
    display: flex;
    justify-content: center;
  }
</style>
