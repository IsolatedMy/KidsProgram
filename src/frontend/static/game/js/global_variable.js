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

//game data
let ctx = elem_game.getContext("2d");
let canvas_size = elem_game.width;
let grid_size = 60;
let grid_pad = 5;
let sprite_width = 16;
let sprite_height = 17;
let sprite_dest_size = grid_size - 2 * grid_pad;
let init_game = {
  'dir': cst['dir']['DOWN'],
  'x': 1,
  'y': 1,
  'dest_x': 4,
  'dest_y': 3
};
let game = Object.assign({},init_game);

//all image
let img = {};
let img_count = 0;
let img_sum = 5;

//helper function
let real_xy = function(x) {
  x--;
  return x * grid_size + grid_pad;
}

