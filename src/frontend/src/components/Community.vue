<template>
  <div>
    <div class="login_form">
      <el-button @click.native="retn" type="primary" round :loading="isBtnLoading">返回</el-button>
      <div style="margin-top: 10px">
        <span style="color: #000099;">社区</span><span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
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