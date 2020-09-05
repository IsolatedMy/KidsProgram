<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="24"></el-col>
        <el-col :span="3" type="flex" justify="end" v-if="!this.isLogin">
          <el-menu-item index="3">
            <el-button type="text" @click.native="register" v-if="!this.isLogin" class="nav_btn">注册</el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="3" type="flex" justify="end" v-if="this.isLogin">
          <el-menu-item index="4">
              {{ userName }}
          </el-menu-item>
        </el-col>
        <el-col :span="3" type="flex" justify="end">
          <el-menu-item index="2">
            <el-button type="text" @click.native="login" v-if="!this.isLogin" class="nav_btn">登录</el-button>
            <el-button type="text" @click.native="exitLogin" v-else >退出登录</el-button>
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form" > <!--style="background-color: #663333;"-->
      <el-button class="main_btn" @click.native="game" type="primary" round>选关</el-button>
      <el-button class="main_btn" @click.native="community" type="primary" round>社区</el-button>
      <el-button class="main_btn" @click.native="center" type="primary" round>个人中心</el-button>
    </div>
    <div class="back_label">
      <img  style="width: 100%; height: 95%; top: 0;" src="../assets/bg_login.jpg">
    </div>
    <div style="position: absolute; top: 102%; left: 44%; margin-top: 20px;">
      <span style="color: #000099; left: 30%;" @click="login" >本网站问题请邮件咨询...</span>
    </div>
    <div style="margin-top: 5px; position: absolute; top: 108%; left: 44%;">
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

      },
      goBack() {
        this.$router.replace({path: '/'});
      }
    },
    mounted() {
      let authorization = localStorage.getItem('Authorization');
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
<style scoped>
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
  .nav_btn {
    width: 40%;
    height: 100%;
    margin: 0;
    text-align: center;
  }
</style>
