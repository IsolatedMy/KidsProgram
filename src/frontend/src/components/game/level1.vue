<template>
  <div>
    <canvas id="game" width="300px" height="300" class="mx-auto d-block"></canvas>
    <p>{{ greeting }}</p>
  </div>
</template>

<script>
  import Blockly from 'blockly'
  import './js/blockly_inject.js'
  export default {
    data: function() {
      return {
        cst: {
          'dir':{
            'UP': 0,
            'RIGHT': 1,
            'DOWN': 2,
            'LEFT': 3
          }
        },
        grid_size: 60,
        grid_pad: 5,
        sprite_width: 16,
        sprite_height: 17,
        greeting: "Hello, World!",

        sprite_dest_size: 0
      }
    },
    methods: {
      loaded: function() {
        img_count ++;
        if( img_count < img_sum )
          return;
        init_canvas();
      }
    },
    mounted: function() {
      console.log("Debug start");
      //canvas element
      let _this = this;

      let cst = _this.cst;
      let grid_size = _this.grid_size;
      let grid_pad = _this.grid_pad;

      let elem_game = document.querySelector('#game');

      //game data
      let ctx = elem_game.getContext("2d");

      // if (elem_game != null) console.log('elem_game is not null');
      let init_game = {
        'dir': cst['dir']['DOWN'],
        'x': 1,
        'y': 1,
        'dest_x': 4,
        'dest_y': 3
      };

      let sprite_dest_size = grid_size - 2 * grid_pad;
      let game = Object.assign({},init_game);

      let img = {};
      let img_count = 0;
      let img_sum = 5;

      function loaded() {
        img_count ++;
        if( img_count < img_sum )
          return;
        init_canvas();
      };

      img.idle= new Image();
      img.idle.src = './assets/sprites/idle.png';
      img.idle.onload = loaded;
      img.walk_up= new Image();
      img.walk_up.src = './assets/sprites/walk/up.png';
      img.walk_up.onload = loaded;
      img.walk_down= new Image();
      img.walk_down.src = './assets/sprites/walk/down.png';
      img.walk_down.onload = loaded;
      img.walk_left= new Image();
      img.walk_left.src = './assets/sprites/walk/left.png';
      img.walk_left.onload = loaded;
      img.walk_right= new Image();
      img.walk_right.src = './assets/sprites/walk/right.png';
      img.walk_right.onload = loaded;

      function init_canvas() {
        //sprite, 16x17 -> 50x50
        ctx.drawImage(img.idle,0,0,sprite_width,sprite_height,real_xy(game['x']),real_xy(game['y']),sprite_dest_size,sprite_dest_size);
        //board
        ctx.strokeRect(0,0,canvas_size,canvas_size);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        for (var x = grid_size; x <= canvas_size; x += grid_size) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas_size);
        }
        for (var x = grid_size; x <= canvas_size; x += grid_size) {
            ctx.moveTo(0, x);
            ctx.lineTo(canvas_size, x);
        }
        ctx.stroke();
        ctx.closePath();
        //TODO:draw map(barrier) and dest
      };
    }
  }
</script>

<style scoped>

</style>
