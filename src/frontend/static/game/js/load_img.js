function loaded() {
  img_count ++;
  if( img_count < img_sum )
    return;
  init_canvas();
};

img.idle= new Image();
img.idle.src = '/static/game/sprites/idle.png';
img.idle.onload = loaded;
img.walk_up= new Image();
img.walk_up.src = '/static/game/sprites/walk/up.png';
img.walk_up.onload = loaded;
img.walk_down= new Image();
img.walk_down.src = '/static/game/sprites/walk/down.png';
img.walk_down.onload = loaded;
img.walk_left= new Image();
img.walk_left.src = '/static/game/sprites/walk/left.png';
img.walk_left.onload = loaded;
img.walk_right= new Image();
img.walk_right.src = '/static/game/sprites/walk/right.png';
img.walk_right.onload = loaded;

//init function
function init_canvas() {
  //board
  ctx_bg.strokeRect(0,0,canvas_size,canvas_size);
  ctx_bg.beginPath();
  ctx_bg.strokeStyle = "black";
  for (var x = grid_size; x <= canvas_size; x += grid_size) {
      ctx_bg.moveTo(x, 0);
      ctx_bg.lineTo(x, canvas_size);
  }
  for (var x = grid_size; x <= canvas_size; x += grid_size) {
      ctx_bg.moveTo(0, x);
      ctx_bg.lineTo(canvas_size, x);
  }
  ctx_bg.stroke();
  ctx_bg.closePath();
  //start sprite and obstacle and dest
  //sprite, 16x17 -> 50x50
  for( var y = 0;y < grid_count; y++ ) {
    for( var x = 0;x < grid_count; x++ ) {
      //start
      if( game['map'][y][x] == 1 )
      {
        ctx.drawImage(img.idle,0,0,sprite_width,sprite_height,real_xy(x + 1),real_xy(y + 1),sprite_dest_size,sprite_dest_size);
        game['x'] = x + 1;
        game['y'] = y + 1;
      }
      //end
      else if( game['map'][y][x] == 2 )
      {
        ctx_bg.fillStyle = 'green';
        ctx_bg.fillRect(real_xy_nopad(x + 1),real_xy_nopad(y + 1),grid_size,grid_size);
      }
      //obstacle
      else if( game['map'][y][x] == 3 )
      {
        ctx_bg.fillStyle = 'red';
        ctx_bg.fillRect(real_xy_nopad(x + 1),real_xy_nopad(y + 1),grid_size,grid_size);
      }
    }
  }
};
