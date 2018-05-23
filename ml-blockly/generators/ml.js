/**
 * @license
 * Visual Blocks Language
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

goog.provide('Blockly.Python.ml');
goog.require('Blockly.Python');

var imports = [];
var funcs = [];
var main = [];
var g = {};

Blockly.Python['tee'] = function(block) {
  var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
  var statements_output = Blockly.Python.statementToCode(block, 'output');
  // TODO: Assemble Python into code variable.
  var code = value_input+'-'+statements_output+'-'+'tee...\n';
  return code;
};

Blockly.Python['stripper'] = function(block) {
  var text_columns = block.getFieldValue('columns');
  var value_csv = Blockly.Python.valueToCode(block, 'csv', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_csv+'-'+'stripper...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

var data_reader_code = function() {
  imports.push("import pandas");
  funcs.push('def read_csv(url,uri,config,streamType,columns):\n\treturn pandas.read_csv(uri+url)');
  g['data_reader_code']=true;
}

Blockly.Python['data_reader'] = function(block) {

  if( !g['data_reader_code'])
    data_reader_code();

  var code = 'read_csv('+block.getFieldValue('url')+','
                        +block.getFieldValue('uri')+','
                        +block.getFieldValue('config')+','
                        +block.getFieldValue('streamType')+','
                        +block.getFieldValue('columns')
                        +')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['model_reader'] = function(block) {
  var text_url = block.getFieldValue('url');
  // TODO: Assemble Python into code variable.
  var code = 'model_reader]\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['joiner'] = function(block) {
  var value_readers = Blockly.Python.valueToCode(block, 'readers', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_readers+'-'+'joiner...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['createdf'] = function(block) {
  var statements_reader = Blockly.Python.statementToCode(block, 'reader');
  // TODO: Assemble Python into code variable.
  var code = statements_reader+'-' + 'createdf...\n';
  return code;
};

Blockly.Python['program'] = function(block) {
  var statements_operation = Blockly.Python.statementToCode(block, 'operation');
  // console.log('('+statements_operation+')')
  // TODO: Assemble Python into code variable.
  var importstr = imports.join('\n');
  var funcsstr = funcs.join('\n');
  var mainstr = main.join('\n');

  var code = importstr +'\n'+ funcsstr +'\n\n'+'if __name__ == "__main__"' + statements_operation + '\n';
  return code;
};

Blockly.Python['joiner_input'] = function(block) {
  var value_csv = Blockly.Python.valueToCode(block, 'csv', Blockly.Python.ORDER_ATOMIC);
  var text_key = block.getFieldValue('key');
  var text_columns = block.getFieldValue('columns');
  // TODO: Assemble Python into code variable.
  var code = value_csv+'-joiner_input...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['nn_config'] = function(block) {
  var dropdown_optimizer = block.getFieldValue('optimizer');
  var dropdown_loss_function = block.getFieldValue('loss function');
  var value_layers = Blockly.Python.valueToCode(block, 'layers', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_layers+'-nn_config...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['nn_layer_config'] = function(block) {
  var dropdown_layer_type = block.getFieldValue('Layer type');
  var dropdown_activation_function = block.getFieldValue('activation function');
  var dropdown_optimizer = block.getFieldValue('optimizer');
  var text_threshold = block.getFieldValue('threshold');
  // TODO: Assemble Python into code variable.
  var code = 'nn_layer_config...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['ml'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_shape = block.getFieldValue('shape');
  var value_config = Blockly.Python.valueToCode(block, 'Config', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_config+'-ml...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['var'] = function(block) {
  var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_name+'-var...\n';
  return code;
};

Blockly.Python['train'] = function(block) {
  var value_model = Blockly.Python.valueToCode(block, 'Model', Blockly.Python.ORDER_ATOMIC);
  var value_shaper = Blockly.Python.valueToCode(block, 'shaper', Blockly.Python.ORDER_ATOMIC);
  var checkbox_show_result = block.getFieldValue('show result') == 'TRUE';
  // TODO: Assemble Python into code variable.
  var code = value_model+'-'+value_shaper+'-train...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['shaper'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  var text_input_columns = block.getFieldValue('input columns');
  var dropdown_dimension = block.getFieldValue('dimension');
  var text_output_columns = block.getFieldValue('output columns');
  var text_test_data = block.getFieldValue('test data');
  // TODO: Assemble Python into code variable.
  var code = value_name+'-shaper...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
  // return code;
};

Blockly.Python['predict'] = function(block) {
  var variable_predict_model = Blockly.Python.variableDB_.getName(block.getFieldValue('predict_model'), Blockly.Variables.NAME_TYPE);
  var value_shape = Blockly.Python.valueToCode(block, 'Shape', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = value_shape+'-predict...\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

var writer_code = function() {
  imports.push("import pandas");
  funcs.push('def write_csv(df,url):\n\tdf.to_csv(url)');
  g['writer_code'] = true;
}

Blockly.Python['writer'] = function(block) {
  var dic = {}
  dic['value_writer_input'] = Blockly.Python.valueToCode(block, 'writer_input', Blockly.Python.ORDER_ATOMIC);
  dic['text_writer_uri_var'] = block.getFieldValue('writer_uri_var');
  // TODO: Assemble Python into code variable.
  if( !g['writer_code'] )
    writer_code()
  var code = '\nwrite_csv('+dic['value_writer_input']+','+dic['text_writer_uri_var']+')';
  console.log('['+code+']')
  return code;
};