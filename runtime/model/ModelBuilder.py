import json
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn import svm
from sklearn import neighbors
from keras.models import Sequential
from keras.layers import Dense, Activation,Conv2D,Flatten,Dropout,MaxPooling2D,MaxPooling1D,Conv1D,LSTM,RNN
from keras.models import Sequential


def create_model(model_type,shape =None,config=None):
    if model_type == 'Multi-Output Gradient Boosting Regressor':
        random_state = 0
        if config :
            data = json.loads(config)
            random_state = data.get('random_state') if data.get('random_state') else 0
        model = MultiOutputRegressor(GradientBoostingRegressor(random_state=random_state))
        return model
    if model_type == 'Gradient Boosting Regressor':
        random_state = 0
        if config:
            data = json.loads(config)
            random_state = data.get('random_state') if data.get('random_state') else 0
        model = GradientBoostingRegressor(random_state=random_state)
        return model

    if model_type == "SVM Classification":
        '''
        Pros:
         It works really well with clear margin of separation
         It is effective in high dimensional spaces
         It is effective in cases where number of dimensions is greater than the number of samples.
         It uses a subset of training points in the decision function (called support vectors), so it is also memory efficient
        Cons :
         It doesnt perform well, when we have large data set because the required training time is higher.
         It also doesnt perform very well, when the data set has more noise i.e. target classes are overlapping.
         SVM doesn't directly provide probability estimates, these are calculated using an expensive five-fold cross validation. 
         It is related SVC method of Python scikit learn library
        '''
        return __create_svm_classifier__(config)

    if model_type == "SVM Regression" :
        return __create_svm_regressor__(config)

    if model_type == "KNN Classifier" :
        return __create_KNN_classifier(config)

    if model_type == 'Keras Sequential Model' :
        return __create_sequential_model(config)


def __create_svm_classifier__(config):

    #(C=1.0, kernel='rbf', degree=3, gamma=0.0, coef0=0.0, shrinking=True, probability=False,tol=0.001, cache_size=200,
    # class_weight=None, verbose=False, max_iter=-1, random_state=None)
    # sample keranal  values "linear", "rbf","poly","sigmoid"
    #svm.SVC(decision_function_shape='ovo') FOR MULTILABEL CLASSIFICATION ,degree=3, gamma='auto'
    data = json.loads(config)
    c = data.get('c') if data.get('c') else 1
    gamma = data.get('gamma') if data.get('gamma') else 1
    kernel = data.get('kernel') if data.get('kernel') else 'linear'
    model = svm.SVC(kernel=kernel, C=float(c), gamma=float(gamma))
    return model


def __create_svm_regressor__(config):
    data = json.loads(config)
    c = data.get('c') if data.get('c') else 1
    gamma = data.get('gamma') if data.get('gamma') else 1
    kernel = data.get('kernel') if data.get('kernel') else 'linear'
    model = svm.SVR(kernel=kernel, verbose=True)
    return model


def __create_KNN_classifier(config):
    data = json.loads(config)
    n_neighbors = data.get('n_neighbors') if data.get('n_neighbors') else 1
    knn_algo = data.get('knn_algo') if data.get('knn_algo') else 'ball_tree'
    weights =   data.get('weights') if data.get('weights') else 'distance'
    model = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights=weights)
    return model


def __create_sequential_model(configs):
    model =  Sequential()
    for config  in  configs[1] :
        data = json.loads(config)
        layer_type =  data.get('layer_type') if data.get('layer_type') else None
        activation_function =data.get('activation') if data.get('activation') else None
        optimizer =data.get('optimizer') if data.get('optimizer') else "adam"
        threshold = data.get('threshold') if data.get('threshold') else 1
        input_shape = data.get('input_shape') if data.get('input_shape') else None
        kernel_size = (3,3)
        if layer_type=='Dense':
            if input_shape :
                array = get_array_from_string(input_shape)
                model.add(Dense(int(threshold),activation=activation_function,input_shape=tuple(array)))
            else :
                model.add(Dense(int(threshold), activation=activation_function))

        if layer_type == 'flatten' :
            model.add(Flatten())
        if layer_type == 'Dropout':
            model.add(Dropout(float(threshold)))
        if layer_type == 'RNN':
            array = get_array_from_string(input_shape)
            model.add(RNN(int(threshold), activation=activation_function, input_shape=(array)))

        if layer_type == 'LSTM':
            array = get_array_from_string(input_shape)
            model.add(LSTM(int(threshold), activation=activation_function, recurrent_activation = 'hard_sigmoid', input_shape=(array)))

        if layer_type == 'CNN':
            pass

        if layer_type == 'CNN-2D':
            kernalsize =(2,2)
            array = get_array_from_string(input_shape)
            model.add(Conv2D(int(threshold),kernalsize,activation=activation_function,input_shape=(array)))

        if layer_type == 'MaxPoolling-2D':
            array = get_array_from_string(input_shape)
            model.add(MaxPooling2D(pool_size=int(array[0],array[1])))

        if layer_type == 'MaxPoolling':
            model.add(MaxPooling1D(pool_size=int(threshold)))
    comple_args = configs[0]
    data = json.loads(comple_args)
    optimizer = data.get('optimizer') if data.get('optimizer') else "linear"
    loss = data.get('loss_function') if data.get('loss_function') else "mean_squared_error"
    model.compile(loss=loss,optimizer=optimizer,metrics=['accuracy'] )
    return model


def get_array_from_string(input_string,separator=','):
    array =[]
    if input_string :
        array = [ int(x) for x in input_string.split(separator) if x]
    return array


def train_model(model,shaper, showResult):
    if model is not None :
        if type(model) is Sequential:
            model.fit(shaper[0], shaper[1], batch_size=500, epochs=10, shuffle=False)
            if  showResult == 'true':
                model.evaluate(shaper[2], shaper[3],verbose=1)
        else :
            model.fit(shaper[0], shaper[1])
            if  showResult == 'true':
                result = model.score(shaper[2], shaper[3])
                print("Model accuracy",result * 100)
    return model


def predict_model(model,shaper):
    if type(shaper) is tuple :
        return model.predict(shaper[2])
    else:
        return model.predict(shaper)






