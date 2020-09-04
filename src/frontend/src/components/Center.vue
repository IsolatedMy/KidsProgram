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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        loginStatus: false
      }
    },
    methods: {
      main() {
        this.$router.push('/');
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
</style>
