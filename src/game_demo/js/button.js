//button event handler
function button_run()
{
  try{
    eval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    alert(e);
  }
}
function button_reset()
{
  ctx.clearRect(0,0,canvas_size,canvas_size);
  game = Object.assign({},init_game);
  init_canvas();
}
