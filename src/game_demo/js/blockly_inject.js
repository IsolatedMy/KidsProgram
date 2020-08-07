//define custom block
Blockly.defineBlocksWithJsonArray([
  {
    "type": "move_forward",
    "message0": "move_forward %1",
    "args0": [
      {
        "type": "field_number",
        "name": "NAME",
        "value": 1
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
    "message0": "turn %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "direction",
        "options": [
          [
            "left",
            cst['dir']['LEFT'].toString()
          ],
          [
            "right",
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
  }
]);

//block code generation(dispatchevent)
Blockly.JavaScript['move_forward'] = function(block) {
  var number_name = block.getFieldValue('NAME');
  var code = 
    `
      var event = new CustomEvent('move_forward',{detail:
        {value:${number_name}}
      });
      elem_game.dispatchEvent(event);\n
    `;
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var code = 
    `
      var event = new CustomEvent('turn',{detail:
        {value:${dropdown_direction}}
      });
      elem_game.dispatchEvent(event);\n
    `;
  return code;
};

//inject blockly
let  workspace = Blockly.inject('blockly-editor',
  {
   toolbox: document.getElementById('toolbox'),
   grid:
     {
       spacing: 20,
       length: 3,
       colour: '#888',
       snap: true
     }
  }
);
