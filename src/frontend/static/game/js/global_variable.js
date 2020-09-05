//vue object
let vue = document.getElementById('maze').__vue__;

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

//level,start at 0
let level = vue._data.level - 1;

//game data
let ctx = elem_game.getContext("2d");
let ctx_bg = elem_game_bg.getContext("2d");
let canvas_width_cnt = vue._data.init_game['map'][0].length;
let canvas_height_cnt = vue._data.init_game['map'].length;
let grid_size = 60;
let grid_pad = 5;
//set canvas size
elem_game.height = canvas_height_cnt * grid_size;
elem_game.width = canvas_width_cnt * grid_size;
elem_game_bg.height = canvas_height_cnt * grid_size;
elem_game_bg.width = canvas_width_cnt * grid_size;
let sprite_width = 16;
let sprite_height = 17;
let sprite_dest_size = grid_size - 2 * grid_pad;

let game = Object.assign({},vue._data.init_game);
let max_blocks = vue._data.max_blocks;
//all image
let img = {};
let img_count = 0;
let img_sum = 7;

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
