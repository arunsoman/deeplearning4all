import os
import re
import pandas
import pickle
import datetime as dt
from skimage import io
import numpy as np
from transform import transform

__folderName = None
__fileName = None


def csv_files_from_dir(folder):
    return [os.path.join(folder, f) for f in os.listdir(folder) if re.match(r'.*\.(csv)', f, flags=re.I)]


def get_input_files(input_path):
   return [file for file in csv_files_from_dir(input_path)]


def __read_csv__(file_path,columns=None,config = None,filter=None,count=1,transformers=None):
    df = pandas.read_csv(file_path)
    df = df.head(count) if filter == 'head' else df.tail(count) if filter == 'tail' else df
    if columns:
        col_array = get_array_from_string(columns, separator=":") if ":" in columns else get_array_from_string(columns)
        if col_array:
            df = df.iloc[:, col_array[0]:col_array[1]] if ":" in columns else df.iloc[:, col_array]

    df = add_columns_to_df(df, config,os.path.basename(file_path),os.path.basename(os.path.dirname(file_path))) if config is not None else df
    return transform.transform_df(df, transformers) if transformers is not None else df


def read_csv(dirPath,uri=None,columns = None,config = None, streamType =None,filter=None,count=1,transformers=None,header=None) :
    if uri:
        return __read_csv__(os.path.join(dirPath, uri),columns=columns,filter=filter,count=count,transformers=transformers)
    else:
        return [__read_csv__(file_path, columns=columns, config = config ,filter=filter,
                             count=count, transformers=transformers) for file_path in get_input_files(dirPath)]


def add_columns_to_df(df, config,  file_name, folder_name):
    columns = config.split(",")  # date, timestamp, folderName, fileName, constant string, constant int
    i = 0
    for column in columns:
        i = i+1
        column_value = f(column, file_name, folder_name)
        if not column_value:
            column_value = get_value(column)
        df['__ec' + str(i)] = column_value
    return df


def f(x, file_name, folder_name):
    return {
        'date': dt.datetime.now().date(),
        'timestamp': dt.datetime.now(),
        'folderName': folder_name,
        'fileName': file_name
    }.get(x, None)


def get_value(s):
    try:
        return float(s)
    except ValueError:
        return s

'''
Load trained model from disk 
'''

def read_model(file_path):
    model = None
    if file_path is not None:
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
    return model


def get_array_from_string(input_string,separator=','):
    array =[]
    if input_string :
        array = [int(x) for x in input_string.split(separator)]
    return array


def _image_files_in_folder_(folder):
        return [os.path.join(folder, f) for f in os.listdir(folder) if re.match(r'.*\.(jpg|jpeg|png)', f, flags=re.I)]


def read_image(url,uri=None):
    if uri is None :
        arr=[]
        for file_path in _image_files_in_folder_(url):
            arr.append(io.imread(file_path))
        return np.asarray(arr)
    else:
        return io.imread(os.path.join(url,uri))


