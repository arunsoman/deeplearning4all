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

goog.provide('Blockly.Python.ml');
goog.require('Blockly.Python');

var imports = [];
var funcs = [];
var main = [];
var g = {};

var add_import = function(importst,key) {
  imports.push(importst);
  g[key] = true;
}

Blockly.Python['tee'] = function(block) {
  var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
  var statements_output = Blockly.Python.statementToCode(block, 'output');
  var code = '...\n';
  return code;
};

Blockly.Python['stripper'] = function(block) {
  var text_columns = block.getFieldValue('columns');
  var value_csv = Blockly.Python.valueToCode(block, 'csv', Blockly.Python.ORDER_ATOMIC);
    
  if( !g['stripper'])
    add_import('from transform import stripper','stripper')
  var code = 'stripper.strip(columns=\'' + text_columns +'\',df='+value_csv+')'
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['csv_reader'] = function(block) {
  var text_url = block.getFieldValue('url');
  var text_uri = block.getFieldValue('uri');
  var text_config = block.getFieldValue('config');
  var text_csv_reader_header = block.getFieldValue('csv_reader_header');
  var dropdown_streamtype = block.getFieldValue('streamType');
  var text_columns = block.getFieldValue('columns');
  var value_transformers = Blockly.Python.valueToCode(block, 'Transformers', Blockly.Python.ORDER_ATOMIC);
  var dropdown_selection = block.getFieldValue('selection');
  var text_number_of_rows = block.getFieldValue('number of rows');
  
  if( !g['csv_reader'])
    add_import('from reader import Reader','csv_reader')

  var code = 'Reader.read_csv("'+block.getFieldValue('url')+'","'
                        +block.getFieldValue('uri')+
                        '",config="'+block.getFieldValue('config')+
                        '",streamType="'+block.getFieldValue('streamType')+
                        '",columns="'+block.getFieldValue('columns')+
                        '",filter="'+dropdown_selection+
                        '",count='+text_number_of_rows+
                        '",header='+text_csv_reader_header+
                        '",transformers='+value_transformers+
                        ')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['model_reader'] = function(block) {
  var text_url = block.getFieldValue('url');

  if( !g['csv_reader'])
        add_import('from reader import Reader','csv_reader')
  var code = 'Reader.read_model.read_model(\''+text_url+'\')';
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['joiner'] = function(block) {
  var value_joiner_inputs_list = Blockly.Python.valueToCode(block, 'joiner_inputs_list', Blockly.Python.ORDER_ATOMIC);
  var dropdown_joiner_style = block.getFieldValue('joiner_style');  
  if( !g['joiner'])
        add_import('from transform import joiner','joiner')
  var code = 'joiner.join('+value_joiner_inputs_list+',\''+dropdown_joiner_style+'\')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['joiner_input'] = function(block) {
  var value_joiner_input_csv = Blockly.Python.valueToCode(block, 'joiner_input_csv', Blockly.Python.ORDER_ATOMIC);
  var text_joiner_input_key = block.getFieldValue('joiner_input_key');
  var text_joiner_input_columns = block.getFieldValue('joiner_input_columns');
  // TODO: Assemble Python into code variable.
  var code = '{"csv":' + value_joiner_input_csv+',"key":'+text_joiner_input_key+',"columns":"'+text_joiner_input_columns+'"}';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['createdf'] = function(block) {
  var statements_reader = Blockly.Python.statementToCode(block, 'reader');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['program'] = function(block) {
  var statements_operation = Blockly.Python.statementToCode(block, 'operation'); 
  var importstr = imports.join('\n');
  var code = importstr +'\n\n'+ 'if __name__ == "__main__" :\n\n' + statements_operation + '\n';
  return code;
};

Blockly.Python['nn_config'] = function(block) {
  var dropdown_optimizer = block.getFieldValue('optimizer');
  var dropdown_loss_function = block.getFieldValue('loss function');
  var value_layers = Blockly.Python.valueToCode(block, 'layers', Blockly.Python.ORDER_ATOMIC);
  var code = '\'{"loss_function":"'+dropdown_loss_function+'","optimizer":"'+dropdown_optimizer+'"}\','+value_layers;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['nn_layer_config'] = function(block) {
  var dropdown_layer_type = block.getFieldValue('Layer type');
  var dropdown_activation_function = block.getFieldValue('activation function');
  var dropdown_optimizer = block.getFieldValue('optimizer');
  var text_threshold = block.getFieldValue('threshold');
  var value_shape = Blockly.Python.valueToCode(block, 'shape', Blockly.Python.ORDER_ATOMIC);
  value_shape = value_shape && typeof value_shape === 'string'  && value_shape.startsWith("'")  && value_shape.endsWith("'")? value_shape.substring(1,value_shape.length-1) : value_shape
 
  var code = '\'{ "layer_type":"'+dropdown_layer_type+'" ,"activation":"'+dropdown_activation_function+
              '","optimizer":"'+dropdown_optimizer+'","threshold":"'+text_threshold+'","input_shape":"'+value_shape+'"}\'';
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['supervised_models'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_shape = block.getFieldValue('shape');
  var value_config = Blockly.Python.valueToCode(block, 'Config', Blockly.Python.ORDER_ATOMIC);
  if( !g['ml'])
    add_import('from model import ModelBuilder','ml') 
  var code = 'ModelBuilder.create_model(\''+dropdown_type+'\',shape=\''+text_shape+'\',config='+value_config+')';  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['unsupervised_models'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_shape = block.getFieldValue('shape');
  var value_config = Blockly.Python.valueToCode(block, 'Config', Blockly.Python.ORDER_ATOMIC);
  var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
  if( !g['un_ml'])
    add_import('from model import UnsupervisedModelBuilder','un_ml') 
  var code = 'UnsupervisedModelBuilder.create_model(\''+dropdown_type+'\','+value_input+','+value_config+')';
  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['train'] = function(block) {
  var value_model = Blockly.Python.valueToCode(block, 'Model', Blockly.Python.ORDER_ATOMIC);
  var value_shaper = Blockly.Python.valueToCode(block, 'shaper', Blockly.Python.ORDER_ATOMIC);
  var checkbox_show_result = block.getFieldValue('show result') == 'TRUE';
  if( !g['ml'])
    add_import('from model import ModelBuilder','ml')	
  var code = 'ModelBuilder.train_model('+value_model+','+value_shaper+',\''+checkbox_show_result+'\')'; 
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['shaper'] = function(block) {
  var value_shaper_xinput_csv = Blockly.Python.valueToCode(block, 'shaper_xinput_csv', Blockly.Python.ORDER_ATOMIC);
  var text_input_columns = block.getFieldValue('input columns');
  var dropdown_xdimension = block.getFieldValue('xdimension');
  var value_shaper_yinput_csv = Blockly.Python.valueToCode(block, 'shaper_yinput_csv', Blockly.Python.ORDER_ATOMIC);
  var text_output_columns = block.getFieldValue('output columns');
  var dropdown_ydimension = block.getFieldValue('ydimension');
  var text_yoffset = block.getFieldValue('yoffset');
  var text_test_data = block.getFieldValue('test data');
 
  if( !g['DataSet'] )
    add_import('from dataloader import DataSet','DataSet');
  
  var code = 'DataSet.shape_data_frame('+value_shaper_xinput_csv+',\''+value_shaper_yinput_csv+'\',x_columns=\''
              +text_input_columns+'\',y_columns=\''+text_output_columns+'\',x_dimention=\''+dropdown_xdimension+'\',y_dimention=\''
              +dropdown_ydimension+'\',y_offset='+text_yoffset+',test_data_size='+text_test_data+')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['predict'] = function(block) {
  var variable_predict_model = Blockly.Python.variableDB_.getName(block.getFieldValue('predict_model'), Blockly.Variables.NAME_TYPE);
  var value_shape = Blockly.Python.valueToCode(block, 'Shape', Blockly.Python.ORDER_ATOMIC);
  if( !g['ml'])
      add_import('from model import ModelBuilder','ml') 
  var code = 'ModelBuilder.predict_model('+variable_predict_model+','+value_shape+')';  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['csv_writer'] = function(block) {
  var dic = {}
  dic['value_writer_input'] = Blockly.Python.valueToCode(block, 'writer_input', Blockly.Python.ORDER_ATOMIC);
  dic['text_writer_uri_var'] = block.getFieldValue('writer_uri_var');
  if( !g['writer'] )
    add_import('from writer import Writer','writer')
  var code = 'Writer.write_csv('+dic['value_writer_input']+',"'+dic['text_writer_uri_var']+'")\n';
  return code;
};

Blockly.Python['image_writer'] = function(block) {
  var value_writer_input = Blockly.Python.valueToCode(block, 'writer_input', Blockly.Python.ORDER_ATOMIC);
  var value_result = Blockly.Python.valueToCode(block, 'result', Blockly.Python.ORDER_ATOMIC);
  var text_writer_uri_var = block.getFieldValue('writer_uri_var');
  var text_imagewriter_regex = block.getFieldValue('imagewriter_regex');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['model_writer'] = function(block) {
  var value_writer_input = Blockly.Python.valueToCode(block, 'writer_input', Blockly.Python.ORDER_ATOMIC);
  var text_writer_uri_var = block.getFieldValue('writer_uri_var');
  var text_imagewriter_regex = block.getFieldValue('imagewriter_regex');
  // TODO: Assemble Python into code variable.
  if( !g['writer'] )
    add_import('from writer import Writer','writer')
  var code = 'Writer.write_model('+value_writer_input+',\''+text_writer_uri_var+'\',regx=\''+text_imagewriter_regex+'\')';
  return code;
};

Blockly.Python['text_writer'] = function(block) {
  var value_textwriter_input = Blockly.Python.valueToCode(block, 'textwriter_input', Blockly.Python.ORDER_ATOMIC);
  var text_writer_uri_var = block.getFieldValue('writer_uri_var');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['transformer'] = function(block) {
  var text_column = block.getFieldValue('column');
  var text_function = block.getFieldValue('function');
  if( !g['transformer'] )
    add_import('from transform import transformer','transformer')
  var code = '{"column":'+text_column+',"function":"'+text_function+'"}';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['image_reader'] = function(block) {
  var text_url = block.getFieldValue('url');
  var text_uri = block.getFieldValue('uri');
  var value_transformers = Blockly.Python.valueToCode(block, 'Transformers', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['text_reader'] = function(block) {
  var text_url = block.getFieldValue('url');
  var text_uri = block.getFieldValue('uri');
  var value_transformers = Blockly.Python.valueToCode(block, 'Transformers', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['outlier_deletion'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['normalizer'] = function(block) {
  var text_range = block.getFieldValue('range');
  if( !g['utils'] )
    add_import('from dataloader import Utils','utils')
  var code = 'Utils.get_preprocessing_scaler(min_max_tuple=('+text_range+'))';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['norm'] = function(block) {
  var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
  var value_normalizer = Blockly.Python.valueToCode(block, 'normalizer', Blockly.Python.ORDER_ATOMIC);
  if( !g['utils'] )
    add_import('from dataloader import Utils','utils')
  var code = 'Utils.fit_transform('+value_data+','+value_normalizer+')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['denorm'] = function(block) {
  var value_data = Blockly.Python.valueToCode(block, 'data', Blockly.Python.ORDER_ATOMIC);
  var value_normalizer = Blockly.Python.valueToCode(block, 'normalizer', Blockly.Python.ORDER_ATOMIC);
  var dropdown_axis = block.getFieldValue('axis');
  if( !g['utils'] )
    add_import('from dataloader import Utils','utils')
  var code = 'Utils.inverse_transform('+value_data+','+value_normalizer+',axis=\''+dropdown_axis+'\')';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['image_transformer'] = function(block) {
  var value_input = Blockly.Python.valueToCode(block, 'input', Blockly.Python.ORDER_ATOMIC);
  var value_config = Blockly.Python.valueToCode(block, 'config', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['text_tokenizer'] = function(block) {
  var value_text_tokenizer_vocabulary = Blockly.Python.valueToCode(block, 'text_tokenizer_vocabulary', Blockly.Python.ORDER_ATOMIC);
  var text_text_tokenizer_column = block.getFieldValue('text_tokenizer_column');
  if( !g['utils'] )
    add_import('from dataloader import Utils','utils')
  var code = ' Utils.get_text_tokenizer('+value_text_tokenizer_vocabulary+','+text_text_tokenizer_column+')';  
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['label_encoder'] = function(block) {
  var value_label_encoder_classes = Blockly.Python.valueToCode(block, 'label_encoder_classes', Blockly.Python.ORDER_ATOMIC);
  var text_label_encoder_column = block.getFieldValue('label_encoder_column');
  if( !g['utils'] )
    add_import('from dataloader import Utils','utils')
  var code = 'Utils.get_label_encoder('+value_label_encoder_classes+','+text_label_encoder_column+')'; 
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['encode_labels'] = function(block) {
  var value_encode_labels_data = Blockly.Python.valueToCode(block, 'encode_labels_data', Blockly.Python.ORDER_ATOMIC);
  var value_encode_labels_encoder = Blockly.Python.valueToCode(block, 'encode_labels_encoder', Blockly.Python.ORDER_ATOMIC);
  var text_encode_labels_column = block.getFieldValue('encode_labels_column');
  if( !g['DataSet'] )
    add_import('from dataloader import DataSet','DataSet');
  var code = 'DataSet.get_encodered_labels('+value_encode_labels_data+','+text_encode_labels_column+','+value_encode_labels_encoder+')'; 
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['decode_labels'] = function(block) {
  var value_decode_labels_data = Blockly.Python.valueToCode(block, 'decode_labels_data', Blockly.Python.ORDER_ATOMIC);
  var value_decode_labels_encoder = Blockly.Python.valueToCode(block, 'decode_labels_encoder', Blockly.Python.ORDER_ATOMIC);
  var text_decode_labels_column = block.getFieldValue('decode_labels_column');
   if( !g['DataSet'])
    add_import('from dataloader import DataSet','DataSet');  
  var code = 'DataSet.get_label('+value_decode_labels_data+','+text_decode_labels_column+','+value_decode_labels_encoder+')';   
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['text_encoder'] = function(block) {
  var value_text_encoder_data = Blockly.Python.valueToCode(block, 'text_encoder_data', Blockly.Python.ORDER_ATOMIC);
  var value_text_encoder_tokenizer = Blockly.Python.valueToCode(block, 'text_encoder_tokenizer', Blockly.Python.ORDER_ATOMIC);
  var text_text_encoder_column = block.getFieldValue('text_encoder_column');
  if( !g['DataSet'] )
    add_import('from dataloader import DataSet','DataSet');
  var code = 'DataSet.text_to_matrix('+value_text_encoder_data+','+text_text_encoder_column+','+value_text_encoder_tokenizer+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['tupler'] = function(block) {
  var value_tupler_input = Blockly.Python.valueToCode(block, 'tupler_input', Blockly.Python.ORDER_ATOMIC);
  
   var code = 'tuple('+value_tupler_input+')';
 
  return [code, Blockly.Python.ORDER_NONE];
};
