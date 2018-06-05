df = None
tokenizer = None
label_encoder = None
encoded_labels = None
inputdata = None
modeldef = None
test_df = None
text_X = None
test_Y = None
shaper = None
model = None
result = None


from reader import Reader
from dataloader import Utils
from dataloader import DataSet
from model import ModelBuilder

if __name__ == "__main__" :

  df = Reader.read_csv("data","sentiment_train.csv",config="default",streamType="csv",columns="0,1",filter="full",count=5,header="1",transformers=None)
  tokenizer =  Utils.get_text_tokenizer(df,1)
  label_encoder = Utils.get_label_encoder(df,0)
  encoded_labels = DataSet.get_encodered_labels(df,0,label_encoder)
  inputdata = DataSet.text_to_matrix(df,1,tokenizer)
  modeldef = ModelBuilder.create_model('Keras Sequential Model',shape='2,2',config=('{"loss_function":"categorical_crossentropy","optimizer":"adam"}',['{ "layer_type":"Dense" ,"activation":"relu","optimizer":"Adam","threshold":"512","input_shape":"10000,"}', '{ "layer_type":"Dropout" ,"activation":"relu","optimizer":"Adam","threshold":".5","input_shape":""}', '{ "layer_type":"Dense" ,"activation":"softmax","optimizer":"Adam","threshold":"4","input_shape":""}']))
  test_df = Reader.read_csv("data","sentiment_test.csv",config="default",streamType="df",columns="0,1",filter="full",count=5,header="1",transformers=None)
  text_X = DataSet.text_to_matrix(test_df,1,tokenizer)
  test_Y = DataSet.get_encodered_labels(test_df,0,label_encoder)
  shaper = tuple([inputdata, encoded_labels, text_X, test_Y])
  model = ModelBuilder.train_model(modeldef,shaper,'true')
  result = ModelBuilder.predict_model(model,text_X)
  result = DataSet.get_label(result,0,label_encoder)
  print (result)