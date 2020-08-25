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
let grid_count_array = [5,7];
let grid_count = grid_count_array[level];
let grid_size = 60;
let grid_pad = 5;
//canvas size based on grid_count and grid_size
let canvas_size = grid_count * grid_size;
//set canvas size
elem_game.height = canvas_size;
elem_game.width = canvas_size;
elem_game_bg.height = canvas_size;
elem_game_bg.width = canvas_size;
let sprite_width = 16;
let sprite_height = 17;
let sprite_dest_size = grid_size - 2 * grid_pad;
let init_game_array = [
  {
    'dir': cst['dir']['DOWN'],
    'x': 0,
    'y': 0,
    //1 indicata start,2 indicate destination,3 indicate obstacle
    'map': [
      [1,0,3,0,0],
      [0,0,0,0,0],
      [0,0,0,2,0],
      [3,0,0,0,0],
      [0,0,0,3,0]
    ]
  },
  {
    'dir': cst['dir']['DOWN'],
    'x': 0,
    'y': 0,
    //1 indicata start,2 indicate destination,3 indicate obstacle
    'map': [
      [0,0,0,0,0,0,0],
      [0,3,0,0,0,2,0],
      [0,3,3,0,3,0,0],
      [0,0,0,0,0,3,0],
      [0,1,0,0,0,3,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ]
  }
];
let init_game = init_game_array[level];
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
