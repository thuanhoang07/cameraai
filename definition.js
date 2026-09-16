var roboticsMotorBlockColor = "#0090f5";
var roboticsSensorBlockColor = "#9b6af6";

const ImgUrl2 = "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_rover/images/";

var motor_stop_then = [
  [
    Blockly.Msg.ROBOTICS_STOP,
    "stop()"
  ],
  [
    Blockly.Msg.ROBOTICS_MOTOR_BRAKE,
    "brake()"
  ]
];

var robotics_motors = [
  [
    "motor1",
    "motor1"
  ],
  [
    "motor2",
    "motor2"
  ],
  [
    "motor3",
    "motor3"
  ],
  [
    "motor4",
    "motor4"
  ],
  [
    "motor5",
    "motor5"
  ],
  [
    "motor6",
    "motor6"
  ],
  [
    "motor7",
    "motor7"
  ],
  [
    "motor8",
    "motor8"
  ],
  [
    "motor9",
    "motor9"
  ],
  [
    "motor10",
    "motor10"
  ],
]

var robotics_motors_with_none = [
  [
    "______",
    "None"
  ],
  [
    "motor1",
    "motor1"
  ],
  [
    "motor2",
    "motor2"
  ],
  [
    "motor3",
    "motor3"
  ],
  [
    "motor4",
    "motor4"
  ],
  [
    "motor5",
    "motor5"
  ],
  [
    "motor6",
    "motor6"
  ],
  [
    "motor7",
    "motor7"
  ],
  [
    "motor8",
    "motor8"
  ],
  [
    "motor9",
    "motor9"
  ],
  [
    "motor10",
    "motor10"
  ],
  [
    "",
    "None"
  ],

]

var robotics_servos = [
  [
    "servo1",
    "servo1"
  ],
  [
    "servo2",
    "servo2"
  ],
  [
    "servo3",
    "servo3"
  ],
  [
    "servo4",
    "servo4"
  ],
  [
    "servo5",
    "servo5"
  ],
  [
    "servo6",
    "servo6"
  ],
  [
    "servo7",
    "servo7"
  ],
  [
    "servo8",
    "servo8"
  ]
]

Blockly.Blocks['robotics_motor2p_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_init",
        "message0": Blockly.Msg.ROBOTICS_MOTOR_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "in1",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "in2",
            "options": digitalPins,
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor2p_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var in1 = block.getFieldValue("in1");
  var in2 = block.getFieldValue("in2");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_motor'] = 'from motor import *';
  Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor2PIN(' + in1 + '_PIN, ' + in2 + '_IN)';
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motor3p_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_init",
        "message0": Blockly.Msg.ROBOTICS_MOTOR_INIT1,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "in1",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "in2",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "pwm",
            "options": digitalPins,
          },
          {
            "type": "field_dropdown",
            "name": "stdby",
            "options": digitalPins,
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor3p_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var in1 = block.getFieldValue("in1");
  var in2 = block.getFieldValue("in2");
  var pwm = block.getFieldValue("pwm");
  var stdby = block.getFieldValue("stdby");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  if (stdby == 'None') {
    Blockly.Python.definitions_['init_motor_' + motor] = motor + 
      ' = DCMotor3PIN(' + in1 + '_PIN, ' + in2 + '_IN, ' +
      pwm + '_PIN, None)';
  } else {
    Blockly.Python.definitions_['init_motor_' + motor] = motor + 
      ' = DCMotor3PIN(' + in1 + '_PIN, ' + in2 + '_IN, ' +
      pwm + '_PIN, ' + stdby + '_PIN)';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motori2c_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motori2c_init",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_INIT1,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "index",
            "options": [
              [
                "M1",
                "M1"
              ],
              [
                "M2",
                "M2"
              ],
              [
                "M3",
                "M3"
              ],
              [
                "M4",
                "M4"
              ],
              [
                "E1",
                "E1"
              ],
              [
                "E2",
                "E2"
              ]
            ],
          },          
          {
            "type": "field_dropdown",
            "name": "md",
            "options": [
              [
                "Control Hub",
                "3"
              ],
              [
                "Motor Driver V2",
                "2"
              ],
              [
                "Motor Driver V1",
                "1"
              ],
            ],
          },
          {
            "type": "field_checkbox",
            "name": "REVERSED",
            "checked": false
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motori2c_init"] = function (block) {
  var motor = block.getFieldValue("motor");
  var index = block.getFieldValue("index");
  var md = block.getFieldValue("md");
  var reversed = block.getFieldValue('REVERSED') === 'TRUE';
  if (reversed) {
    reversed = 'True';
  } else {
    reversed = 'False';
  }
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  if (md == 1) {
    Blockly.Python.definitions_['import_robotics_mdv1'] = 'from mdv1 import *';
    Blockly.Python.definitions_['init_motor_driver_v1'] = 'md_v1 = MotorDriverV1()';
    Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor(md_v1, ' + index + ', reversed=' + reversed + ')';
  } else {
    Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
    Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
    Blockly.Python.definitions_['init_motor_' + motor] = motor + ' = DCMotor(md_v2, ' + index + ', reversed=' + reversed + ')';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_motor_run'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RUN,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run"] = function (block) {
  var motor = block.getFieldValue("motor");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = motor + ".run(" + speed + ")\n";

  return code;
};

//add motor brake

Blockly.Blocks['robotics_motor_brake'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_brake",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_ACTION,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            "type": "field_dropdown",
            "name": "action",
            "options": motor_stop_then,
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_brake"] = function (block) {
  var motor = block.getFieldValue("motor");
  var action = block.getFieldValue("action");
  // TODO: Assemble Python into code variable.
  var code = motor + "." + action + "\n";

  return code;
};

//
Blockly.Blocks['robotics_motor_set_encoder'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_set_encoder",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_SET_ENCODER,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "rpm",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "ppr",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "gears",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_motor_set_encoder"] = function (block) {
  var motor = block.getFieldValue("motor");
  var rpm = Blockly.Python.valueToCode(block, 'rpm', Blockly.Python.ORDER_ATOMIC);
  var ppr = Blockly.Python.valueToCode(block, 'ppr', Blockly.Python.ORDER_ATOMIC);
  var gears = Blockly.Python.valueToCode(block, 'gears', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = motor + ".set_encoder(rpm=" + rpm + ", ppr=" + ppr + ", gears=" + gears + ")\n";

  return code;
};

Blockly.Blocks['robotics_motor_run_wait'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run_wait",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RUN_WAIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "amount",
          },
          {
            "type": "field_dropdown",
            "name": "unit",
            "options": [
              [
                Blockly.Msg.ROBOTICS_SECONDS,
                "second"
              ],
              [
                Blockly.Msg.ROBOTICS_ROUND,
                "rotation"
              ],
              [
                Blockly.Msg.ROBOTICS_DEGREE,
                "angle"
              ],
            ],
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run_wait"] = function (block) {
  var motor = block.getFieldValue("motor");
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
  var unit = block.getFieldValue("unit");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "";
  if (unit == "second") {
    code = "await " + motor + ".run_time(speed=" + speed + ", time=" + amount + "*1000, then=STOP)\n";
  } else if (unit == "angle") {
    code = "await " + motor + ".run_angle(speed=" + speed + ", angle=" + amount + ", then=BRAKE)\n";
  } else if (unit == "rotation") {
    code = "await " + motor + ".run_rotation(speed=" + speed + ", rotation=" + amount + ", then=BRAKE)\n";
  }

  return code;
};

Blockly.Blocks['robotics_motor_run_stalled'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_motor_run_stalled",
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_STALLED,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors,
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 70,
            name: "speed",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};


Blockly.Python["robotics_motor_run_stalled"] = function (block) {
  var motor = block.getFieldValue("motor");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "await " + motor + ".run_until_stalled(" + speed + ", then=STOP)\n";

  return code;
};

Blockly.Blocks["robotics_motor_get"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 %2",
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: robotics_motors,
        },
        {
          "type": "field_dropdown",
          "name": "property",
          "options": [
            [
              Blockly.Msg.ROBOTICS_GET_ANGLE,
              "angle()"
            ],
            [
              Blockly.Msg.ROBOTICS_GET_TICKS,
              "encoder_ticks()"
            ],
            [
              Blockly.Msg.ROBOTICS_GET_SPEED,
              "speed()"
            ]
          ],
        },
      ],
      output: null,
      colour: roboticsMotorBlockColor,
      tooltip: "",
      helpUrl: ""
    });
  }
};

Blockly.Python["robotics_motor_get"] = function (block) {
  var motor = block.getFieldValue('motor');
  var property = block.getFieldValue('property');
  // TODO: Assemble Python into code variable.
  var code = motor + '.' + property;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_motor_reset_angle'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_I2C_MOTOR_RESET_TICKS,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "motor",
            "options": robotics_motors
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_motor_reset_angle'] = function (block) {
  var motor = block.getFieldValue('motor');
  // TODO: Assemble Python into code variable.
  var code = motor + ".reset_angle()\n";
  return code;
};

Blockly.Blocks['robotics_servo_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_servo_init",
        "message0": Blockly.Msg.ROBOTICS_SERVO_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "field_dropdown",
            "name": "port",
            "options": [
              [
                "S1",
                "S1"
              ],
              [
                "S2",
                "S2"
              ],
              [
                "S3",
                "S3"
              ],
              [
                "S4",
                "S4"
              ],
              [
                "D2",
                "D2"
              ],
              [
                "D3",
                "D3"
              ],
              [
                "D4",
                "D4"
              ],
              [
                "D5",
                "D5"
              ],
              [
                "D6",
                "D6"
              ],
              [
                "D7",
                "D7"
              ],
              [
                "D8",
                "D8"
              ],
              [
                "D9",
                "D9"
              ],
              [
                "D10",
                "D10"
              ],
              [
                "D11",
                "D11"
              ],
              [
                "D12",
                "D12"
              ],
              [
                "D13",
                "D13"
              ],
              [
                "D0",
                "D0"
              ],
              [
                "D1",
                "D1"
              ],
            ],
          },          
          {
            "type": "field_dropdown",
            "name": "type",
            "options": [
              [
                "180",
                "180"
              ],
              [
                "270",
                "270"
              ],
              [
                "360",
                "360"
              ],
            ],
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_servo_init"] = function (block) {
  var servo = block.getFieldValue("servo");
  var port = block.getFieldValue("port");
  var type = block.getFieldValue("type");
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_servo'] = 'from servo import *';
  if (port.startsWith("S")) {
    Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
    Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
    Blockly.Python.definitions_['init_robotics_servo_' + servo] = servo + ' = Servo(md_v2, ' + port + ', ' + type + ')';
  } else {
    Blockly.Python.definitions_['init_robotics_servo_' + servo] = servo + ' = Servo(' + port + '_PIN, ' + type + ')';
  }
  
  var code = "";
  return code;
};

