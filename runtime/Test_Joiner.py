df = None
test_df = None


from reader import Reader
from dataloader import Utils
from dataloader import DataSet
from model import ModelBuilder
from transform import joiner
from writer import Writer

if __name__ == "__main__" :

  df = Reader.read_csv("data","sentiment_train.csv",config="default",streamType="csv",columns="0,1",filter="full",count=5,header="1",transformers=None)
  test_df = Reader.read_csv("data","sentiment_test.csv",config="default",streamType="df",columns="0,1",filter="full",count=5,header="1",transformers=None)
  Writer.write_csv((joiner.join([{"csv":df,"key":1,"columns":"1"}, {"csv":test_df,"key":1,"columns":"1"}],'row')),"default")
