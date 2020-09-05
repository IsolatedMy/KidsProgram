<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: black;">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main"  style="color: bisque;">
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
     <div class="back1">
      <img style= "height: 100%; width:100%;" src="../assets/login_bg1.png">
    </div>
    <div class="back2">
      <img style="width: 100%; height: 100%; top:0;" src="../assets/login_bg2.png">
    </div>
    <div class="login_form">
      <el-input type="text" v-model="userName" class="qxs-ic" placeholder="用户名">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/user.png">
        </i>
      </el-input>
      <el-input type="text" v-model="retrieveKey" class="qxs-ic" placeholder="电子邮箱/手机号">
      <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/email.png">
        </i>
      </el-input>
      <el-input type="password" v-model="newPassword" class="qxs-ic" placeholder="新密码">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/password_new.png">
        </i>
      </el-input>
      <el-input type="password" v-model="newPasswordAgain" class="qxs-ic" placeholder="重复新密码">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/password_new.png">
        </i>
      </el-input>
      <el-button class="retrieve_btn" @click.native="retrieve_password"><span>确定</span></el-button>
    </div>
    <div class="back_label">
      <img  style="width: 100%; height: 100%; top: 0; border-radius: 10px;" src="../assets/register_bg1.jpg">
    </div>
    <div style="position: absolute; top: 600px; left: 44%; margin-top: 20px;">
    </div>
    <div style="margin-top: 5px; position: absolute; top: 110%; left: 44%;">
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
      // let authorization = localStorage.getItem('Authorization');
      let localstorage = require('../../static/localstorage');
      let authorization = localstorage.get('Authorization');
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
        if (!this.userName) {
          this.$message.warning("请输入用户名");
          return;
        }
        if (!this.retrieveKey) {
          this.$message.warning('请根据注册情况输入你的手机号或者邮箱');
          return;
        }
        if (!this.newPassword) {
          this.$message.warning('请输入新密码');
          return;
        }
        if (!this.newPasswordAgain) {
          this.$message.warning('请再次输入新密码');
          return;
        }
        if (this.newPassword != this.newPasswordAgain) {
          this.$message.warning('两次输入的新密码不一致');
          return;
        }
        let pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let isEmail = pattern.test(this.retrieveKey);
        let phonePattern = /^1\d\d\d\d\d\d\d\d\d\d$/;
        let isPhone = phonePattern.test(this.retrieveKey);
        if (!isEmail && !isPhone) {
          this.$message.warning('请输入正确格式的电子邮箱或者手机号');
          return;
        }
        _this.$axios({
          method: "post",
          url: this.HOST + "/user/retrieve/",
          data: this.$qs.stringify({
            username: this.userName,
            password: this.newPassword,
            key: this.retrieveKey
          })
        })
        .then((response) =>{
          let data = response.data;
          console.log(data);
          if (data == '<script>alert("找回密码失败")</scrip' + 't>') {
            this.$message.warning("找回密码失败，请检查输入格式");
          }
          else {
            this.$message.success("找回密码成功");
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
  .login_form {
    position: absolute;;
    top: 100%;
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
  .icon_login_user {
    width:16px; 
    height:15px;
    background-size: cover;
    margin-top: 12px;
    margin-left: 5px;
    border-width: 0;
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
  .login_form:hover {
    transform: scale(1.1);
    filter: progid: DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
    box-shadow:2px 2px 10px #909090;
  }
  .retrieve_btn {
    width: 40%;
    font-size: 20px;
    color: maroon;
    margin-top: 20px;
    background: linear-gradient(to right, #979927 , hsl(56, 55%, 45%)); /* 标准的语法 */
    filter: brightness(1.4);
  }
  .btn_text {
    display: flex;
    justify-content: center;
  }
</style>
