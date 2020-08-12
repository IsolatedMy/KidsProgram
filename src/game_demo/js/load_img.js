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

//init function
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

