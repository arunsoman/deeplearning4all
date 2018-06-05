import pandas
import pickle
import csv

def write_csv(data_frame,out_file_name):
    if type(data_frame) is pandas.core.frame.DataFrame :
        data_frame.to_csv(out_file_name)
    elif type(data_frame) is list :
        with open(out_file_name, 'wb') as myfile:
            wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
            wr.writerow(data_frame)

'''
write trained model to disk
'''
def write_model(model,out_file_path,regx = None):
   if out_file_path  is not None:
    with open(out_file_path, 'wb') as f:
        pickle.dump(model, f)