df = None
shaper = None
normalizer = None
model_def = None
model = None
result = None


from reader import Reader
from dataloader import DataSet
from dataloader import Utils
from model import ModelBuilder

if __name__ == "__main__" :

  df = Reader.read_csv("data","NSE_Abbott India Limited.csv",config="default",streamType="csv",columns="",filter="full",count=5,header="1",transformers=None)
  shaper = DataSet.shape_data_frame(df,'',x_columns='1:9',y_columns='3',x_dimention='3',y_dimention='1',y_offset=1,test_data_size=20)
  normalizer = Utils.get_preprocessing_scaler(min_max_tuple=(-1,1))
  shaper = Utils.fit_transform(shaper,normalizer)
  model_def = ModelBuilder.create_model('Keras Sequential Model',shape='2,2',config=('{"loss_function":"mean_absolute_error","optimizer":"adam"}',['{ "layer_type":"LSTM" ,"activation":"tanh","optimizer":"Adam","threshold":"100","input_shape":"1,8"}', '{ "layer_type":"Dropout" ,"activation":"sigmoid","optimizer":"sgd","threshold":"0.2","input_shape":""}', '{ "layer_type":"Dense" ,"activation":"linear","optimizer":"Adam","threshold":"1","input_shape":""}']))
  model = ModelBuilder.train_model(model_def,shaper,'true')
  result = ModelBuilder.predict_model(model,shaper)
  result = Utils.inverse_transform(result,normalizer,axis='y')
  print (result)