<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form">
      <div class="button-group">
        <el-row type="flex">
          <el-col><el-button @click.native="level1" round>1</el-button></el-col>
          <el-col><el-button @click.native="level2" round>2</el-button></el-col>
          <el-col><el-button round>3</el-button></el-col>
        </el-row>
        <el-row type="flex">
          <el-col><el-button round>4</el-button></el-col>
          <el-col><el-button round>5</el-button></el-col>
          <el-col><el-button round>6</el-button></el-col>
        </el-row>
        <el-button icon="el-icon-switch-button" @click.native="retn" type="primary" id="ret" round :loading="isBtnLoading">返回</el-button>
        <div style="margin-top: 10px">
      </div>
        <span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    level1() {
      this.$router.push('/game/level1');
    },
    retn() {
      this.$router.go(-1);
    },
    level2() {
      this.$router.push('/game/level2');
    }
  }
}
</script>

<style scoped>
  .row-bg {
    position:relative;
    right: 150%;
  }
  .login_logo {
    height: 100%;
  }
  .login_form {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 600px; height: 400px;
    margin: auto;
    z-index: 1;
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
  #ret {
    margin-top: 20px;
  }
  .button-group{
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
    height: 100%;
  }
</style>
