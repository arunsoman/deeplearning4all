df = None
tokenizer = None
label_encoder = None
encoded_labels = None
inputdata = None
test_df = None
text_X = None
test_Y = None
shaper = None
model = None


from reader import Reader
from dataloader import Utils
from dataloader import DataSet
from model import ModelBuilder
from writer import Writer

if __name__ == "__main__" :

  df = Reader.read_csv("data","sentiment_train.csv",config="default",streamType="csv",columns="0,1",filter="full",count=5)
  tokenizer =  Utils.get_text_tokenizer(df,1)
  label_encoder = Utils.get_label_encoder(df,0)
  encoded_labels = DataSet.get_encodered_labels(df,0,label_encoder)
  inputdata = DataSet.text_to_matrix(df,1,tokenizer)
  test_df = Reader.read_csv("data","sentiment_test.csv",config="default",streamType="df",columns="0,1",filter="full",count=5)
  text_X = DataSet.text_to_matrix(test_df,1,tokenizer)
  test_Y = DataSet.get_encodered_labels(test_df,0,label_encoder)
  shaper = tuple([inputdata, encoded_labels, text_X, test_Y])
  model = ModelBuilder.train_model((ModelBuilder.create_model('KNN Classifier',shape='2,2',config='{"n_neighbors":1,"algorithm":"ball_tree","weights":"distance"}')),shaper,'true')
  Writer.write_csv((DataSet.get_label((ModelBuilder.predict_model(model,text_X)),0,label_encoder)),"default")
