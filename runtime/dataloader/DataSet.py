
import numpy as np
from numpy import zeros, newaxis
from keras.preprocessing.text import Tokenizer
import pandas
from keras import utils

def shape_data_frame(xdf,ydf,x_columns=None,y_columns=None,x_dimention=2,y_dimention=1,y_offset =0,test_data_size=20):
    #xdf.fillna(xdf.mean())
    #pandas.to_numeric(s, errors='ignore')
    ydf = ydf if ydf else xdf
    numpy_matrix = ydf.as_matrix()
    ycol = get_array_from_string(y_columns)
    yarray = numpy_matrix[:,ycol] if ycol else numpy_matrix

    x_array = xdf.as_matrix()
    if x_columns :
        x_col_array = get_array_from_string(x_columns,separator=":") if ":" in x_columns else get_array_from_string(x_columns)
        x_array = x_array[:, x_col_array[0]:x_col_array[1]] if ":" in x_columns else x_array[:,x_col_array]

    if y_offset:
        y_offcet = int (y_offset)
        x_array = np.delete(x_array.copy(), np.s_[x_array.shape[0] - y_offcet:x_array.shape[0]],axis=0)
        yarray = np.delete(yarray.copy(), np.s_[0:y_offcet], axis=0)
        yarray = yarray.ravel() if int(y_dimention) == 1 else yarray

    x_test = np.delete(x_array.copy(), np.s_[0: int(x_array.shape[0] * (1-float(test_data_size)/100))], axis=0)
    y_test = np.delete(yarray.copy(), np.s_[0: int(yarray.shape[0] * (1- float(test_data_size)/100))], axis=0)

    if int(x_dimention) ==3 :
        x_test = x_test[:, newaxis,:]
        x_array = x_array[:,newaxis,:]
    return x_array.astype(float),yarray.astype(float),x_test.astype(float),y_test.astype(float)


def get_array_from_string(input_string,separator=','):
    array =[]
    if input_string :
        array = [int(x) for x in input_string.split(separator)]
    return array


"""
convert the text to numpy array using the Keras Tokenizer
"""

def text_to_matrix(text_values,column,tokenizer):
    if type(text_values) is pandas.DataFrame :
        return tokenizer.texts_to_matrix(text_values.iloc[:, column])  # only fit on train
    elif type(text_values) is list :
        return tokenizer.texts_to_matrix(text_values[:, column]) if np.asanyarray(text_values).ndim > 1 else tokenizer.texts_to_matrix(text_values)
    elif type(text_values) is tuple:
        return tokenizer.texts_to_matrix(text_values[column])
    else :
        return tokenizer.texts_to_matrix(text_values)


"""
convert the text to numpy array using the Keras Tokenizer
"""
def get_encodered_labels(y_labels,column,encoder,to_categorical=True):
    y_train  = None
    if type(y_labels) is pandas.DataFrame :
        y_train =encoder.transform(y_labels.iloc[:, column])  # only fit on train
    elif type(y_labels) is list :
        y_train = encoder.transform(y_labels[:, column]) if np.asanyarray(y_labels).ndim >1 else encoder.transform(y_labels)
    elif type(y_labels) is tuple:
        y_train = encoder.transform(y_labels[column])
    else :
        y_train = encoder.transform(y_labels)

    if len(encoder.classes_) > 2  and to_categorical : # assumes that binary classification
        return utils.to_categorical(y_train, len(encoder.classes_))
    return y_train


def get_label(prediction,column,encoder):
    text_labels = encoder.classes_
    arr =[]
    if prediction.ndim > 1 :
        for i in range (prediction.shape[0]):
            arr.append(text_labels[np.argmax(prediction[i])])
        return arr
    else :
        text_labels[np.argmax(prediction)]