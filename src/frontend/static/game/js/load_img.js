function loaded() {
  img_count ++;
  if( img_count < img_sum )
    return;
  init_canvas();
};

console.log(game)

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
  ctx_bg.beginPath();
  ctx_bg.strokeStyle = "black";
  //(x,0)->(x,y_max)
  for (var x = 0; x <= canvas_width_cnt; x += 1) {
      ctx_bg.moveTo(x * grid_size, 0);
      ctx_bg.lineTo(x * grid_size, canvas_height_cnt * grid_size);
  }
  //(0,y)->(x_max,y)
  for (var y = 0; y <= canvas_height_cnt; y += 1) {
      ctx_bg.moveTo(0, y * grid_size);
      ctx_bg.lineTo(canvas_width_cnt * grid_size, y * grid_size);
  }
  ctx_bg.stroke();
  ctx_bg.closePath();
  //start sprite and obstacle and dest
  //sprite, 16x17 -> 50x50
  for( var x = 0;x < canvas_height_cnt; x++ ) {
    for( var y = 0;y < canvas_width_cnt; y++ ) {
      //start
      if( game['map'][x][y] == 1 )
      {
        //location in idle images
        let index;
        switch( game['dir'] ){
          case cst['dir']['DOWN']:
            index = 0;
            break;
          case cst['dir']['RIGHT']:
            index = 1;
            break;
          case cst['dir']['UP']:
            index = 2;
            break;
          case cst['dir']['LEFT']:
            index = 3;
            break;
        }
        ctx.drawImage(img.idle,index * 16,0,sprite_width,sprite_height,real_xy(y + 1),real_xy(x + 1),sprite_dest_size,sprite_dest_size);

        game['x'] = y + 1;
        game['y'] = x + 1;
      }
      //end
      else if( game['map'][x][y] == 2 )
      {
        ctx_bg.fillStyle = 'green';
        ctx_bg.fillRect(real_xy_nopad(y + 1),real_xy_nopad(x + 1),grid_size,grid_size);
      }
      //obstacle
      else if( game['map'][x][y] == 3 )
      {
        ctx_bg.fillStyle = 'red';
        ctx_bg.fillRect(real_xy_nopad(y + 1),real_xy_nopad(x + 1),grid_size,grid_size);
      }
    }
  }
};
