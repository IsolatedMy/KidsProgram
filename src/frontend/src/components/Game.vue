<template>
  <div>
    <div class="login_form">
      <el-row type="flex" class="row-bg" justify="center">
        <el-button @click.native="level1" circlr>1</el-button>
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
    }
  }
}
</script>


<style>
  .row-bg {
    position:relative;
    
    right: 150%;
    
  }
</style>