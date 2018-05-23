/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.ml');  // Deprecated
goog.provide('Blockly.Constants.ml');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
{
  "type": "tee",
  "message0": "Tee %1 CSV %2 %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "input",
      "check": [
        "csv",
        "df"
      ]
    },
    {
      "type": "input_statement",
      "name": "output"
    }
  ],
  "inputsInline": false,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "stripper",
  "message0": "Stripper %1 Columns %2 %3 CSV %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "columns",
      "text": ""
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "csv",
      "check": [
        "csv",
        "df"
      ]
    }
  ],
  "inputsInline": false,
  "output": [
    "csv",
    "df"
  ],
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "data_reader",
  "message0": "Data Reader %1 URL %2 %3 URI %4 %5 Config %6 %7 Output %8 %9 Columns %10",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "url",
      "text": "ftp://"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "uri",
      "text": "/"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "config",
      "text": "default"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "streamType",
      "options": [
        [
          "csv",
          "csv"
        ],
        [
          "df",
          "df"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "columns",
      "text": ""
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "model_reader",
  "message0": "Model Reader %1 URL %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "url",
      "text": "ftp://"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "joiner",
  "message0": "Joiner %1 Readers %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "readers",
      "check": "csv"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 90,
  "tooltip": "Joins multiple csv",
  "helpUrl": ""
},
{
  "type": "createdf",
  "message0": "CreateDF %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "reader",
      "check": "csv"
    }
  ],
  "nextStatement": "df",
  "colour": 90,
  "tooltip": "Coverts csv to df",
  "helpUrl": ""
},
{
  "type": "program",
  "message0": "Program %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "operation",
      "check": "operation"
    }
  ],
  "colour": 90,
  "tooltip": "A collection/sequence of operations",
  "helpUrl": ""
},
{
  "type": "joiner_input",
  "message0": "Joiner Element %1 CSV %2 Key %3 %4 Columns %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "csv",
      "check": [
        "csv",
        "df"
      ]
    },
    {
      "type": "field_input",
      "name": "key",
      "text": "1"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "columns",
      "text": "1"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "nn_config",
  "message0": "NN Config %1 Optimizer %2 %3 Loss function %4 %5 Layers %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "optimizer",
      "options": [
        [
          "adam",
          "adam"
        ],
        [
          "sgd",
          "sgd"
        ],
        [
          "softmax",
          "softmax"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "loss function",
      "options": [
        [
          "mean_absolute_error",
          "mean_absolute_error"
        ],
        [
          "option",
          "OPTIONNAME"
        ],
        [
          "option",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "layers"
    }
  ],
  "output": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "nn_layer_config",
  "message0": "NN Layer Config %1 Layer type %2 %3 Activation Function %4 %5 Optimizer %6 %7 Threshold %8",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "Layer type",
      "options": [
        [
          "dropout",
          "dropout"
        ],
        [
          "dense",
          "dense"
        ],
        [
          "lstm",
          "lstm"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "activation function",
      "options": [
        [
          "sigmoid",
          "sigmoid"
        ],
        [
          "Tanh",
          "Tanh"
        ],
        [
          "ReLU",
          "ReLU"
        ],
        [
          "softmax",
          "softmax"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "optimizer",
      "options": [
        [
          "sgd",
          "sgd"
        ],
        [
          "Adam",
          "Adam"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "threshold",
      "text": "0.5"
    }
  ],
  "output": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ml",
  "message0": "ML %1 %2 %3 Shape %4 %5 Config %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "Gradient Descent",
          "Gradient Descent"
        ],
        [
          "Ordinary Least Squares Regression",
          "Ordinary Least Squares Regression"
        ],
        [
          "SVM Linear classifier",
          "SVM Linear classifier"
        ],
        [
          "NN_SKLearn MLP Classifier",
          "NN_SKLearn MLP Classifier"
        ],
        [
          "KNN Classifier",
          "KNN Classifier"
        ],
        [
          "NN_LSTM Sequential Classifier",
          "NN_LSTM Sequential Classifier"
        ],
        [
          "Gradient Boosting Regressor",
          "Gradient Boosting Regressor"
        ],
        [
          "NN_LSTM RNN Regression",
          "NN_LSTM RNN Regression"
        ],
        [
          "NN_LSTM CNN Regression",
          "NN_LSTM CNN Regression"
        ],
        [
          "Linear Regression SVM",
          "Linear Regression SVM"
        ],
        [
          "KNN Cluster",
          "KNN Cluster"
        ],
        [
          "DLib Clustering",
          "DLib Clustering"
        ],
        [
          "NN_CNN",
          "NN_CNN"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "shape",
      "text": "2,2"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Config",
      "check": [
        "nnconfig",
        "String"
      ]
    }
  ],
  "output": "model definition",
  "colour": 90,
  "tooltip": "testingte  stingg",
  "helpUrl": ""
},
{
  "type": "var",
  "message0": "Identifier %1 %2",
  "args0": [
    {
      "type": "field_variable",
      "name": "NAME",
      "variable": "item"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "model"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "train",
  "message0": "Train %1 Model definition %2 Shape %3 Show result %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Model",
      "check": "model definition"
    },
    {
      "type": "input_value",
      "name": "shaper",
      "check": "shape"
    },
    {
      "type": "field_checkbox",
      "name": "show result",
      "checked": true
    }
  ],
  "inputsInline": false,
  "output": "model",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "shaper",
  "message0": "Shaper %1 CSV %2 X %3 Dimension %4 %5 Y %6 %7 Test Data %% %8",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "csv"
    },
    {
      "type": "field_input",
      "name": "input columns",
      "text": "*"
    },
    {
      "type": "field_dropdown",
      "name": "dimension",
      "options": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "output columns",
      "text": "-1"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "test data",
      "text": "20"
    }
  ],
  "inputsInline": false,
  "output": "shape",
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "predict",
  "message0": "Predict %1 Pick model %2 %3 Shape %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_variable",
      "name": "predict_model",
      "variable": "model"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Shape",
      "check": "shape"
    }
  ],
  "output": null,
  "colour": 90,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "writer",
  "message0": "Writer %1 Data/Model %2 URI %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "writer_input",
      "check": [
        "model",
        "csv"
      ]
    },
    {
      "type": "field_input",
      "name": "writer_uri_var",
      "text": "default"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 75,
  "tooltip": "",
  "helpUrl": ""
}
]);