from sklearn import preprocessing
from numpy import  newaxis
import numpy as np
from keras.preprocessing.text import Tokenizer
from sklearn.preprocessing import LabelEncoder
import pandas

def get_preprocessing_scaler(min_max_tuple=(-1,1)):
    return preprocessing.MinMaxScaler(feature_range=min_max_tuple),preprocessing.MinMaxScaler(feature_range=min_max_tuple)


def fit_transform(data,normalizer):
    normalizer = _fit_(data, normalizer)
    if type(data) is not tuple:
        return __transform__(data,normalizer[0])
    else:
        arr = []
        for i in range(len(data)):
            arr.append(__transform__(data[i], normalizer[0]) if i % 2 == 0 else __transform__(data[i], normalizer[1]))
        return tuple(arr)


def _fit_(data,normalizer):
    concatdata_x = data
    if type(data) is tuple:
        concatdata_x = np.concatenate((data[2], data[0]), axis=0)
        concatdata_y = np.concatenate((data[1], data[3]), axis=0)
        if concatdata_y.ndim > 2:
            concatdata_y = concatdata_y.reshape(data.shape[0], data.shape[2])
        normalizer[1].fit(concatdata_y)
    if concatdata_x.ndim > 2:
        concatdata_x = concatdata_x.reshape(concatdata_x.shape[0], concatdata_x.shape[2])
    normalizer[0].fit(concatdata_x)

    return normalizer


def __transform__(data,normalizer):
    if data is not None and data.any() :
        if data.ndim > 2:
            data = data.reshape(data.shape[0], data.shape[2])
            data = normalizer.transform(data)
            data = data[:, newaxis, :]
            return data
        return normalizer.transform(data)
    return data


def inverse_transform(data,normalizer,axis='y'):
    normalizer = normalizer[1] if axis == 'y' else normalizer[0]
    if type(data) is not tuple:
        return __inverse__(data, normalizer)
    else:
        arr = []
        for i in range(len(data)):
            if axis == 'both':
                arr.append(__inverse__(data[i],normalizer[0]) if i%2==0 else  __inverse__(data[i],normalizer[1]))
            else:
                arr.append(__inverse__(data[i],normalizer))
        return tuple(arr)

def __inverse__(data,normalizer):
    if data.ndim > 2:
        data = data.reshape(data.shape[0], data.shape[2])
        data = normalizer.inverse_transform(data)
        data = data[:, newaxis, :]
        return data
    return normalizer.inverse_transform(data)


def get_text_tokenizer(vocabulary,column,max_words=10000):
    tokenizer = Tokenizer(num_words=max_words, char_level=False)
    if type(vocabulary) is pandas.DataFrame :
        tokenizer.fit_on_texts(vocabulary.iloc[:, column])  # only fit on train
    elif type(vocabulary) is list :
        tokenizer.fit_on_texts(vocabulary[:, column]) if np.asanyarray(vocabulary).ndim >1 else tokenizer.fit_on_texts(vocabulary)
    elif type(vocabulary) is tuple:
        tokenizer.fit_on_texts(vocabulary[column])

    return tokenizer


def get_label_encoder(y_labels,column):
    encoder = LabelEncoder()
    if type(y_labels) is pandas.DataFrame :
        encoder.fit(y_labels.iloc[:, column])  # only fit on train
    elif type(y_labels) is list :
        encoder.fit(y_labels[:, column]) if np.asanyarray(y_labels).ndim >1 else encoder.fit(y_labels)
    elif type(y_labels) is tuple:
        encoder.fit(y_labels[column])
    else :
        encoder.fit(y_labels)

    return encoder


