### 总览
该demo使用纯js,bootstrap和blockly,描绘了通过blockly输入而改变游戏状态的流程,及游戏中动画和方向的实现

### 文件结构
- assets:游戏素材
- assets/sprites:游戏人物素材
- js:js文件
- js/global_variable.js:js全局变量(唯一例外为在blockly_inject内的workspace变量),需要在其他js文件之前
- js/load_img.js:加载所有需要的图片
- js/blockly_inject.js:注册custom block,插入blockly输入框
- js/game.js:游戏相关
- js/button.js:提供button的event handler
- libs:库文件
- index.html:总界面

### 一些global_variable介绍
- grid_size:游戏中一个格子的长宽
- grid_pad:人物在格子内时,离格子的距离
- sprite_dest_size:人物显示的长宽
- sprite_width:人物在源图内的宽度
- sprite_height:人物在源图内的高度

### blockly

#### blockly改变游戏状态流程
- 游戏添加event listener
- blockly产生发送event的代码
- run按钮使用eval()执行blockly产生的代码,发送event
- event handler处理,改变游戏状态

#### 自定义block
根据blockly文档的推荐,使用[Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html)生成自定义block,及该block的部分generator函数代码

生成block定义后使用Blockly.defineBlocksWithJsonArray()(见[define-blocks](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks))注册

注册block后还需提供code generator.由流程知只需产生发送event的代码,使用CustomEvent()定义event,dispatchEvent()发送event

### 游戏

#### 工具
根据[MDN Game development tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials),选用了\<canvas\>作为工具(Phaser不了解)

#### 动画实现
使用动画的时候需要按一定的间隔改变图像,使用requestAnimationFrame()以屏幕每次刷新的间隔为单位,而不是setInterval以绝对时间为单位,能让动画看起来更流畅

#### game_turn函数
对应turn left(right) block,基本思想为
- 根据event带的data决定是左转还是右转,改变game['dir']
- 根据game['dir']决定使用idle.png图上的第几张人物图
- 清除旧人物图,画新人物图

#### game_move函数
对应move_forward n block,基本思想为
- 根据event带的data决定移动的步数
- 多次调用game_move_one来移动多步,由于game_move_one的异步属性,在一次调用后需等待一定的帧数(不断调用requestAnimationFrame同时计数实现),防止不同的game_move_one同时执行

#### game_move_one函数
local变量意义:count为一次行动用到的图片数,frames为每张图片持续显示的帧数,step_x,step_y为每帧移动的距离,all_x,all_y为整个过程以步数为单位移动的距离,walk_img为选用的不同方向行走的图片

helper function,使人物移动一步,基本思想为
- 根据game['dir']选用不同的walk_img,及计算local变量
- 检查是否越过图片边界
- 动画,每张图片显示frames帧,每次移动step_x,step_y,注意结束时应使用idle.png



| 队员 | 评分 |
| ---- | ---- |
| 刘珂 | 2.0  |
|      |      |

