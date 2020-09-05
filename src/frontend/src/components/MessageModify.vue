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
            {{ userName }}
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form">
      <el-form >
        <el-form-item label="密码">
            <el-input type="password" v-model="password" class="qxs-ic" placeholder="密码"/>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input type="text" v-model="email" class="qxs-ic" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item label="电话">
            <el-input type="text" v-model="phone" class="qxs-ic" placeholder="电话"/>
        </el-form-item>
      </el-form>
      <el-button class="main_btn" @click.native="modify" type="primary" round>修改</el-button>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        loginStatus: false,
        userName: '',
        password: '',
        email: '',
        phone: ''
      }
    },
    created () {
      this.$axios({
          methods: "post",
          url: this.HOST + "/user/query/"
        })
        .then((response) => {
          this.userName = response.data[1];
          this.password = response.data[2];
          this.email = response.data[8];
          this.phone = response.data[9];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      main() {
        this.$router.push('/');
      },
      modify() {
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        if (!this.email && !this.phone) {
          this.$message.error('请至少输入邮箱、手机号中的一个');
          return;
        }
        // 08.04.2020

        this.$axios({
          method: "post",
          url: this.HOST + "/user/modify/",
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
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push('/');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
<style scoped>
  .login_logo {
    height: 100%;
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
  .data_table {
    width: 40%;
    margin-left: 30%;
  }
  .main_btn {
    width: 200px;
    font-size: 20px;
    margin-top: 100px;
    background: #d6780d; /* 标准的语法 */
    filter: brightness(1.4);
  }
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
    width: 80%;
    margin-bottom: 20px;
    background-size: 20px 20px;
    background-position: 3%;
  }
</style>
