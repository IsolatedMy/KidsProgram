//define custom block
Blockly.defineBlocksWithJsonArray([
  {
    "type": "move_forward",
    "message0": "前进 %1",
    "args0": [
      {
        "type": "field_number",
        "name": "NAME",
        "value": 1,
        "min": 0,
        "max": 5
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "turn",
    "message0": "转弯 %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "direction",
        "options": [
          [
            "向左转",
            cst['dir']['LEFT'].toString()
          ],
          [
            "向右转",
            cst['dir']['RIGHT'].toString()
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "condition_block",
    "message0": "如果 %1 就 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "condition"
      },
      {
        "type": "input_statement",
        "name": "do"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "condition",
    "message0": "发生 %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "dir",
        "options": [
          [
            "前面有障碍",
            cst['dir']['UP'].toString()
          ]
        ]
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "loop_block",
    "message0": "执行 %1 次 %2 %3",
    "args0": [
      {
        "type": "field_number",
        "name": "times",
        "value": 0,
        "min": 0,
        "max": 15
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "statement"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
}
]);

//block code generation(dispatchevent)
Blockly.JavaScript['move_forward'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  var code =
    `
    await game_move(${number_name});\n
    `;
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var code =
    `
    game_turn(${dropdown_direction});\n
    `;
  return code;
};

Blockly.JavaScript['condition_block'] = function(block) {
  var value = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statement = Blockly.JavaScript.statementToCode(block, 'do');
  // TODO: Assemble JavaScript into code variable.
  console.log(value);
  var code =`
    if (${value}) {
      ${statement}\n
    }
  `;
  return code;
};

Blockly.JavaScript['condition'] = function(block) {
  var dir = block.getFieldValue('dir');
  // TODO: Assemble JavaScript into code variable.
  var code = `
    barrier_judge( ${dir} )\n
  `;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['loop_block'] = function(block) {
  var times = block.getFieldValue('times');
  var statements = Blockly.JavaScript.statementToCode(block, 'statement');
  // TODO: Assemble JavaScript into code variable.
  console.log(statements);
  var code = `
    for (let i = 0; i < ${times}; i = i + 1 )
    {
      ${statements}\n
    }
  `;
  return code;
};

//add block highlight functionality
Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');

function highlightBlock(id) {
  workspace.highlightBlock(id);
}

//inject blockly
let workspace = Blockly.inject('blockly-editor',
  {
   toolbox: document.getElementById('toolbox'),
   grid:
     {
       spacing: 20,
       length: 3,
       colour: '#888',
       snap: true
     },
    maxBlocks: max_blocks
  }
);

function update_capacity() {
  document.getElementById('capacity').textContent = workspace.remainingCapacity();
}

//update block capacity info
workspace.addChangeListener(update_capacity);
update_capacity();
