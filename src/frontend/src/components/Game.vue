<template>
  <div>
    <div class="login_form">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="10"><el-button @click.native="level1" circle>1</el-button></el-col>
        <el-col :span="10"><el-button @click.native="level2" circle>2</el-button></el-col>
        <el-col :span="10"><el-button circle>3</el-button></el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="10"><el-button circle>4</el-button></el-col>
        <el-col :span="10"><el-button circle>5</el-button></el-col>
      </el-row>
      <el-button class="row-bg"  style="margin-top: 20px" @click.native="retn" type="primary" round :loading="isBtnLoading">返回</el-button>
      <div style="margin-top: 10px">
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
  .login_form {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px; height: 100px;
    margin: auto;
    z-index: 1;
  }
</style>
