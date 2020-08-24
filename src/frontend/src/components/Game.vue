<template>
  <div>
    <div class="login_form">
      <el-row>
        <el-button @click.native="level1" circlr>1</el-button>
      </el-row>
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
    }
  }
}
</script>
