<template>
  <div>
    <!--toolbox-->
    <xml id="toolbox" style="display: none">
        <block type="move_forward"></block>
        <block type="turn"></block>
    </xml>
    <div class="container-fluid">
      <div class="row">
        <div class="col d-flex flex-column">
          <canvas id="game" width="300px" height="300" class="mx-auto d-block"></canvas>
          <div>
            <button type="button" class="btn btn-primary my-3 float-right" onClick="button_run()">Run</button>
            <button type="button" class="btn btn-primary my-3 float-right mr-3" onClick="button_reset()">Reset</button>
          </div>
        </div>
        <div id="blockly" class="col-6 d-flex flex-column vh-100">
            <div id="blockly-editor" class="flex-grow-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  },
  mounted() {
    this.$loadScript('/static/blockly/blockly_compressed.js')
      .then(() => (
        this.$loadScript('/static/blockly/blocks_compressed.js')
      ))
      .then(() => (
        this.$loadScript('/static/blockly/javascript_compressed.js')
      ))
      .then(() => (
        this.$loadScript('/static/blockly/en.js')
      ))
      .then(() => (
        this.$loadScript('/static/game/js/global_variable.js')
      ))
      .then(() => (
        this.$loadScript('/static/game/js/load_img.js')
      ))
      .then(() => (
        this.$loadScript('/static/game/js/blockly_inject.js')
      ))
      .then(() => (
        this.$loadScript('/static/game/js/game.js')
      ))
      .then(() => (
        this.$loadScript('/static/game/js/button.js')
      ));
  }
}

</script>

<style scoped>

</style>
