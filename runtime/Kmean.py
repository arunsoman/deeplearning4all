df = None
shaper = None
normalizer = None
result = None


from reader import Reader
from dataloader import DataSet
from dataloader import Utils
from model import UnsupervisedModelBuilder

if __name__ == "__main__" :

  df = Reader.read_csv("data","NSE_Abbott India Limited.csv",config="default",streamType="csv",columns="",filter="full",count=5,header="1",transformers=None)
  shaper = DataSet.shape_data_frame(df,'',x_columns='1:9',y_columns='3',x_dimention='2',y_dimention='1',y_offset=1,test_data_size=0)
  normalizer = Utils.get_preprocessing_scaler(min_max_tuple=(-1,1))
  shaper = Utils.fit_transform(shaper,normalizer)
  result = UnsupervisedModelBuilder.create_model('K-Means Clustering',shaper,'{"n_clusters":2}')
  print (result)
