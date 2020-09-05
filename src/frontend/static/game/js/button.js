//button event handler
function button_run()
{
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
  document.getElementById("run_btn").disabled = true;
  vue.$store.commit('changeExample',2);
}
function button_reset()
{
  ctx.clearRect(0,0,canvas_width_cnt * grid_size,canvas_height_cnt * grid_size);
  game = Object.assign({},vue._data.init_game);
  document.getElementById("run_btn").disabled = false;
  init_canvas();
}
