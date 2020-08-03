<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/logo.png">
    </div>
    <div class="login_form">
      <el-input type="text" v-model="userName" class="qxs-ic_user" placeholder="用户名"/>
      <el-input type="text" v-model="password" class="qxs-ic_password" placeholder="密码"/>
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">注册</el-button>
      <div style="margin-top: 10px">
        <span style="color: #000099;" @click="login">本网站问题请邮件咨询...</span><span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
      </div>
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
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
 
      }
    }
  }
</script>
<style>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
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