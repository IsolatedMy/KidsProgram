<template>
  <div id="maze">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="back">
            <i class="el-icon-back"></i>
          </el-menu-item>
        </el-col>
        <el-col type="flex" justify="end">
          level5
        </el-col>
      </el-row>
    </el-menu>
    <!--toolbox-->
    <xml id="toolbox" style="display: none">
        <block type="move_forward"></block>
        <block type="turn"></block>
        <block type="condition_block"></block>
        <block type="condition"></block>
    </xml>
    <div class="container-fluid" style="margin-top:20px">
      <div class="row">
        <div class="col-6 d-flex flex-column">
          <div class="mx-auto" style="position:relative; width:300px; height:300px;">
            <canvas id="game" style="position:absolute; left:0; top:0; z-index:1;"></canvas>
            <canvas id="game_bg" style="position:absolute; left:0; top:0; z-index:0;"></canvas>
          </div>
          <div style="margin-top:auto">
            <button id="run_btn" type="button" class="btn btn-primary my-3 float-right" onClick="button_run()">Run</button>
            <button id="reset_btn" type="button" class="btn btn-primary my-3 float-right mr-3" onClick="button_reset()">Reset</button>
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
      level: 5,
      activeIndex: '1',
      max_blocks: 10,
      init_game: {
        'dir': 1,
        'x': 0,
        'y': 0,
        //1 indicata start,2 indicate destination,3 indicate obstacle
        'map': [
          [0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [3, 3, 3, 0, 0],
          [2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ]
      }
    }
  },
  methods: {
    main() {
      this.$router.push('/');
    },
    back() {
      this.$router.back(-1);
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
