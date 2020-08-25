<template>
  <div id="maze">
    <!--toolbox-->
    <xml id="toolbox" style="display: none">
        <block type="move_forward"></block>
        <block type="turn"></block>
    </xml>
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 d-flex flex-column">
          <div class="mx-auto" style="position:relative; width:300px; height:300px;">
            <canvas id="game" style="position:absolute; left:0; top:0; z-index:1;"></canvas>
            <canvas id="game_bg" style="position:absolute; left:0; top:0; z-index:0;"></canvas>
          </div>
          <div style="margin-top:auto">
            <button type="button" class="btn btn-primary my-3 float-right" onClick="button_run()">Run</button>
            <button type="button" class="btn btn-primary my-3 float-right mr-3" onClick="button_reset()">Reset</button>
          </div>
        </div>
        <div id="blockly" class="col-6 d-flex flex-column vh-100">
            <div class="alert alert-primary"><span id="capacity"></span> blocks left</div>
            <div id="blockly-editor" class="flex-grow-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      level: 1
    }
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
