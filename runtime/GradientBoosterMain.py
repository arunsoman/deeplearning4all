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

  df = Reader.read_csv("data","NSE_Abbott India Limited.csv",config="default",streamType="csv",columns="")
  shaper = DataSet.shape_data_frame(df,'',x_columns='1:9',y_columns='3',x_dimention='2',y_dimention='2',y_offset=1,test_data_size=20)
  normalizer = Utils.get_preprocessing_scaler(min_max_tuple=(-1,1))
  shaper = Utils.fit_transform(shaper,normalizer)

  print (shaper[0].shape)
  print (shaper[2].shape)

  print (shaper[1].shape)
  print (shaper[3].shape)

  model_def = ModelBuilder.create_model('Gradient Boosting Regressor',shape='2,2',config='{"random_state":0}')
  model = ModelBuilder.train_model(model_def,shaper,'true')
  result = ModelBuilder.predict_model(model,shaper)
  result = Utils.inverse_transform(result,normalizer)
  print (result)
