<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form">
      <el-button @click.native="retn" type="primary" class="ret" round :loading="isBtnLoading">返回</el-button>
      <!--<div style="margin-top: 10px"> -->
      <div style="position: absolute; top: 80%; left: 44%; margin-top: 20px;">
        <span style="color: #000099; left: 30%;" @click="userlogin" >本网站问题请邮件咨询...</span>
      </div>
      <div style="margin-top: 5px; position: absolute; top: 86%; left: 44%;">
        <span style="color: #A9A9AB; left: 30%;">版权归属@软工苟命组</span>
        <!--<span style="color: #000099;">社区</span><span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>-->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    retn() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.ret {
  position: absolute;
  top: 60%;
  left: 46%;
}
.login_logo {
  height: 100%;
}
</style>