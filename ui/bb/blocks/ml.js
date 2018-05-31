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

goog.provide('Blockly.Blocks.ml');
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
  "colour": 230,
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "csv_reader",
  "message0": "CSV Reader %1 URL %2 %3 URI %4 %5 Config %6 %7 Output %8 %9 Columns %10 %11 Transformers %12 Selection %13 %14 Number of rows %15",
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
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "Transformers"
    },
    {
      "type": "field_dropdown",
      "name": "selection",
      "options": [
        [
          "full",
          "full"
        ],
        [
          "head",
          "head"
        ],
        [
          "tail",
          "tail"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "number of rows",
      "text": "5"
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
  "colour": 230,
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
      "name": "readers"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
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
  "colour": 230,
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
  "colour": 230,
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "nn_config",
  "message0": "NN Config %1 optimizer %2 %3 loss function %4 %5 Layers %6",
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
          "mean_squared_error",
          "mean_squared_error"
        ],
        [
          "categorical_crossentropy",
          "categorical_crossentropy"
        ],
        [
          "binary_crossentropy",
          "binary_crossentropy"
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "nn_layer_config",
  "message0": "NN Layer Config %1 Layer type %2 %3 Activation Function %4 %5 Optimizer %6 %7 Threshold %8 %9 Input Shape %10",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "Layer type",
      "options": [
        [
          "Dropout",
          "Dropout"
        ],
        [
          "Dense",
          "Dense"
        ],
        [
          "LSTM",
          "LSTM"
        ],
        [
          "RNN",
          "RNN"
        ],
        [
          "CNN",
          "CNN"
        ],
        [
          "CNN-2D",
          "CNN-2D"
        ],
        [
          "MaxPooling",
          "MaxPooling"
        ],
        [
          "MaxPooling-2D",
          "MaxPooling-2D"
        ],
        [
          "Flatten",
          "Flatten"
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
          "Sigmoid",
          "sigmoid"
        ],
        [
          "Tanh",
          "tanh"
        ],
        [
          "ReLU",
          "relu"
        ],
        [
          "Softmax",
          "softmax"
        ],
        [
          "Linear",
          "linear"
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
        ],
        [
          "adadelta",
          "adadelta"
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
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "shape"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "supervised_models",
  "message0": "Supervised Models %1 %2 %3 Shape %4 %5 Config %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "SVM Regression",
          "SVM Regression"
        ],
        [
          "SVM Classifiication",
          "SVM Classification"
        ],
        [
          "Gradient Boosting Regressor",
          "Gradient Boosting Regressor"
        ],
        [
          "Multi-Output Gradient Boosting Regressor",
          "Multi-Output Gradient Boosting Regressor"
        ],
        [
          "KNN Classifier",
          "KNN Classifier"
        ],
        [
          "Keras Sequential Model",
          "Keras Sequential Model"
        ],
        [
          "NN_SKLearn MLP Classifier",
          "NN_SKLearn MLP Classifier"
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
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "unsupervised_models",
  "message0": "Unsupervised Models %1 %2 %3 Shape %4 %5 Config %6 Input %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "DLib Image Clustering",
          "DLib Image Clustering"
        ],
        [
          "K-Means Clustering",
          "K-Means Clustering"
        ],
        [
          "PCA",
          "PCA"
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
    },
    {
      "type": "input_value",
      "name": "input"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "testingte  stingg",
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "shaper",
  "message0": "Shaper %1 XInput %2 X %3 Dimension %4 %5 YInput %6 Y %7 Dimension %8 Offset %9 %10 Test Data %% %11",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "shaper_xinput_csv",
      "check": "csv"
    },
    {
      "type": "field_input",
      "name": "input columns",
      "text": "*"
    },
    {
      "type": "field_dropdown",
      "name": "xdimension",
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
      "type": "input_value",
      "name": "shaper_yinput_csv",
      "check": "csv"
    },
    {
      "type": "field_input",
      "name": "output columns",
      "text": "-1"
    },
    {
      "type": "field_dropdown",
      "name": "ydimension",
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
      "type": "field_input",
      "name": "yoffset",
      "text": "0"
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
  "output": null,
  "colour": 230,
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "csv_writer",
  "message0": "CSV Writer %1 CSV %2 URI %3",
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
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "image_writer",
  "message0": "Image Writer %1 Image %2 Result %3 URI %4 %5 Regex %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "writer_input",
      "check": "image"
    },
    {
      "type": "input_value",
      "name": "result"
    },
    {
      "type": "field_input",
      "name": "writer_uri_var",
      "text": "default"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "imagewriter_regex",
      "text": "*.jpg"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "model_writer",
  "message0": "Model Writer %1 Model %2 URI %3 %4 Regex %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "writer_input",
      "check": "image"
    },
    {
      "type": "field_input",
      "name": "writer_uri_var",
      "text": "default"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "imagewriter_regex",
      "text": "*.jpg"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "text_writer",
  "message0": "Text Writer %1 Text %2 URI %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "textwriter_input",
      "check": "String"
    },
    {
      "type": "field_input",
      "name": "writer_uri_var",
      "text": "default"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "transformer",
  "message0": "Transformer %1 Column %2 %3 Function %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "column",
      "text": "0"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "function",
      "text": "plus1"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "image_reader",
  "message0": "Image Reader %1 URL %2 %3 URI %4 %5 Transformers %6",
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
      "type": "input_value",
      "name": "Transformers"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "text_reader",
  "message0": "Text Reader %1 URL %2 %3 URI %4 %5 Transformers %6",
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
      "type": "input_value",
      "name": "Transformers"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "outlier_deletion",
  "message0": "Outlier Deletion",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "normalizer",
  "message0": "NormDenorm %1 Range %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "range",
      "text": "-1,1"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "norm",
  "message0": "Norm %1 Data/Shaper %2 Normalizer %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "data"
    },
    {
      "type": "input_value",
      "name": "normalizer"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "denorm",
  "message0": "DeNorm %1 Data/Shaper %2 Normalizer %3 Axis %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "data"
    },
    {
      "type": "input_value",
      "name": "normalizer"
    },
    {
      "type": "field_dropdown",
      "name": "axis",
      "options": [
        [
          "X",
          "x"
        ],
        [
          "Y",
          "y"
        ],
        [
          "Both",
          "both"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "image_transformer",
  "message0": "Image transformer %1 Image(s) %2 Config %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "input"
    },
    {
      "type": "input_value",
      "name": "config",
      "check": "String"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "text_tokenizer",
  "message0": "Text tokenizer %1 Vocabulary %2 Column %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "text_tokenizer_vocabulary"
    },
    {
      "type": "field_input",
      "name": "text_tokenizer_column",
      "text": "0"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "label_encoder",
  "message0": "Label Encoder %1 Classes %2 Column %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "label_encoder_classes"
    },
    {
      "type": "field_input",
      "name": "label_encoder_column",
      "text": "0"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "encode_labels",
  "message0": "Encode labels %1 Y-Axis data %2 Label Encoder %3 Column %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "encode_labels_data"
    },
    {
      "type": "input_value",
      "name": "encode_labels_encoder"
    },
    {
      "type": "field_input",
      "name": "encode_labels_column",
      "text": "0"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
,{
  "type": "decode_labels",
  "message0": "Decode labels %1 Encoded Labels %2 Label Encoder %3 Column %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "decode_labels_data"
    },
    {
      "type": "input_value",
      "name": "decode_labels_encoder"
    },
    {
      "type": "field_input",
      "name": "decode_labels_column",
      "text": "0"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "text_encoder",
  "message0": "Text Encoder %1 Input data %2 Tokenizer %3 Column %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "text_encoder_data"
    },
    {
      "type": "input_value",
      "name": "text_encoder_tokenizer"
    },
    {
      "type": "field_input",
      "name": "text_encoder_column",
      "text": "0"
    }
  ],
  "inputsInline": false,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "tupler",
  "message0": "Tupler %1 List %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "tupler_input"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);