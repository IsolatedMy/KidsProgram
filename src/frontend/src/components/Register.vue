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
      <el-input type="text" v-model="password" class="qxs-ic" placeholder="密码"/>
      <el-input type="text" v-model="email" class="qxs-ic" placeholder="邮箱"/>
      <el-input type="text" v-model="phone" class="qxs-ic" placeholder="电话"/>
            <el-button class="login_btn" @click.native="send" type="primary" round :loading="isBtnLoading">发送验证码</el-button>
      <el-button class="login_btn" @click.native="register" type="primary" round :loading="isBtnLoading">注册</el-button>
      <div style="margin-top: 10px">
        <span style="color: #000099;" @click="register">本网站问题请邮件咨询...</span><span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
      </div>
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
  .qxs-ic {
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;
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
  .back_label {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 0;
    background-image: url("../assets/bg1.jpg");
  }
</style>
