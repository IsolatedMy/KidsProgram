//vue object
let vue = document.getElementById('app').__vue__;

//const
let cst = {
  'dir':{
    'UP': 0,
    'RIGHT': 1,
    'DOWN': 2,
    'LEFT': 3
  }
};

//canvas element
let elem_game = document.querySelector('#game');
let elem_game_bg = document.querySelector('#game_bg');

//game data
let ctx = elem_game.getContext("2d");
let ctx_bg = elem_game_bg.getContext("2d");
let canvas_size = 300;
let grid_count = 5;
let grid_size = 60;
let grid_pad = 5;
let sprite_width = 16;
let sprite_height = 17;
let sprite_dest_size = grid_size - 2 * grid_pad;
let init_game = {
  'dir': cst['dir']['DOWN'],
  'x': 1,
  'y': 1,
  //1 indicate obstacle,2 indicate destination
  'map': [
    [0,0,1,0,0],
    [0,0,0,0,0],
    [0,0,0,2,0],
    [1,0,0,0,0],
    [0,0,0,1,0]
  ]
};
let game = Object.assign({},init_game);

//all image
let img = {};
let img_count = 0;
let img_sum = 5;

//functions that init_canvas need,cannot be put in game.js

//include padding part
function real_xy(x) {
  x--;
  return x * grid_size + grid_pad;
}

//dont include padding part
function real_xy_nopad(x) {
  x--;
  return x * grid_size;
}