Blockly.Blocks['robotics_servo_limit'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_LIMIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "min",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            "type": "input_value",
            "name": "max",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_limit'] = function (block) {
  var servo = block.getFieldValue("servo");
  var min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
  var max = Blockly.Python.valueToCode(block, 'max', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = servo + '.limit(min=' + min + ', max=' + max + ')\n';
  return code;
};


Blockly.Blocks['robotics_servo_angle'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_ANGLE,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "angle",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
            "min": 0,
            "max": 100,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_angle'] = function (block) {
  var servo = block.getFieldValue("servo");
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'await ' + servo + '.run_angle(angle=' + angle + ', speed=' + speed + ')\n';
  return code;
};

Blockly.Blocks['robotics_servo_steps'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_STEP,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "steps",
            "check": "Number",
            "min": 0,
            "max": 270,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_steps'] = function (block) {
  var servo = block.getFieldValue("servo");
  var steps = Blockly.Python.valueToCode(block, 'steps', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'await ' + servo + '.run_steps(' + steps + ')\n';
  return code;
};

Blockly.Blocks['robotics_servo_spin'] = {
  /**
   * Block for waiting.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit(
      {
        "message0": Blockly.Msg.ROBOTICS_SERVO_SPIN,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "servo",
            "options": robotics_servos,
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
            "min": -100,
            "max": 100,
          },
          {
            type: "input_dummy"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsMotorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python['robotics_servo_spin'] = function (block) {
  var servo = block.getFieldValue("servo");
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = servo + '.spin(' + speed + ')\n';
  return code;
};

// Angle sensor


Blockly.Blocks['robotics_angle_sensor_init'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_init",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_SENSOR_INIT,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "type",
            "options": [
              ["MPU6050", "MPU6050"]
            ]
          },
          {
            type: "input_value",
            check: "Number",
            value: 100,
            name: "samples",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_init"] = function (block) {
  var type = block.getFieldValue("type");
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  if (type == "MPU6050") {
    Blockly.Python.definitions_['import_robotics_mpu6050'] = 'from mpu6050 import MPU6050';
    Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050()';
  }

  if (type == "MPU9250") {
    Blockly.Python.definitions_['import_robotics_mpu9250'] = 'from robotics_mpu9250 import MPU9250';  
    Blockly.Python.definitions_['init_robotics_mpu9250'] = 'imu = MPU9250()';
  }
  
  Blockly.Python.definitions_['import_robotics_angle_sensor'] = 'from angle_sensor import AngleSensor';
  Blockly.Python.definitions_['init_robotics_angle_sensor'] = 'angle_sensor = AngleSensor(imu)';

  var code = 'angle_sensor.calibrate(' + samples + ')\n' + 
    'create_task(angle_sensor.run())\n' +
    'visionbot.set_angle_sensor(angle_sensor)\n';
    
  return code;
};

Blockly.Blocks['robotics_angle_sensor_calib'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_calib",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_SENSOR_CALIB,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 100,
            name: "samples",
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_calib"] = function (block) {
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'angle_sensor.calibrate(' + samples + ')\n' + 'await angle_sensor.reset()\n';
    
  return code;
};

Blockly.Blocks["robotics_angle_sensor_get"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_READ_ANGLE_SENSOR,
      args0: [
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [
            ["heading (yaw)", "heading"],
            ["pitch", "pitch"],
            ["roll", "roll"],
            [Blockly.Msg.ROBOTICS_ROBOT_READ_ALL_DATA, "print_data()"],
          ],
        }
      ],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_angle_sensor_get"] = function (block) {
  var axis = block.getFieldValue("AXIS");
  // TODO: Assemble Python into code variable.
  var code = "angle_sensor." + axis;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["robotics_angle_sensor_get_imu"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_GET_IMU,
      args0: [
        {
          type: "field_dropdown",
          name: "SENSOR",
          options: [
            ["accelerometer", "accel"],
            ["gyroscope", "gyro"],
            ["magnetometer", "mag"],
          ],
        },
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
          ],
        }
      ],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_angle_sensor_get_imu"] = function (block) {
  var sensor = block.getFieldValue("SENSOR");
  var axis = block.getFieldValue("AXIS");
  // TODO: Assemble Python into code variable.
  var code = "imu." + sensor + "." + axis + "";
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['robotics_angle_sensor_reset'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_reset",
        "message0": Blockly.Msg.ROBOTICS_ROBOT_ANGLE_RESET,
        "args0": [],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_reset"] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = 'await angle_sensor.reset()\n';

  return code;
};

Blockly.Blocks['robotics_angle_sensor_config'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robotics_angle_sensor_config",
        "message0": Blockly.Msg.ROBOTICS_ANGLE_SENSOR_CONFIG,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "POSITION",
            "options": [
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_1.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 1"
                },
                "1"
              ],
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_2.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 2"
                },
                "2"
              ],
              [
                {
                  "src": "https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolouno_extension_robotics/images/coordinate_3.png",
                  "width": 20,
                  "height": 20,
                  "alt": "Position 3"
                },
                "3"
              ]
            ]
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": roboticsSensorBlockColor,
        "tooltip": "",
        "helpUrl": ""
      }
    );
  }
};

Blockly.Python["robotics_angle_sensor_config"] = function (block) {
  var position = block.getFieldValue("POSITION");
  var t = "(0, 1, 2)";
  var s = "(1, 1, 1)";
  
  if (position == "2") {
    t = "(2, 1, 0)";
    s = "(-1, -1, -1)";
  } else if (position == "3") {
    t = "(2, 0, 1)";
    s = "(-1, -1, 1)";
  }

  if (Blockly.Python.definitions_['init_robotics_mpu6050']) {
    Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050(transposition=' + t + ', scaling=' + s + ')';
  }
  if (Blockly.Python.definitions_['init_robotics_mpu9250']) {
    Blockly.Python.definitions_['init_robotics_mpu9250'] = 'imu = MPU9250(transposition=' + t + ', scaling=' + s + ')';
  }
  return '';
};

Blockly.Blocks["robotics_get_battery"] = {
  init: function () {
    this.jsonInit({
      colour: roboticsSensorBlockColor,
      tooltip: "",
      message0: Blockly.Msg.ROBOTICS_ROBOT_GET_BATTERY,
      args0: [],
      output: "Number",
      helpUrl: ""
    });
  },
};

Blockly.Python["robotics_get_battery"] = function (block) {
  // TODO: Assemble Python into code variable.
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  var code = "md_v2.battery()";
  return [code, Blockly.Python.ORDER_NONE];
};

// --------------------------------------------------------------------------------------------------------
// AI Camera blocks (OhStem AI Vision Camera, UART) --------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

const AICameraColorBlock = "#3d2403";

var digitalPins = [
  ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"],
  ["D7", "D7"], ["D8", "D8"], ["D9", "D9"], ["D10", "D10"],
  ["D11", "D11"], ["D12", "D12"], ["D13", "D13"],
  ["D0", "D0"], ["D1", "D1"], ["D2", "D2"]
];

var aiCameraPins = [
  ["D3", "D3"], ["D4", "D4"], ["D5", "D5"], ["D6", "D6"], ["D7", "D7"], ["D8", "D8"]
];

Blockly.Blocks['ai_camera_uart_init'] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_uart_init",
      message0: Blockly.Msg.AI_CAMERA_UART_INIT,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "field_dropdown", name: "RX_PIN", options: aiCameraPins },
        { type: "field_dropdown", name: "TX_PIN", options: aiCameraPins }
      ],
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_UART_INIT_TOOLTIP,
      helpUrl: ""
    });
    // Mac dinh D3=RX, D4=TX (giong day cam hien tai / main.py)
    this.setFieldValue('D3', 'RX_PIN');
    this.setFieldValue('D4', 'TX_PIN');
  }
};

Blockly.Python['ai_camera_uart_init'] = function (block) {
  var rx = block.getFieldValue('RX_PIN');
  var tx = block.getFieldValue('TX_PIN');
  Blockly.Python.definitions_['import_ai_camera'] = 'from ai_camera import AICamera';
  Blockly.Python.definitions_['init_ai_camera'] = 'camera = AICamera(' + rx + '_PIN, ' + tx + '_PIN)';
  return '';
};

Blockly.Blocks['ai_camera_set_mode'] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_set_mode",
      message0: Blockly.Msg.AI_CAMERA_SET_MODE,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "MODE",
          options: [
            [Blockly.Msg.AI_CAMERA_MODE_0, "0"],
            [Blockly.Msg.AI_CAMERA_MODE_1, "1"],
            [Blockly.Msg.AI_CAMERA_MODE_2, "2"],
            [Blockly.Msg.AI_CAMERA_MODE_3, "3"],
            [Blockly.Msg.AI_CAMERA_MODE_4, "4"],
            [Blockly.Msg.AI_CAMERA_MODE_5, "5"],
            [Blockly.Msg.AI_CAMERA_MODE_6, "6"],
            [Blockly.Msg.AI_CAMERA_MODE_7, "7"]
          ]
        }
      ],
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_SET_MODE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_set_mode'] = function (block) {
  var mode = block.getFieldValue('MODE');
  var code = 'camera.set_mode(' + mode + ')\n';
  return code;
};

Blockly.Blocks["ai_camera_update_block"] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_update_block",
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_UPDATE_BLOCK_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_UPDATE_BLOCK,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "OBJECT_TYPE",
          options: [
            ["Face Recognition", "FaceRecognition"],
            ["Object Tracking", "ObjectTracking"],
            ["Object Recognition", "ObjectRecognition"],
            ["Color Recognition", "ColorRecognition"],
            ["Tag Recognition", "TagRecognition"]
          ]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_update_block'] = function (block) {
  var objectType = block.getFieldValue('OBJECT_TYPE');
  var objectId = block.getFieldValue('OBJECT_ID');
  var algoMap = { 'FaceRecognition': 0, 'ObjectTracking': 1, 'ObjectRecognition': 2, 'ColorRecognition': 4, 'TagRecognition': 5 };
  var algo = algoMap[objectType];
  Blockly.Python.definitions_['ai_camera_block_var_' + objectId] = '_camera_block_' + objectId + ' = {"x": 0, "y": 0, "w": 0, "h": 0, "offset": 0, "distance": 0, "conf": 0}';
  var code = 'camera.set_algorithm(' + algo + ')\n';
  code += 'global _camera_block_' + objectId + '\n_camera_block_' + objectId + ' = await camera.get_block(' + objectId + ')\n';
  return code;
};

Blockly.Blocks["ai_camera_bounding_box"] = {
  init: function () {
    this.jsonInit({
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_BOUNDING_BOX_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_BOUNDING_BOX,
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "DATA_TYPE",
          options: [
            [Blockly.Msg.AI_CAMERA_BBOX_X_CENTER, "x"],
            [Blockly.Msg.AI_CAMERA_BBOX_Y_CENTER, "y"],
            [Blockly.Msg.AI_CAMERA_BBOX_WIDTH, "w"],
            [Blockly.Msg.AI_CAMERA_BBOX_HEIGHT, "h"],
            [Blockly.Msg.AI_CAMERA_BBOX_OFFSET, "offset"],
            [Blockly.Msg.AI_CAMERA_BBOX_DISTANCE, "distance"],
            [Blockly.Msg.AI_CAMERA_BBOX_CONF, "conf"]
          ]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_bounding_box'] = function (block) {
  var dataType = block.getFieldValue('DATA_TYPE');
  var objectId = block.getFieldValue('OBJECT_ID');
  // Tu dam bao bien cache ton tai (phong khi chua tung goi khoi "Cap nhat"
  // cung ID, hoac dat sai thu tu) -> tranh NameError, mac dinh tra 0.
  Blockly.Python.definitions_['ai_camera_block_var_' + objectId] = '_camera_block_' + objectId + ' = {"x": 0, "y": 0, "w": 0, "h": 0, "offset": 0, "distance": 0, "conf": 0}';
  var code = '_camera_block_' + objectId + '["' + dataType + '"]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Blocks["ai_camera_update_arrow"] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_update_arrow",
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_UPDATE_ARROW_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_UPDATE_ARROW,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_update_arrow'] = function (block) {
  // camera.get_arrow() la buoc THAT SU can - no kich hoat doc UART moi nhat va
  // tu cap nhat camera.line_offset/camera.line_angle (dung thang, khong qua
  // cache _camera_arrow gia lap HuskyLens nua - xem ai_camera_line_tracking).
  var code = 'await camera.get_arrow()\n';
  return code;
};

Blockly.Blocks["ai_camera_line_tracking"] = {
  init: function () {
    this.jsonInit({
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_LINE_TRACKING_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_LINE_TRACKING,
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "POINT_TYPE",
          options: [
            [Blockly.Msg.AI_CAMERA_LINE_OFFSET, "offset"],
            [Blockly.Msg.AI_CAMERA_LINE_ANGLE, "angle"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_line_tracking'] = function (block) {
  var pointType = block.getFieldValue('POINT_TYPE');
  // Doc thang camera.line_offset / camera.line_angle - khong can bien cache
  // rieng nua nen khong con nguy co NameError du chua goi "Cap nhat duong line".
  var prop = (pointType === 'angle') ? 'line_angle' : 'line_offset';
  var code = 'camera.' + prop;
  return [code, Blockly.Python.ORDER_MEMBER];
};

// Block: ai_camera_line_junc_is - kiem tra loai giao lo/cua dang gap tren duong line.
// camera.line_junc luon o dang CHU HOA (xem ai_camera.py:_read_line, .upper()) nen
// gia tri so sanh o day cung phai CHU HOA de khop dung.
Blockly.Blocks["ai_camera_line_junc_is"] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_line_junc_is",
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_LINE_JUNC_IS_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_LINE_JUNC_IS,
      output: "Boolean",
      args0: [
        {
          type: "field_dropdown",
          name: "JUNC",
          options: [
            [Blockly.Msg.AI_CAMERA_JUNC_S, "S"],
            [Blockly.Msg.AI_CAMERA_JUNC_CROSS4, "CROSS4"],
            [Blockly.Msg.AI_CAMERA_JUNC_CROSS3T, "CROSS3T"],
            [Blockly.Msg.AI_CAMERA_JUNC_CROSS3L, "CROSS3L"],
            [Blockly.Msg.AI_CAMERA_JUNC_CROSS3R, "CROSS3R"],
            [Blockly.Msg.AI_CAMERA_JUNC_CURVE_L, "CURVE_L"],
            [Blockly.Msg.AI_CAMERA_JUNC_CURVE_R, "CURVE_R"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_line_junc_is'] = function (block) {
  var junc = block.getFieldValue('JUNC');
  var code = 'camera.line_junc == "' + junc + '"';
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

// Block: ai_camera_update_classification
Blockly.Blocks["ai_camera_update_classification"] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_update_classification",
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_UPDATE_CLASSIFICATION_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_UPDATE_CLASSIFICATION,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_update_classification'] = function (block) {
  // camera.get_class() doc tag "class:<ten_lop>" that (khac han truoc day, luc
  // do doc nham qua duong obj/cbox nen "id" luon = 1, khong phan loai dung).
  var code = 'await camera.get_class()\n';
  return code;
};

// Block: ai_camera_classification_is_id
// LUU Y: doi tu dropdown ID so (1..10, kieu HuskyLens) sang O NHAP TEN LOP dang
// chu, vi camera AI tra ve TEN LOP nguoi dung tu train (VD "apple"), khong phai
// so ID co dinh nhu HuskyLens.
Blockly.Blocks["ai_camera_classification_is_id"] = {
  init: function () {
    this.jsonInit({
      type: "ai_camera_classification_is_id",
      colour: AICameraColorBlock,
      tooltip: Blockly.Msg.AI_CAMERA_CLASSIFICATION_IS_ID_TOOLTIP,
      message0: Blockly.Msg.AI_CAMERA_CLASSIFICATION_IS_ID,
      output: "Boolean",
      args0: [
        { type: "field_input", name: "NAME", text: "apple" }
      ],
      inputsInline: true,
      helpUrl: ""
    });
  }
};

Blockly.Python['ai_camera_classification_is_id'] = function (block) {
  var name = block.getFieldValue('NAME');
  var code = 'camera.class_name == "' + name + '"';
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

// VisionBot Robot blocks ---------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

const VisionBotColorBlock = "#ff7513";
const VisionBotPIDColor = "#00a86b";
const VisionBotTrackColor = "#6b3a08";
const VisionBotGyroColor = "#066e31";
const VisionBotTestColor = "#ff7513";
const VisionBotGamepadColor = "#e74c3c";
const VisionBotLineColorA = "#c50bb6";
const VisionBotLineColorB = "#800375";

// Block: visionbot_motor_init_full (gộp khởi tạo động cơ + cài đặt encoder)
Blockly.Blocks['visionbot_motor_init_full'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_motor_init_full",
      message0: Blockly.Msg.VISIONBOT_MOTOR_INIT_FULL,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "encoder",
          options: [
            ["E1", "E1"],
            ["E2", "E2"]
          ]
        },
        {
          type: "field_dropdown",
          name: "side",
          options: [
            [Blockly.Msg.VISIONBOT_WHEEL_LEFT, "left"],
            [Blockly.Msg.VISIONBOT_WHEEL_RIGHT, "right"]
          ]
        },
        {
          type: "field_dropdown",
          name: "reverse",
          options: [
            [Blockly.Msg.VISIONBOT_OPTION_NO, "no"],
            [Blockly.Msg.VISIONBOT_OPTION_YES, "yes"]
          ]
        },
        { type: "input_value", name: "rpm", check: "Number" },
        { type: "input_value", name: "ppr", check: "Number" },
        { type: "input_value", name: "gears", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_MOTOR_INIT_FULL_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_motor_init_full'] = function (block) {
  var encoder = block.getFieldValue('encoder');
  var side = block.getFieldValue('side');
  var reverse = block.getFieldValue('reverse');
  var rpm = Blockly.Python.valueToCode(block, 'rpm', Blockly.Python.ORDER_ATOMIC);
  var ppr = Blockly.Python.valueToCode(block, 'ppr', Blockly.Python.ORDER_ATOMIC);
  var gears = Blockly.Python.valueToCode(block, 'gears', Blockly.Python.ORDER_ATOMIC);

  Blockly.Python.definitions_['import_visionbot'] = 'from visionbot import *';
  Blockly.Python.definitions_['import_robotics_motor'] = 'from motor import *';
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';

  // "đảo chiều = CÓ" → reversed=True. Áp dụng cho cả PWM và speed() (đã fix trong motor.py).
  // Không cần gọi reverse_encoder() driver-level nữa.
  var reversedStr = (reverse == 'yes') ? 'True' : 'False';

  // Gộp DCMotor init + set_encoder vào cùng 1 definition để cả hai cùng được hoist
  // lên top-level. Cách này đảm bảo set_encoder vẫn được sinh ra dù block được đặt
  // trong "khi Yolo UNO khởi động" (event này chỉ lấy definitions, bỏ qua body).
  if (side == 'left') {
    Blockly.Python.definitions_['init_visionbot_left'] =
      'visionbot_left = DCMotor(md_v2, ' + encoder + ', reversed=' + reversedStr + ')\n' +
      'visionbot_left.set_encoder(rpm=' + rpm + ', ppr=' + ppr + ', gears=' + gears + ')';
  } else {
    Blockly.Python.definitions_['init_visionbot_right'] =
      'visionbot_right = DCMotor(md_v2, ' + encoder + ', reversed=' + reversedStr + ')\n' +
      'visionbot_right.set_encoder(rpm=' + rpm + ', ppr=' + ppr + ', gears=' + gears + ')';
  }

  // Force `visionbot = VisionBot(...)` to appear AFTER both visionbot_left and visionbot_right.
  // Re-inserting requires delete first because Blockly.Python.definitions_ preserves first-insert order.
  delete Blockly.Python.definitions_['init_visionbot_robot'];
  delete Blockly.Python.definitions_['deinit_visionbot'];
  Blockly.Python.definitions_['init_visionbot_robot'] = 'visionbot = VisionBot(visionbot_left, visionbot_right)';
  Blockly.Python.definitions_['deinit_visionbot'] = 'visionbot.stop()';

  return '';
};

// Block 3: visionbot_set_speed
Blockly.Blocks['visionbot_set_speed'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_set_speed",
      message0: "VisionBot đặt tốc độ %1",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotColorBlock,
      tooltip: "Đặt tốc độ mặc định cho VisionBot",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_set_speed'] = function (block) {
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.speed(" + speed + ")\n";
  return code;
};

// Block 4: visionbot_move
Blockly.Blocks['visionbot_move'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_move",
      message0: "VisionBot %1 tốc độ %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/59043.svg", width: 15, height: 15, alt: "đi thẳng" }, "forward"],
            [{ src: "static/blocks/block_images/959159.svg", width: 15, height: 15, alt: "đi lùi" }, "backward"],
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotColorBlock,
      tooltip: "VisionBot di chuyển liên tục",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_move'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot." + dir + "(" + speed + ")\n";
  return code;
};

// Block 5: visionbot_move_for
Blockly.Blocks['visionbot_move_for'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_move_for",
      message0: "VisionBot %1 tốc độ %2 trong %3 %4 rồi %5",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/59043.svg", width: 15, height: 15, alt: "đi thẳng" }, "forward"],
            [{ src: "static/blocks/block_images/959159.svg", width: 15, height: 15, alt: "đi lùi" }, "backward"],
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "amount",
          check: "Number"
        },
        {
          type: "field_dropdown",
          name: "unit",
          options: [
            ["giây", "SECOND"],
            ["cm", "CM"]
          ]
        },
        {
          type: "field_dropdown",
          name: "then",
          options: [
            ["dừng lại", "STOP"],
            ["khóa bánh", "BRAKE"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotColorBlock,
      tooltip: "VisionBot di chuyển trong khoảng thời gian hoặc quãng đường rồi dừng",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_move_for'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var amount = Blockly.Python.valueToCode(block, 'amount', Blockly.Python.ORDER_ATOMIC);
  var unit = block.getFieldValue('unit');
  var then = block.getFieldValue('then');
  var code = "await visionbot." + dir + "_for(" + speed + ", " + amount + ", unit=" + unit + ", then=" + then + ")\n";
  return code;
};

// Block 6: visionbot_stop
Blockly.Blocks['visionbot_stop'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_stop",
      message0: "VisionBot %1",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "action",
          options: [
            ["dừng lại", "stop"],
            ["khóa bánh", "brake"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotColorBlock,
      tooltip: "Dừng VisionBot",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_stop'] = function (block) {
  var action = block.getFieldValue('action');
  var code = "visionbot." + action + "()\n";
  return code;
};

// Block 7: visionbot_gyro_init
Blockly.Blocks['visionbot_gyro_init'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_gyro_init",
      message0: Blockly.Msg.VISIONBOT_GYRO_INIT,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "samples",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotGyroColor,
      tooltip: Blockly.Msg.VISIONBOT_GYRO_INIT_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_gyro_init'] = function (block) {
  var samples = Blockly.Python.valueToCode(block, 'samples', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_robotics_mpu6050'] = 'from mpu6050 import MPU6050';
  Blockly.Python.definitions_['init_robotics_mpu6050'] = 'imu = MPU6050()';
  Blockly.Python.definitions_['import_robotics_angle_sensor'] = 'from angle_sensor import AngleSensor';
  Blockly.Python.definitions_['init_robotics_angle_sensor'] = 'angle_sensor = AngleSensor(imu)';
  var code = 'angle_sensor.calibrate(' + samples + ')\n' +
    'create_task(angle_sensor.run())\n' +
    'visionbot.set_angle_sensor(angle_sensor)\n';
  return code;
};

// Block 8: visionbot_turn_degree
Blockly.Blocks['visionbot_turn_degree'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_turn_degree",
      message0: Blockly.Msg.VISIONBOT_TURN_DEGREE,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "xoay trái" }, "turn_left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "xoay phải" }, "turn_right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "degree",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotGyroColor,
      tooltip: Blockly.Msg.VISIONBOT_TURN_DEGREE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_turn_degree'] = function (block) {
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var degree = Blockly.Python.valueToCode(block, 'degree', Blockly.Python.ORDER_ATOMIC);
  var code = "await visionbot." + dir + "_degree(" + speed + ", " + degree + ")\n";
  return code;
};

// Block 9: visionbot_run_speed
Blockly.Blocks['visionbot_run_speed'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_run_speed",
      message0: "VisionBot bánh TRÁI tốc độ %1 bánh PHẢI tốc độ %2",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "left_speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "right_speed",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotColorBlock,
      tooltip: "Điều khiển tốc độ từng bánh riêng biệt",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_run_speed'] = function (block) {
  var left_speed = Blockly.Python.valueToCode(block, 'left_speed', Blockly.Python.ORDER_ATOMIC);
  var right_speed = Blockly.Python.valueToCode(block, 'right_speed', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.run_speed(" + left_speed + ", " + right_speed + ")\n";
  return code;
};

// Block: visionbot_set_target_rpm
Blockly.Blocks['visionbot_set_target_rpm'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_set_target_rpm",
      message0: Blockly.Msg.VISIONBOT_SET_TARGET_RPM,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "left_rpm",
          check: "Number"
        },
        {
          type: "input_value",
          name: "right_rpm",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_SET_TARGET_RPM_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_set_target_rpm'] = function (block) {
  var left_rpm = Blockly.Python.valueToCode(block, 'left_rpm', Blockly.Python.ORDER_ATOMIC);
  var right_rpm = Blockly.Python.valueToCode(block, 'right_rpm', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.set_target_rpm(" + left_rpm + ", " + right_rpm + ")\n";
  return code;
};

// Block: visionbot_pid_update
Blockly.Blocks['visionbot_pid_update'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_pid_update",
      message0: Blockly.Msg.VISIONBOT_PID_UPDATE,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          name: "kp",
          check: "Number"
        },
        {
          type: "input_value",
          name: "ki",
          check: "Number"
        },
        {
          type: "input_value",
          name: "kd",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_PID_UPDATE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_pid_update'] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.pid_set(" + kp + ", " + ki + ", " + kd + ")\n";
  return code;
};

// Block: visionbot_pid_stop
Blockly.Blocks['visionbot_pid_stop'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_pid_stop",
      message0: Blockly.Msg.VISIONBOT_PID_STOP,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "side",
          options: [
            [Blockly.Msg.VISIONBOT_SIDE_BOTH, "both"],
            [Blockly.Msg.VISIONBOT_SIDE_LEFT, "left"],
            [Blockly.Msg.VISIONBOT_SIDE_RIGHT, "right"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_PID_STOP_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_pid_stop'] = function (block) {
  var side = block.getFieldValue('side');
  if (side == 'left') {
    return 'visionbot._target_left = 0\nvisionbot_left.brake()\n';
  } else if (side == 'right') {
    return 'visionbot._target_right = 0\nvisionbot_right.brake()\n';
  }
  return 'visionbot.pid_stop()\nvisionbot.brake()\n';
};

// Block: visionbot_pid_reset
Blockly.Blocks['visionbot_pid_reset'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_pid_reset",
      message0: Blockly.Msg.VISIONBOT_PID_RESET,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_PID_RESET_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_pid_reset'] = function (block) {
  var code = "visionbot.pid_reset()\n";
  return code;
};

// Block: visionbot_move_rpm (di chuyển theo hướng với RPM trong N giây)
Blockly.Blocks['visionbot_move_rpm'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_move_rpm",
      message0: Blockly.Msg.VISIONBOT_MOVE_RPM,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "direction",
          options: [
            [{ src: "static/blocks/block_images/59043.svg", width: 15, height: 15, alt: "lên" }, "forward"],
            [{ src: "static/blocks/block_images/959159.svg", width: 15, height: 15, alt: "xuống" }, "backward"],
            [{ src: "static/blocks/block_images/860774.svg", width: 15, height: 15, alt: "quẹo trái" }, "left"],
            [{ src: "static/blocks/block_images/74474.svg", width: 15, height: 15, alt: "quẹo phải" }, "right"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "input_value",
          name: "duration",
          check: "Number"
        }
      ],
      inputsInline: true,
      colour: VisionBotPIDColor,
      tooltip: Blockly.Msg.VISIONBOT_MOVE_RPM_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_move_rpm'] = function (block) {
  var direction = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);

  var left_rpm, right_rpm;
  if (direction == 'forward') {
    left_rpm = speed;
    right_rpm = speed;
  } else if (direction == 'backward') {
    left_rpm = '-(' + speed + ')';
    right_rpm = '-(' + speed + ')';
  } else if (direction == 'left') {
    left_rpm = '-(' + speed + ')';
    right_rpm = speed;
  } else {  // right
    left_rpm = speed;
    right_rpm = '-(' + speed + ')';
  }

  var code = 'visionbot.set_target_rpm(' + left_rpm + ', ' + right_rpm + ')\n';
  code += 'await asleep_ms(int(' + duration + ' * 1000))\n';
  code += 'visionbot.pid_stop()\nvisionbot.brake()\n';
  return code;
};

// ============ Vision Tracking Blocks ============

// Block: visionbot_track_set_pid
Blockly.Blocks['visionbot_track_set_pid'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_set_pid",
      message0: "VisionBot tracking set PID %1 Kp %2 Ki %3 Kd %4",
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [["X", "x"], ["Y", "y"]]
        },
        { type: "input_value", name: "kp", check: "Number" },
        { type: "input_value", name: "ki", check: "Number" },
        { type: "input_value", name: "kd", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: "Cài đặt thông số PID cho trục X (lái) hoặc Y (tiến/lùi)",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_set_pid'] = function (block) {
  var axis = block.getFieldValue('AXIS');
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  return "visionbot.track_set_pid_" + axis + "(" + kp + ", " + ki + ", " + kd + ")\n";
};

// Block: visionbot_track_set_pid_x
Blockly.Blocks['visionbot_track_set_pid_x'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_set_pid_x",
      message0: Blockly.Msg.VISIONBOT_TRACK_SET_PID_X,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "kp", check: "Number" },
        { type: "input_value", name: "ki", check: "Number" },
        { type: "input_value", name: "kd", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_SET_PID_X_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_set_pid_x'] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  return "visionbot.track_set_pid_x(" + kp + ", " + ki + ", " + kd + ")\n";
};

// Block: visionbot_track_set_pid_y
Blockly.Blocks['visionbot_track_set_pid_y'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_set_pid_y",
      message0: Blockly.Msg.VISIONBOT_TRACK_SET_PID_Y,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "kp", check: "Number" },
        { type: "input_value", name: "ki", check: "Number" },
        { type: "input_value", name: "kd", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_SET_PID_Y_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_set_pid_y'] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  return "visionbot.track_set_pid_y(" + kp + ", " + ki + ", " + kd + ")\n";
};

// Block: visionbot_track_set_speed
Blockly.Blocks['visionbot_track_set_speed'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_set_speed",
      message0: Blockly.Msg.VISIONBOT_TRACK_SET_SPEED,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "min_speed", check: "Number" },
        { type: "input_value", name: "max_speed", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_SET_SPEED_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_set_speed'] = function (block) {
  var min_speed = Blockly.Python.valueToCode(block, 'min_speed', Blockly.Python.ORDER_ATOMIC);
  var max_speed = Blockly.Python.valueToCode(block, 'max_speed', Blockly.Python.ORDER_ATOMIC);
  return "visionbot.track_set_speed(" + min_speed + ", " + max_speed + ")\n";
};

// Block: visionbot_track_update
Blockly.Blocks['visionbot_track_update'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_update",
      message0: Blockly.Msg.VISIONBOT_TRACK_UPDATE,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [["1","1"],["2","2"],["3","3"]]
        },
        {
          type: "field_dropdown",
          name: "AXIS",
          options: [[Blockly.Msg.VISIONBOT_AXIS_X, "x"], [Blockly.Msg.VISIONBOT_AXIS_Y, "y"]]
        },
        { type: "input_value", name: "target", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_UPDATE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_update'] = function (block) {
  var axis = block.getFieldValue('AXIS');
  var objectId = block.getFieldValue('OBJECT_ID');
  var target = Blockly.Python.valueToCode(block, 'target', Blockly.Python.ORDER_MULTIPLICATIVE);
  // Nguoi dung nhap toa do theo DUNG khung hinh THAT cua camera AI (240x176).
  // Noi bo camera.get_block() van tra ve he giao lap HuskyLens (320x240,
  // xem AICamera.HK_W/HK_H trong ai_camera.py) de KHONG dong den PID/deadzone
  // dang tune san -> phai quy doi target ve dung he do o day.
  //   X: 240 -> 320 (nhan 320/240)   Y: 176 -> 240 (nhan 240/176)
  var scale = (axis === 'x') ? '320 / 240' : '240 / 176';
  target = '(' + target + ') * ' + scale;
  Blockly.Python.definitions_['visionbot_track_cfg'] = '_track_cfg = {"x": None, "y": None}';
  Blockly.Python.definitions_['visionbot_track_step'] =
    'async def _visionbot_track_step():\n' +
    '    cfg_x = _track_cfg["x"]\n' +
    '    cfg_y = _track_cfg["y"]\n' +
    '    if not cfg_x and not cfg_y:\n' +
    '        return\n' +
    '    if cfg_x and cfg_y and cfg_x[0] == cfg_y[0]:\n' +
    '        blk = await camera.get_block(cfg_x[0])\n' +
    '        visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    else:\n' +
    '        if cfg_x:\n' +
    '            blk = await camera.get_block(cfg_x[0])\n' +
    '            visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        if cfg_y:\n' +
    '            blk = await camera.get_block(cfg_y[0])\n' +
    '            visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    visionbot.set_target_rpm(visionbot.track_vt, visionbot.track_vp)';
  return '_track_cfg["' + axis + '"] = (' + objectId + ', ' + target + ')\n';
};

// Block: visionbot_track_speed (value block)
Blockly.Blocks['visionbot_track_speed'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_speed",
      message0: "VisionBot tracking %1",
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "OUTPUT",
          options: [["tốc độ trái", "track_vt"], ["tốc độ phải", "track_vp"]]
        }
      ],
      colour: VisionBotTrackColor,
      tooltip: "Đọc tốc độ tracking: vT (bánh trái) hoặc vP (bánh phải)",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_speed'] = function (block) {
  var output = block.getFieldValue('OUTPUT');
  return ["visionbot." + output, Blockly.Python.ORDER_MEMBER];
};

// Block: visionbot_track_follow
Blockly.Blocks['visionbot_track_follow'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_follow",
      message0: Blockly.Msg.VISIONBOT_TRACK_FOLLOW,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_FOLLOW_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_follow'] = function (block) {
  Blockly.Python.definitions_['visionbot_track_cfg'] = '_track_cfg = {"x": None, "y": None}';
  Blockly.Python.definitions_['visionbot_track_step'] =
    'async def _visionbot_track_step():\n' +
    '    cfg_x = _track_cfg["x"]\n' +
    '    cfg_y = _track_cfg["y"]\n' +
    '    if not cfg_x and not cfg_y:\n' +
    '        return\n' +
    '    if cfg_x and cfg_y and cfg_x[0] == cfg_y[0]:\n' +
    '        blk = await camera.get_block(cfg_x[0])\n' +
    '        visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    else:\n' +
    '        if cfg_x:\n' +
    '            blk = await camera.get_block(cfg_x[0])\n' +
    '            visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        if cfg_y:\n' +
    '            blk = await camera.get_block(cfg_y[0])\n' +
    '            visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    visionbot.set_target_rpm(visionbot.track_vt, visionbot.track_vp)';
  return 'await _visionbot_track_step()\n';
};

// Block: visionbot_track_follow_for
Blockly.Blocks['visionbot_track_follow_for'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_follow_for",
      message0: Blockly.Msg.VISIONBOT_TRACK_FOLLOW_FOR,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "duration", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_FOLLOW_FOR_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_follow_for'] = function (block) {
  Blockly.Python.definitions_['visionbot_track_cfg'] = '_track_cfg = {"x": None, "y": None}';
  Blockly.Python.definitions_['visionbot_track_step'] =
    'async def _visionbot_track_step():\n' +
    '    cfg_x = _track_cfg["x"]\n' +
    '    cfg_y = _track_cfg["y"]\n' +
    '    if not cfg_x and not cfg_y:\n' +
    '        return\n' +
    '    if cfg_x and cfg_y and cfg_x[0] == cfg_y[0]:\n' +
    '        blk = await camera.get_block(cfg_x[0])\n' +
    '        visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    else:\n' +
    '        if cfg_x:\n' +
    '            blk = await camera.get_block(cfg_x[0])\n' +
    '            visionbot.track_x(blk["x"], cfg_x[1])\n' +
    '        if cfg_y:\n' +
    '            blk = await camera.get_block(cfg_y[0])\n' +
    '            visionbot.track_y(blk["y"], cfg_y[1])\n' +
    '    visionbot.set_target_rpm(visionbot.track_vt, visionbot.track_vp)';
  Blockly.Python.definitions_['import_ticks'] = 'from time import ticks_ms';
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  return (
    '_t_end = ticks_ms() + int((' + duration + ') * 1000)\n' +
    'while ticks_ms() < _t_end:\n' +
    '    await _visionbot_track_step()\n' +
    '    await asleep_ms(50)\n' +
    'visionbot.brake()\n'
  );
};

// Block: visionbot_track_stop
Blockly.Blocks['visionbot_track_stop'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_track_stop",
      message0: Blockly.Msg.VISIONBOT_TRACK_STOP,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotTrackColor,
      tooltip: Blockly.Msg.VISIONBOT_TRACK_STOP_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_track_stop'] = function (block) {
  return 'visionbot.pid_stop()\nvisionbot.brake()\n';
};

// Block 10: visionbot_motor_run
Blockly.Blocks['visionbot_motor_run'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_motor_run",
      message0: Blockly.Msg.VISIONBOT_MOTOR_RUN,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: [
            ["M1", "M1"],
            ["M2", "M2"],
            ["M3", "M3"],
            ["M4", "M4"]
          ]
        },
        {
          type: "input_value",
          name: "speed",
          check: "Number"
        },
        {
          type: "field_dropdown",
          name: "reverse",
          options: [
            [Blockly.Msg.VISIONBOT_OPTION_NO, "no"],
            [Blockly.Msg.VISIONBOT_OPTION_YES, "yes"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotTestColor,
      tooltip: Blockly.Msg.VISIONBOT_MOTOR_RUN_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_motor_run'] = function (block) {
  var motor = block.getFieldValue('motor');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var reverse = block.getFieldValue('reverse');
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  var speedExpr = (reverse == 'yes') ? '-(' + speed + ')' : speed;
  var code = "md_v2.set_motors(" + motor + ", " + speedExpr + ")\n";
  return code;
};

// Block: visionbot_motor_run_for (quay trong N giây)
Blockly.Blocks['visionbot_motor_run_for'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_motor_run_for",
      message0: Blockly.Msg.VISIONBOT_MOTOR_RUN_FOR,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: [
            ["M1", "M1"],
            ["M2", "M2"],
            ["M3", "M3"],
            ["M4", "M4"]
          ]
        },
        { type: "input_value", name: "speed", check: "Number" },
        { type: "input_value", name: "duration", check: "Number" },
        {
          type: "field_dropdown",
          name: "reverse",
          options: [
            [Blockly.Msg.VISIONBOT_OPTION_NO, "no"],
            [Blockly.Msg.VISIONBOT_OPTION_YES, "yes"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotTestColor,
      tooltip: Blockly.Msg.VISIONBOT_MOTOR_RUN_FOR_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_motor_run_for'] = function (block) {
  var motor = block.getFieldValue('motor');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  var reverse = block.getFieldValue('reverse');
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  var speedExpr = (reverse == 'yes') ? '-(' + speed + ')' : speed;
  var code = 'md_v2.set_motors(' + motor + ', ' + speedExpr + ')\n';
  code += 'await asleep_ms(int((' + duration + ') * 1000))\n';
  code += 'md_v2.stop(' + motor + ')\n';
  return code;
};

// Block: visionbot_motor_stop (dừng động cơ M1-M4)
Blockly.Blocks['visionbot_motor_stop'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_motor_stop",
      message0: Blockly.Msg.VISIONBOT_MOTOR_STOP,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "motor",
          options: [
            ["M1", "M1"],
            ["M2", "M2"],
            ["M3", "M3"],
            ["M4", "M4"]
          ]
        }
      ],
      inputsInline: true,
      colour: VisionBotTestColor,
      tooltip: Blockly.Msg.VISIONBOT_MOTOR_STOP_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_motor_stop'] = function (block) {
  var motor = block.getFieldValue('motor');
  Blockly.Python.definitions_['import_robotics_mdv2'] = 'from mdv2 import *';
  Blockly.Python.definitions_['init_motor_driver_v2'] = 'md_v2 = MotorDriverV2()';
  return 'md_v2.stop(' + motor + ')\n';
};

// ============ VisionBot Test Print Speed ============

// Block: visionbot_print_speed (in ra tốc độ 2 động cơ)
Blockly.Blocks['visionbot_print_speed'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_print_speed",
      message0: "In tốc độ 2 động cơ",
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: VisionBotTestColor,
      tooltip: "In tốc độ RPM của 2 động cơ encoder ra terminal",
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_print_speed'] = function (block) {
  var code = 'print("L:", visionbot_left.speed(), "R:", visionbot_right.speed())\n';
  return code;
};

// ============ VisionBot Gamepad ============

// Block: visionbot_gamepad_init
Blockly.Blocks['visionbot_gamepad_init'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_gamepad_init",
      message0: Blockly.Msg.VISIONBOT_GAMEPAD_INIT,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "input_value",
          check: "Number",
          value: 3,
          name: "accel_steps",
        },
      ],
      colour: VisionBotGamepadColor,
      inputsInline: true,
      tooltip: Blockly.Msg.VISIONBOT_GAMEPAD_INIT_TOOLTIP,
      helpUrl: ""
    });
  },
};

Blockly.Python['visionbot_gamepad_init'] = function (block) {
  var steps = Blockly.Python.valueToCode(block, 'accel_steps', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_ble'] = 'from ble import *';
  Blockly.Python.definitions_['import_robotics_gamepad'] = 'from gamepad import *';
  Blockly.Python.definitions_['init_robotics_gamepad'] = 'gamepad = Gamepad()';

  var code = 'create_task(ble.wait_for_msg())\n';
  code += 'create_task(gamepad.run())\n';
  code += 'create_task(visionbot.run_teleop(gamepad, accel_steps=' + steps + '))\n';
  return code;
};

// Block: visionbot_gamepad_on_button
Blockly.Blocks['visionbot_gamepad_on_button'] = {
  init: function () {
    this.jsonInit({
      colour: VisionBotGamepadColor,
      message0: Blockly.Msg.VISIONBOT_GAMEPAD_ON_BUTTON,
      tooltip: Blockly.Msg.VISIONBOT_GAMEPAD_ON_BUTTON_TOOLTIP,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_UP"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_DOWN"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-square.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-circle.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-cross.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-triangle.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
            ["SHARE", "BTN_M1"],
            ["OPTIONS", "BTN_M2"],
            ["Left Joystick", "BTN_THUMBL"],
            ["Right Joystick", "BTN_THUMBR"],
          ],
        },
        {
          type: "input_dummy",
        },
        {
          type: "input_statement",
          name: "ACTION",
        },
      ],
      helpUrl: "",
    });
  }
};

Blockly.Python['visionbot_gamepad_on_button'] = function (block) {
  var button = block.getFieldValue('BUTTON');
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');

  var globals = buildGlobalString(block);

  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_cmd_' + button,
    (globals != '') ?
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals,
        statements_action || Blockly.Python.PASS
      ] :
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        statements_action || Blockly.Python.PASS
      ]);

  var code = 'visionbot.on_teleop_command(' + button + ', ' + cbFunctionName + ')';
  Blockly.Python.definitions_['setup_visionbot_on_teleop_command' + button] = code;

  return '';
};

// Block: visionbot_gamepad_read_button
Blockly.Blocks['visionbot_gamepad_read_button'] = {
  init: function () {
    this.jsonInit({
      colour: VisionBotGamepadColor,
      tooltip: Blockly.Msg.VISIONBOT_GAMEPAD_READ_BUTTON_TOOLTIP,
      message0: Blockly.Msg.VISIONBOT_GAMEPAD_READ_BUTTON,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_UP"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_DOWN"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-square.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-circle.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-cross.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": "static/blocks/block_images/gamepad-triangle.png",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
          ],
        }
      ],
      output: "Boolean",
      helpUrl: "",
    });
  },
};

Blockly.Python['visionbot_gamepad_read_button'] = function (block) {
  var button = block.getFieldValue("BUTTON");
  var code = 'gamepad.data[' + button + '] == 1';
  return [code, Blockly.Python.ORDER_NONE];
};

// Block: visionbot_gamepad_read_joystick
Blockly.Blocks['visionbot_gamepad_read_joystick'] = {
  init: function () {
    this.jsonInit({
      colour: VisionBotGamepadColor,
      tooltip: Blockly.Msg.VISIONBOT_GAMEPAD_READ_JOYSTICK_TOOLTIP,
      message0: Blockly.Msg.VISIONBOT_GAMEPAD_READ_JOYSTICK,
      args0: [
        {
          type: "field_dropdown",
          name: "joystick",
          options: [
            [Blockly.Msg.VISIONBOT_JOYSTICK_LEFT, "AL"],
            [Blockly.Msg.VISIONBOT_JOYSTICK_RIGHT, "AR"]
          ]
        },
        {
          type: "field_dropdown",
          name: "data",
          options: [
            ["X", "X"],
            ["Y", "Y"],
            [Blockly.Msg.VISIONBOT_JOYSTICK_DIRECTION, "_DIR"],
            [Blockly.Msg.VISIONBOT_JOYSTICK_DISTANCE, "_DISTANCE"]
          ]
        }
      ],
      output: "Number",
      helpUrl: "",
    });
  },
};

Blockly.Python['visionbot_gamepad_read_joystick'] = function (block) {
  var joystick = block.getFieldValue("joystick");
  var data = block.getFieldValue("data");
  var code = 'gamepad.data[' + joystick + data + ']';
  return [code, Blockly.Python.ORDER_NONE];
};

// Block: visionbot_gamepad_pause
Blockly.Blocks['visionbot_gamepad_pause'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_gamepad_pause",
      message0: Blockly.Msg.VISIONBOT_GAMEPAD_PAUSE,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "action",
          options: [
            [Blockly.Msg.VISIONBOT_GAMEPAD_PAUSE_ACTION, "True"],
            [Blockly.Msg.VISIONBOT_GAMEPAD_RESUME_ACTION, "False"],
          ],
        },
      ],
      colour: VisionBotGamepadColor,
      inputsInline: true,
      tooltip: Blockly.Msg.VISIONBOT_GAMEPAD_PAUSE_TOOLTIP,
      helpUrl: ""
    });
  },
};

Blockly.Python['visionbot_gamepad_pause'] = function (block) {
  var action = block.getFieldValue("action");
  var code = "visionbot.mode_auto = " + action + "\n";
  return code;
};

// ============ VisionBot Line Sensor ============

// Block: visionbot_line_sensor_init
Blockly.Blocks['visionbot_line_sensor_init'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_init",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_INIT,
      args0: [],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotLineColorA,
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_INIT_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_init'] = function (block) {
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  return '';
};

// Block: visionbot_line_sensor_update
Blockly.Blocks['visionbot_line_sensor_update'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_update",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_UPDATE,
      args0: [],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotLineColorA,
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_UPDATE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_update'] = function (block) {
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  Blockly.Python.definitions_['init_ls_a_cache'] = '_ls_a = (0, 0, 0, 0)';
  var code = "global _ls_a\n_ls_a = line_sensor.read()\n";
  return code;
};

// Block: visionbot_line_sensor_read_all
Blockly.Blocks['visionbot_line_sensor_read_all'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_read_all",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_READ_ALL,
      args0: [
        {
          type: "field_dropdown",
          name: "S1",
          options: [
            [
              {
                "src": ImgUrl2 + 'line_finder_none_detect.png',
                "width": 15,
                "height": 15,
                "alt": "none"
              },
              "0"
            ],
            [
              {
                "src": ImgUrl2 + 'line_finder_detect.png',
                "width": 15,
                "height": 15,
                "alt": "detect"
              },
              "1"
            ]
          ]
        },
        {
          type: "field_dropdown",
          name: "S2",
          options: [
            [
              {
                "src": ImgUrl2 + 'line_finder_none_detect.png',
                "width": 15,
                "height": 15,
                "alt": "none"
              },
              "0"
            ],
            [
              {
                "src": ImgUrl2 + 'line_finder_detect.png',
                "width": 15,
                "height": 15,
                "alt": "detect"
              },
              "1"
            ]
          ]
        },
        {
          type: "field_dropdown",
          name: "S3",
          options: [
            [
              {
                "src": ImgUrl2 + 'line_finder_none_detect.png',
                "width": 15,
                "height": 15,
                "alt": "none"
              },
              "0"
            ],
            [
              {
                "src": ImgUrl2 + 'line_finder_detect.png',
                "width": 15,
                "height": 15,
                "alt": "detect"
              },
              "1"
            ]
          ]
        },
        {
          type: "field_dropdown",
          name: "S4",
          options: [
            [
              {
                "src": ImgUrl2 + 'line_finder_none_detect.png',
                "width": 15,
                "height": 15,
                "alt": "none"
              },
              "0"
            ],
            [
              {
                "src": ImgUrl2 + 'line_finder_detect.png',
                "width": 15,
                "height": 15,
                "alt": "detect"
              },
              "1"
            ]
          ]
        }
      ],
      colour: VisionBotLineColorA,
      output: "Boolean",
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_READ_ALL_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_read_all'] = function (block) {
  Blockly.Python.definitions_['import_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  var code = "line_sensor.read() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

// Block: visionbot_line_sensor_read
Blockly.Blocks['visionbot_line_sensor_read'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_read",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_READ,
      args0: [
        {
          type: "field_dropdown",
          name: "port",
          options: [
            ["A1", "0"],
            ["A2", "1"],
            ["A3", "2"],
            ["A4", "3"],
          ],
        },
      ],
      colour: VisionBotLineColorA,
      output: "Boolean",
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_READ_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_read'] = function (block) {
  Blockly.Python.definitions_['import_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  var port = block.getFieldValue("port");
  var code = "line_sensor.read(" + port + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

// ============ Line Sensor B (cảm biến thứ 2 — gắn vào GPIO D3-D8) ============

// Block: visionbot_line_sensor_b_init
Blockly.Blocks['visionbot_line_sensor_b_init'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_b_init",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_INIT,
      args0: [
        {
          type: "field_dropdown",
          name: "scl_pin",
          options: [
            ["D3", "D3"],
            ["D5", "D5"],
            ["D7", "D7"]
          ]
        },
        {
          type: "field_dropdown",
          name: "sda_pin",
          options: [
            ["D4", "D4"],
            ["D6", "D6"],
            ["D8", "D8"]
          ]
        }
      ],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotLineColorB,
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_INIT_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_b_init'] = function (block) {
  var sclPin = block.getFieldValue('scl_pin');
  var sdaPin = block.getFieldValue('sda_pin');
  Blockly.Python.definitions_['import_line_sensor_dual'] = 'from line_sensor_dual import LineSensor2I2C';
  Blockly.Python.definitions_['import_setting_pins_dual'] = 'from setting import *';
  Blockly.Python.definitions_['init_line_sensor_b'] =
    'line_sensor_b = LineSensor2I2C(scl_pin2=' + sclPin + '_PIN, sda_pin2=' + sdaPin + '_PIN)';
  return '';
};

// Block: visionbot_line_sensor_b_update
Blockly.Blocks['visionbot_line_sensor_b_update'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_b_update",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_UPDATE,
      args0: [],
      inputsInline: true,
      previousStatement: null,
      nextStatement: null,
      colour: VisionBotLineColorB,
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_UPDATE_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_b_update'] = function (block) {
  Blockly.Python.definitions_['import_line_sensor_dual'] = 'from line_sensor_dual import LineSensor2I2C';
  Blockly.Python.definitions_['init_ls_b_cache'] = '_ls_b = (0, 0, 0, 0)';
  var code = "global _ls_b\n_ls_b = line_sensor_b.read_ss2()\n";
  return code;
};

// Block: visionbot_line_sensor_b_read_all
Blockly.Blocks['visionbot_line_sensor_b_read_all'] = {
  init: function () {
    var dropdownOptions = function () {
      return [
        [
          { src: ImgUrl2 + 'line_finder_none_detect.png', width: 15, height: 15, alt: "none" },
          "0"
        ],
        [
          { src: ImgUrl2 + 'line_finder_detect.png', width: 15, height: 15, alt: "detect" },
          "1"
        ]
      ];
    };
    this.jsonInit({
      type: "visionbot_line_sensor_b_read_all",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_READ_ALL,
      args0: [
        { type: "field_dropdown", name: "S1", options: dropdownOptions() },
        { type: "field_dropdown", name: "S2", options: dropdownOptions() },
        { type: "field_dropdown", name: "S3", options: dropdownOptions() },
        { type: "field_dropdown", name: "S4", options: dropdownOptions() }
      ],
      colour: VisionBotLineColorB,
      output: "Boolean",
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_READ_ALL_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_b_read_all'] = function (block) {
  Blockly.Python.definitions_['import_line_sensor_dual'] = 'from line_sensor_dual import LineSensor2I2C';
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  var code = "line_sensor_b.read_ss2() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

// Block: visionbot_line_sensor_b_read
Blockly.Blocks['visionbot_line_sensor_b_read'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_line_sensor_b_read",
      message0: Blockly.Msg.VISIONBOT_LINE_SENSOR_READ,
      args0: [
        {
          type: "field_dropdown",
          name: "port",
          options: [
            ["B1", "0"],
            ["B2", "1"],
            ["B3", "2"],
            ["B4", "3"]
          ]
        }
      ],
      colour: VisionBotLineColorB,
      output: "Boolean",
      tooltip: Blockly.Msg.VISIONBOT_LINE_SENSOR_B_READ_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_line_sensor_b_read'] = function (block) {
  Blockly.Python.definitions_['import_line_sensor_dual'] = 'from line_sensor_dual import LineSensor2I2C';
  var port = block.getFieldValue("port");
  var code = "line_sensor_b.read_ss2()[" + port + "]";
  return [code, Blockly.Python.ORDER_NONE];
};













// ============ VisionBot Camera Line Following Blocks ============

const VisionBotCameraLineColor = "#9c5a1a";

// Block: visionbot_camera_line_speed_set
Blockly.Blocks['visionbot_camera_line_speed_set'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_camera_line_speed_set",
      message0: Blockly.Msg.VISIONBOT_CAMERA_LINE_SPEED_SET,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "max_speed", check: "Number" },
        { type: "input_value", name: "deadzone", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotCameraLineColor,
      tooltip: Blockly.Msg.VISIONBOT_CAMERA_LINE_SPEED_SET_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_camera_line_speed_set'] = function (block) {
  var max_speed = Blockly.Python.valueToCode(block, 'max_speed', Blockly.Python.ORDER_ATOMIC);
  var deadzone = Blockly.Python.valueToCode(block, 'deadzone', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.camera_line_speed_set(" + max_speed + ", " + deadzone + ")\n";
  return code;
};

// Block: visionbot_camera_line_pid_set
Blockly.Blocks['visionbot_camera_line_pid_set'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_camera_line_pid_set",
      message0: Blockly.Msg.VISIONBOT_CAMERA_LINE_PID_SET,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "kp", check: "Number" },
        { type: "input_value", name: "ki", check: "Number" },
        { type: "input_value", name: "kd", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotCameraLineColor,
      tooltip: Blockly.Msg.VISIONBOT_CAMERA_LINE_PID_SET_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_camera_line_pid_set'] = function (block) {
  var kp = Blockly.Python.valueToCode(block, 'kp', Blockly.Python.ORDER_ATOMIC);
  var ki = Blockly.Python.valueToCode(block, 'ki', Blockly.Python.ORDER_ATOMIC);
  var kd = Blockly.Python.valueToCode(block, 'kd', Blockly.Python.ORDER_ATOMIC);
  var code = "visionbot.camera_line_pid_set(" + kp + ", " + ki + ", " + kd + ")\n";
  return code;
};

// Block: visionbot_follow_line_camera_by_time
Blockly.Blocks['visionbot_follow_line_camera_by_time'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_follow_line_camera_by_time",
      message0: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA_BY_TIME,
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: "input_value", name: "duration", check: "Number" }
      ],
      inputsInline: true,
      colour: VisionBotCameraLineColor,
      tooltip: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA_BY_TIME_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_follow_line_camera_by_time'] = function (block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  Blockly.Python.definitions_['import_ai_camera'] = 'from ai_camera import AICamera';
  Blockly.Python.definitions_['init_ai_camera'] = 'camera = AICamera(D3_PIN, D4_PIN)';
  var code = "_cl_start = ticks_ms()\n";
  code += "while ticks_ms() - _cl_start < " + duration + " * 1000:\n";
  code += "  await visionbot.camera_line_step(camera)\n";
  code += "  await asleep_ms(50)\n";
  code += "visionbot.brake()\n";
  return code;
};

// Block: visionbot_follow_line_camera
Blockly.Blocks['visionbot_follow_line_camera'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_follow_line_camera",
      message0: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: VisionBotCameraLineColor,
      tooltip: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_follow_line_camera'] = function (block) {
  Blockly.Python.definitions_['import_ai_camera'] = 'from ai_camera import AICamera';
  Blockly.Python.definitions_['init_ai_camera'] = 'camera = AICamera(D3_PIN, D4_PIN)';
  var code = "await visionbot.camera_line_step(camera)\n";
  return code;
};

// Block: visionbot_follow_line_camera_stop
Blockly.Blocks['visionbot_follow_line_camera_stop'] = {
  init: function () {
    this.jsonInit({
      type: "visionbot_follow_line_camera_stop",
      message0: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA_STOP,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      inputsInline: true,
      colour: VisionBotCameraLineColor,
      tooltip: Blockly.Msg.VISIONBOT_FOLLOW_LINE_CAMERA_STOP_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['visionbot_follow_line_camera_stop'] = function (block) {
  var code = "visionbot.camera_line_reset()\nvisionbot.pid_stop()\nvisionbot.brake()\n";
  return code;
};


// ============================================================================
//  Cam bien mau VEML6040 (doc lap voi cam bien do line -> bien color_sensor rieng).
//  Nguoi dung VEML6040 roi van dung duoc; khong phu thuoc ban line 5 mat.
// ============================================================================
var _color_init_defs = function () {
  Blockly.Python.definitions_['import_robotics_color_sensor'] = 'from veml6040 import VEML6040';
  Blockly.Python.definitions_['init_robotics_color_sensor'] = 'color_sensor = VEML6040()';
};

// Bang mau ho tro boi VEML6040 (khop _COLOR_REFS trong veml6040.py). Dung chung
// cho ca 2 khoi color_detect (6 mau that) va color_calibrate (+ nen/vach den).
var _COLOR_HEX_TO_NAME = {
  '#ffffff': 'white',
  '#000000': 'black',
  '#ff0000': 'red',
  '#ffff00': 'yellow',
  '#00ff00': 'green',
  '#00ffff': 'cyan',
  '#0000ff': 'blue',
  '#ff00ff': 'magenta'
};

function _colorHexToName(hex) {
  return _COLOR_HEX_TO_NAME[(hex || '').toLowerCase()] || 'red';
}

Blockly.Blocks['robotics_color_start'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_color_start",
      "message0": Blockly.Msg.ROBOTICS_COLOR_START || "bật cảm biến màu",
      "args0": [],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsSensorBlockColor,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_color_start"] = function (block) {
  _color_init_defs();
  return "create_task(color_sensor.color_run())\n";
};

Blockly.Blocks['robotics_color_detect'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_color_detect",
      "message0": Blockly.Msg.ROBOTICS_COLOR_DETECT || "cảm biến màu phát hiện màu %1",
      "args0": [
        {
          "type": "field_colour",
          "name": "COLOR",
          "colour": "#ffff00",
          "colourOptions": ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
          "colourTitles": ["đỏ", "vàng", "xanh lá", "xanh lơ", "xanh dương", "hồng thẫm"],
          "columns": 3
        }
      ],
      "colour": roboticsSensorBlockColor,
      "output": "Boolean",
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_color_detect"] = function (block) {
  _color_init_defs();
  var color = _colorHexToName(block.getFieldValue("COLOR"));
  var code = '(color_sensor.color() == "' + color + '")';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Blocks['robotics_color_read'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_color_read",
      "message0": Blockly.Msg.ROBOTICS_COLOR_READ || "cảm biến màu đọc %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            ["độ sáng (lux)", "LUX"],
            ["giá trị đỏ", "RED"],
            ["giá trị xanh lá", "GREEN"],
            ["giá trị xanh dương", "BLUE"],
            ["nhiệt độ màu", "CCT"]
          ]
        }
      ],
      "colour": roboticsSensorBlockColor,
      "output": "Number",
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_color_read"] = function (block) {
  _color_init_defs();
  var value = block.getFieldValue("VALUE");
  var code;
  if (value === 'LUX') {
    code = 'color_sensor.get_lux()';
  } else if (value === 'CCT') {
    code = 'color_sensor.get_cct()';
  } else {
    code = 'color_sensor.get_' + value.toLowerCase() + '()';
  }
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// Hieu chuan tham chieu 1 mau: dat cam bien len be mat mau roi chon o mau tuong ung.
// "nen"      (trang) -> tham chieu nen trang (VEML ref 'white' -> phan loai None).
// "vach den" (den)   -> tham chieu vach den  (VEML ref 'black' -> phan loai None):
//   dung de cam bien khong nhan nham line den thanh mau.
Blockly.Blocks['robotics_color_calibrate'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_color_calibrate",
      "message0": Blockly.Msg.ROBOTICS_COLOR_CALIBRATE || "cảm biến màu hiệu chỉnh màu %1",
      "args0": [
        {
          "type": "field_colour",
          "name": "COLOR",
          "colour": "#ffffff",
          "colourOptions": ["#ffffff", "#000000", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
          "colourTitles": [
            Blockly.Msg.ROBOTICS_COLOR_BACKGROUND || "nền",
            Blockly.Msg.ROBOTICS_COLOR_LINE || "vạch đen",
            "đỏ", "vàng", "xanh lá", "xanh lơ", "xanh dương", "hồng thẫm"
          ],
          "columns": 4
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsSensorBlockColor,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_color_calibrate"] = function (block) {
  _color_init_defs();
  var name = _colorHexToName(block.getFieldValue("COLOR"));
  return 'color_sensor.calibrate_color("' + name + '")\n';
};

// Dat lai LED trang: LED nay VAN thuoc phan cung cam bien line 5 mat
// (line_sensor.set_white_led), nhung nguoi dung hay quen bat truoc khi doc/calib
// mau (thieu sang -> R+G+B qua thap -> classify_hue() luon tra None). Duplicate
// 1 block goi CUNG ham nay, dat trong nhom "Cam bien mau" de de thay/nho bat.
// KHONG xoa block goc ben "Cam bien line 5 mat" (robotics_line5_set_white_led).
Blockly.Blocks['robotics_color_set_white_led'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_color_set_white_led",
      "message0": Blockly.Msg.ROBOTICS_COLOR_SET_WHITE_LED || Blockly.Msg.ROBOTICS_LINE5_SET_WHITE_LED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "state",
          "options": [[Blockly.Msg.ROBOTICS_ON || "ON", "True"], [Blockly.Msg.ROBOTICS_OFF || "OFF", "False"]]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsSensorBlockColor,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_color_set_white_led"] = function (block) {
  _line5_init_defs();
  var state = block.getFieldValue("state");
  var code = "line_sensor.set_white_led(" + state + ")\n";
  return code;
};

// ============================================================================
//  Cam bien do line 5 mat (STM32G030 I2C @0x24). Dung CHUNG bien 'line_sensor'
//  voi khoi "Line sensor A" (LineSensorI2C() tu auto-detect 4/5 mat qua __new__)
//  -> chi dung 1 trong 2 nhom khoi tuy board thuc te dang gan, KHONG dung ca 2.
//  update/read_all/read_mode dung Blockly-side cache (_ls5) giong style _ls_a/_ls_b
//  hien co (khong doc I2C truc tiep moi lan doc), rieng che do "analog" van doc
//  song vi read_raw() la thanh ghi khac, khong nam trong cache digital.
// ============================================================================

var roboticsLineBlockColor = "#34ccf1";

function line5DetectOptions(name) {
  return {
    "type": "field_dropdown",
    "name": name,
    "options": [
      [{ "src": ImgUrl2 + 'line_finder_none_detect.png', "width": 15, "height": 15, "alt": "none" }, "0"],
      [{ "src": ImgUrl2 + 'line_finder_detect.png', "width": 15, "height": 15, "alt": "detect" }, "1"]
    ]
  };
}

var _line5_init_defs = function () {
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
};

// ---- BLOCK: khoi tao (dung chung bien line_sensor, auto-detect 4/5 mat) ----
Blockly.Blocks['robotics_line5_init'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_line5_init",
      "message0": Blockly.Msg.ROBOTICS_ROBOT_I2C_LINE5_SENSOR_INIT,
      "args0": [],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsLineBlockColor,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_line5_init"] = function (block) {
  _line5_init_defs();
  return '';
};

// ---- BLOCK: cap nhat cache (nhu visionbot_line_sensor_update / _b_update) ----
Blockly.Blocks['robotics_line5_update'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_line5_update",
      "message0": Blockly.Msg.ROBOTICS_LINE5_UPDATE,
      "args0": [],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsLineBlockColor,
      "tooltip": "", "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_line5_update"] = function (block) {
  _line5_init_defs();
  Blockly.Python.definitions_['init_ls5_cache'] = '_ls5 = (0, 0, 0, 0, 0)';
  var code = "global _ls5\n_ls5 = line_sensor.read()\n";
  return code;
};

// ---- BLOCK: doc pattern S1..S5 tu cache (nhu visionbot_line_sensor_b_read_all) ----
Blockly.Blocks['robotics_line5_read_all'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_line5_read_all",
      "message0": Blockly.Msg.ROBOTICS_LINE5_READ_ALL_MESSAGE0,
      "args0": [
        line5DetectOptions("S1"),
        line5DetectOptions("S2"),
        line5DetectOptions("S3"),
        line5DetectOptions("S4"),
        line5DetectOptions("S5")
      ],
      "colour": roboticsLineBlockColor,
      "output": "Boolean",
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_line5_read_all"] = function (block) {
  _line5_init_defs();
  var S1 = block.getFieldValue("S1");
  var S2 = block.getFieldValue("S2");
  var S3 = block.getFieldValue("S3");
  var S4 = block.getFieldValue("S4");
  var S5 = block.getFieldValue("S5");
  var code = "line_sensor.read() == (" + S1 + ", " + S2 + ", " + S3 + ", " + S4 + ", " + S5 + ")";
  return [code, Blockly.Python.ORDER_NONE];
};

// ---- BLOCK: doc digital (tu cache) hoac analog (doc song, khac thanh ghi) ----
Blockly.Blocks['robotics_line5_read_mode'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_line5_read_mode",
      "message0": Blockly.Msg.ROBOTICS_LINE5_READ_MODE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "mode",
          "options": [
            [Blockly.Msg.ROBOTICS_LINE5_MODE_DIGITAL || "digital", "digital"],
            [Blockly.Msg.ROBOTICS_LINE5_MODE_ANALOG  || "analog",  "analog"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "port",
          "options": [
            [Blockly.Msg.ROBOTICS_LINE5_ALL || "tất cả", "all"],
            ["S1", "0"], ["S2", "1"], ["S3", "2"], ["S4", "3"], ["S5", "4"]
          ]
        }
      ],
      "colour": roboticsLineBlockColor,
      "output": null,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_line5_read_mode"] = function (block) {
  var mode = block.getFieldValue("mode");
  var port = block.getFieldValue("port");
  if (mode === "analog") {
    // read_raw() la thanh ghi analog rieng (0x10) -> khong nam trong cache digital
    // _ls5 (tu thanh ghi TUPLE 0x06) -> phai doc song, khong dung cache.
    _line5_init_defs();
    var code = (port === "all") ? "line_sensor.read_raw()" : "line_sensor.read_raw(" + port + ")";
    return [code, Blockly.Python.ORDER_ATOMIC];
  }
  Blockly.Python.definitions_['import_robotics_line_sensor'] = 'from line_sensor import *';
  Blockly.Python.definitions_['init_robotics_line_sensor'] = 'line_sensor = LineSensorI2C()';
  var code = (port === "all") ? "line_sensor.read()" : "line_sensor.read(" + port + ")";
  return [code, Blockly.Python.ORDER_ATOMIC];
};

// ---- BLOCK: bat/tat LED trang tren board 5 mat ----
Blockly.Blocks['robotics_line5_set_white_led'] = {
  init: function () {
    this.jsonInit({
      "type": "robotics_line5_set_white_led",
      "message0": Blockly.Msg.ROBOTICS_LINE5_SET_WHITE_LED,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "state",
          "options": [[Blockly.Msg.ROBOTICS_ON || "bật", "True"], [Blockly.Msg.ROBOTICS_OFF || "tắt", "False"]]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": roboticsLineBlockColor,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Python["robotics_line5_set_white_led"] = function (block) {
  _line5_init_defs();
  var state = block.getFieldValue("state");
  var code = "line_sensor.set_white_led(" + state + ")\n";
  return code;
};


// ============================================================================
//  Ghi de khoi "lap lai ... khi / cho den khi" (controls_whileUntil) cua Blockly.
//
//  LY DO: toan bo app chay tren mot event loop bat dong bo (run_loop/asleep_ms).
//  Mot vong `while` do nguoi dung tao ma khong co diem `await` nao trong than se
//  chiem CPU vinh vien (busy-loop), chan ca event loop -> PID/dong co/cam bien
//  khong con duoc cap nhat -> robot "treo". Nguoi dung thuong khong biet la BUOC
//  phai chen `await asleep_ms(...)` trong than vong.
//
//  GIAI PHAP: tu dong noi them mot dong `await asleep_ms(50)` vao CUOI than moi
//  vong `while` sinh ra tu khoi nay (luon chen - phuong an an toan tuyet doi).
//  Chi ap dung cho `while` (controls_whileUntil); KHONG dung cho `for`
//  (controls_repeat_ext/controls_for) de giu toc do vong lap huu han.
//
//  Ghi de dat o CUOI file de chac chan chay SAU generator mac dinh cua Blockly.
// ============================================================================
(function () {
  var AUTO_YIELD_MS = 25; // thoi gian nhuong quyen mac dinh (ms)

  function _whileUntilGenerator(block) {
    var P = Blockly.Python;
    var indent = P.INDENT || '  ';

    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = P.valueToCode(
      block, 'BOOL',
      until ? P.ORDER_LOGICAL_NOT : P.ORDER_NONE
    ) || 'False';

    var branch = P.statementToCode(block, 'DO');
    // addLoopTrap khong phai ban Blockly nao cung co -> goi an toan.
    if (typeof P.addLoopTrap === 'function') {
      branch = P.addLoopTrap(branch, block);
    }

    // Diem nhuong quyen tu dong, thut cung muc voi than vong.
    var yieldLine = indent + 'await asleep_ms(' + AUTO_YIELD_MS + ')\n';

    // Neu than rong (nguoi dung chua bo gi vao), van phai co than hop le:
    // chi can dong yield la du (vua tranh loi cu phap, vua nhuong quyen).
    if (!branch) {
      branch = '';
    }
    branch = branch + yieldLine;

    if (until) {
      argument0 = 'not ' + argument0;
    }
    return 'while ' + argument0 + ':\n' + branch;
  }

  if (typeof Blockly !== 'undefined' && Blockly.Python) {
    // API kieu cu (khop voi phan con lai cua file nay).
    Blockly.Python['controls_whileUntil'] = _whileUntilGenerator;
    // API kieu moi (Blockly v10+): gan them de phong nen tang dung forBlock.
    if (Blockly.Python.forBlock) {
      Blockly.Python.forBlock['controls_whileUntil'] = _whileUntilGenerator;
    }
  }
})();
