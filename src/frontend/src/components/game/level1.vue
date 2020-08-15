<template>
  <div>
    <div class="container-fluid">
      <div class="row h-100">
        <div class="col d-flex flex-column">
          <canvas id="game" width="300px" height="300" class="mx-auto d-block"></canvas>
          <div>
            <button type="button" class="btn btn-primary my-3 float-right" @click="button_run()">Run</button>
            <button type="button" class="btn btn-primary my-3 float-right mr-3" @click="button_reset()">Reset</button>
          </div>
        </div>
        <div id="blockly" class="col-6 d-flex flex-column">
            <div id="blockly-editor" class="flex-grow-1"></div>
        </div>
      </div>
    </div>
    <p id="test">Hello World!</p>
  </div>
</template>

<script>
  import Blockly from 'blockly';
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
        sprite_dest_size: 0,
        img_count: 0,
        img_sum: 5,

        ctx: null,
        init_game: null,
        game: null,
        img: {}
      }
    },
    methods: {
      loaded: function() {
        img_count ++;
        if( img_count < img_sum )
          return;
        init_canvas();
      },
      change: function() {
        let xml = require('xml');
        this.greeting = xml({xml: { _attr: { id:"toolbox", style:"display:none"},}});
      },
      button_run: function() {
        code =
          `
          async function wrapper(){
            ${Blockly.JavaScript.workspaceToCode(workspace)}
          }
          wrapper();
          `;
        try{
          eval(code);
        } catch (e) {
          alert(e);
        }
      },
      button_reset: function() {
        this.ctx.clearRect(0,0,this.canvas_size,this.canvas_size);
        game = Object.assign({},this.init_game);
        init_canvas();
      },
      init_canvas: function(){
        let real_xy = function(x) {
          x--;
          return x * grid_size + grid_pad;
        };
        //sprite, 16x17 -> 50x50
        let ctx = this.ctx;
        let sprite_width = this.sprite_width;
        let sprite_height = this.sprite_height;
        let game = this.game;
        let sprite_dest_size = this.sprite_dest_size;
        let grid_size = this.grid_size;
        let grid_pad = this.grid_pad;
        let canvas_size = this.canvas_size;

        ctx.drawImage(this.img.idle,0,0,sprite_width,sprite_height,real_xy(game['x']),real_xy(game['y']),sprite_dest_size,sprite_dest_size);
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
      },
      loaded: function() {
        console.log("DEbuging");
        this.img_count ++;
        if( this.img_count >= this.img_sum )
          return;
        console.log("init_canvas");
        this.init_canvas();
      }
    },
    mounted: function() {
      console.log("Debug start");
      //canvas element

      let cst = this.cst;
      let grid_size = this.grid_size;
      let grid_pad = this.grid_pad;
      let sprite_dest_size = this.sprite_dest_size;

      let elem_game = document.querySelector('#game');


      //game data
      this.ctx = elem_game.getContext("2d");
      // if (elem_game != null) console.log('elem_game is not null');
      this.init_game = {
        'dir': cst['dir']['DOWN'],
        'x': 1,
        'y': 1,
        'dest_x': 4,
        'dest_y': 3
      };

      this.sprite_dest_size = grid_size - 2 * grid_pad;
      this.canvas_size = elem_game.width;
      this.game = Object.assign({},this.init_game);

      this.img.idle= new Image();
      this.img.idle.src = require('./assets/sprites/idle.png');
      this.img.idle.onload = this.loaded;
      this.img.walk_up= new Image();
      this.img.walk_up.src = './assets/sprites/walk/up.png';
      this.img.walk_up.onload = this.loaded;
      this.img.walk_down= new Image();
      this.img.walk_down.src = './assets/sprites/walk/down.png';
      this.img.walk_down.onload = this.loaded;
      this.img.walk_left= new Image();
      this.img.walk_left.src = './assets/sprites/walk/left.png';
      this.img.walk_left.onload = this.loaded;
      this.img.walk_right= new Image();
      this.img.walk_right.src = './assets/sprites/walk/right.png';
      this.img.walk_right.onload = this.loaded;
    }
  }
</script>

<style scoped>

</style>
