<template>
  <div>
    <div class="login_form">
      <div style="margin-top: 10px">
        <span style="color: #000099;">个人中心</span><span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
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
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
      let token = localStorage.getItem('Authorization');
      console.log(token);
      if (token != '<b>Login Suceess</b>') {
        alert("请登陆！");
        this.$router.push('/');
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
      login() {
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
            _this.$router.push('/');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
 
      },
      register() {
        this.$router.push('/register');
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