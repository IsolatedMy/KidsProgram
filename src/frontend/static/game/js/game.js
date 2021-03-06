//game event handler and helper function

//use current game state
function is_dest() {
  return game['map'][game['y'] - 1][game['x'] - 1] === 2;
}

//use future game state
function is_obs(x,y) {
  return game['map'][y - 1][x - 1] === 3;
}

//move_forward n step
//!animation
async function game_move(n) {
  for( let i = 0;i < n;i ++ )
  {
    await game_move_one();
  }
  //should check dest here rather than in game_move_one
  //obstacle check
  if( is_dest() )
  {
    //can use vuex store
    button_reset();
    vue.$message.success("通关成功");
    if ( vue._data.level == 1 && !vue._data.loginStatus) {
      vue.$alert('恭喜您通关了试玩关卡。如果想玩更多关卡，请登录。','通关成功',{
        confirmButtonText: '确定',
        callback: action => {
          vue.$router.push('/');
        }
      });
    }
    else {
      vue.$axios({
        method: "post",
        url: vue.HOST + "/progress/update/",
        data: vue.$qs.stringify({
          progress: vue._data.level + 1
        })
      })
      .then( (response) => {
        let data = response.data;
        if (data == 'Code:300') {
          vue.$alert('恭喜', '通关成功', {
            confirmButtonText: '确定',
            callback: action => {
              vue.$router.push('/game/');
              location.reload();
            }
          });
        }
        else if ( data == 'Code:302') {
          vue.$message.error(data);
        }
      })
      .catch( (error) =>{
        console.log(error);
      });
    }
  }
}

function game_move_one(){
  return new Promise((res) => {
    //6 pic per move
    let count = 6;
    //frame per pic
    let frames = 5;
    //step per frame
    let step_x,step_y;
    //integral diff
    let all_x,all_y;
    let walk_img;
    switch(game['dir']){
      case cst['dir']['UP']:
        walk_img = img.walk_up;
        step_x = 0;
        all_x = 0;
        step_y = -Math.floor(grid_size / (count * frames));
        all_y = -1;
        break;
      case cst['dir']['DOWN']:
        walk_img = img.walk_down;
        step_x = 0;
        all_x = 0;
        step_y = Math.floor(grid_size / (count * frames));
        all_y = 1;
        break;
      case cst['dir']['LEFT']:
        walk_img = img.walk_left;
        step_x = -Math.floor(grid_size / (count * frames));
        all_x = -1;
        step_y = 0;
        all_y = 0;
        break;
      case cst['dir']['RIGHT']:
        walk_img = img.walk_right;
        step_x = Math.floor(grid_size / (count * frames));
        all_x = 1;
        step_y = 0;
        all_y = 0;
        break;
      default:
        alert(arguments.callee.name + ' switch value ' + game['dir']);
    }
    //border check
    if( game['x'] + all_x > canvas_width_cnt || game['y'] + all_y > canvas_height_cnt
      || game['x'] + all_x < 0 || game['y'] + all_y < 0 )
    {
      res();
      return;
    }
    //obstacle check
    if( is_obs(game['x'] + all_x,game['y'] + all_y) )
    {
      res();
      return;
    }
    //draw
    let i = 0,j = 0;
    function draw_move()
    {
      ctx.clearRect(real_xy(game['x']) + (i * frames + j) * step_x,real_xy(game['y']) + (i * frames + j) * step_y,50,50);
      if(i === count - 1 && j === frames - 1)
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
        ctx.drawImage(img.idle,index * sprite_width,0,sprite_width,sprite_height,real_xy(game['x'] + all_x),real_xy(game['y'] + all_y),sprite_dest_size,sprite_dest_size);
        //change game[x] game[y]
        game['x'] += all_x;
        game['y'] += all_y;
        //necessary?
        i = 0;j = 0;
        res();
        return;
      }
      else
      {
        ctx.drawImage(walk_img,i * sprite_width,0,sprite_width,sprite_height,real_xy(game['x']) + (i * frames + j + 1) * step_x,real_xy(game['y']) + (i * frames + j + 1) * step_y,sprite_dest_size,sprite_dest_size);
      }
      if( j === frames - 1)
      {
        i ++;
        j = 0;
      }
      else
      {
        j ++;
      }
      window.requestAnimationFrame(draw_move);
    }
    window.requestAnimationFrame(draw_move);
  });
}

//change dir
function game_turn(dir) {
  switch(dir){
    case cst['dir']['LEFT']:
      game['dir'] = (game['dir'] - 1 + 4) % 4;
      break;
    case cst['dir']['RIGHT']:
      game['dir'] = (game['dir'] + 1) % 4;
      break;
    default:
      alert(arguments.callee.name + ' switch value ' + dir);
  }
  //redraw img(should be in idle state)
  ctx.clearRect(real_xy(game['x']),real_xy(game['y']),50,50);
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
  ctx.drawImage(img.idle,index * 16,0,sprite_width,sprite_height,real_xy(game['x']),real_xy(game['y']),sprite_dest_size,sprite_dest_size);
}

function barrier_judge(dir){
  let all_x = 0;
  let all_y = 0;
  switch(game['dir']){
    case cst['dir']['UP']:
      all_x = 0;
      all_y = -1;
      break;
    case cst['dir']['DOWN']:
      all_x = 0;
      all_y = 1;
      break;
    case cst['dir']['LEFT']:
      all_x = -1;
      all_y = 0;
      break;
    case cst['dir']['RIGHT']:
      all_x = 1;
      all_y = 0;
      break;
    default:
      alert(arguments.callee.name + ' switch value ' + game['dir']);
  }
  if( game['x'] + all_x > canvas_width_cnt || game['y'] + all_y > canvas_height_cnt
  || game['x'] + all_x < 0 || game['y'] + all_y < 0 )
  {
    return true;
  }
  //obstacle check
  if( is_obs(game['x'] + all_x,game['y'] + all_y) )
  {
    return true;
  }
  return false;
}
