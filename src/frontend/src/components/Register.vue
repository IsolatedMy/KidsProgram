<template>
  <div>
    <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: black; border-color: white;">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main" style="color: darksalmon; position: fixed; z-index: 100;">
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
    </div>
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
      <el-input type="text" v-model="userName" class="qxs-ic" placeholder="用户名">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/user.png">
        </i>
      </el-input>
      <el-input type="text" v-model="password" class="qxs-ic" placeholder="密码">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/password_new.png">
        </i>
      </el-input>
      <el-input type="text" v-model="email" class="qxs-ic" placeholder="邮箱">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/email.png">
        </i>
      </el-input>
      <el-input type="text" v-model="phone" class="qxs-ic" placeholder="电话">
        <i slot="prefix" style="display: flex; align-items: center;">
         <img class="icon_login_user" src="../assets/phone.png">
        </i>
      </el-input>
      <el-button class="login_btn" style="top:85%; left:20%;" @click.native="send" type="primary" round :loading="isBtnLoading">发送验证码</el-button>
      <el-button class="login_btn" style="top:70%; left: 20%;" @click.native="register" type="primary" round :loading="isBtnLoading">注册</el-button>
    </div>
    <div class="back_label">
      <img  style="width: 100%; height: 100%; top: 0; border-radius: 10px;" src="../assets/register_bg1.jpg">
    </div>
     <div style="position: absolute; top: 105%; left: 44%; margin-top: 20px;">
      <span style="color: #000099; left: 30%;" @click="userlogin" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 112%; left: 44%;">
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
        email:'',
        phone:'',
        activeIndex: '1',
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
      }
    },
    methods: {
      register() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        if (!this.email && !this.phone) {
          this.$message.error('请至少输入邮箱、手机号中的一个');
          return;
        }
        let pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let isEmail = pattern.test(this.email);
        let phonePattern = /^1\d\d\d\d\d\d\d\d\d\d$/;
        let isPhone = phonePattern.test(this.phone);
        if (this.email && !isEmail) {
          this.$message.warning('邮箱格式错误');
          return;
        }
        if (this.phone && !isPhone) {
          this.$message.warning('手机号码格式有误');
          return;
        }
        this.$axios({
          method: "post",
          url: this.HOST + "/user/register/",
          data: this.$qs.stringify({
            username: this.userName,
            password: this.password,
            email: this.email,
            phone: this.phone
          })
        })
        .then((response) => {
          console.log(response);
          let token = response.data
          if (token == 'Code:200')
          {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('/');
          }
          else {
            this.$message({
              message: '注册失败',
              type: 'warning'
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      },
      retn() {
        this.$router.go(-1);
      },
      main() {
        this.$router.push('/');
      },
      send() {
        let pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!this.email) {
          this.$message.warning('请输入电子邮箱');
          return;
        }
        let isEmail = pattern.test(this.email);
        if (!isEmail) {
          this.$message.warning("请输入正确格式的电子邮箱");
          return;
        }
        this.$axios ({
          method: "post",
          url: this.HOST + "/user/send/",
          data: this.$qs.stringify({
            email: this.email
          })
        })
        .then(
          (response) => {
            let data = response.data;
            if ('Code:300' == data) {
              this.$message.success("验证码发送成功");
            } else {
              this.$message.warning("验证码发送失败");
            }
          }
        )
        .catch(
          (error) => {
            console.log(error);
          }
        );
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
    top: 200px;
    right: 30%;
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
  .qxs-ic {
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;
  }
  .login_logo {
    height: 100%;
  }
  .icon_login_user {
    width:16px; 
    height:16px;
    background-size: cover;
    margin-top: 12px;
    margin-left: 5px;
    border-width: 0;
  }
  .login_btn {
    position: absolute;
    width: 50%;
    font-size: 20px;
    margin-top: 20px;
    margin-left: 5%;
    text-align: center;
    /*background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    /*background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    /*background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    /*background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
     background: #d6780d; /* 标准的语法 */
    filter: brightness(1.4);
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
