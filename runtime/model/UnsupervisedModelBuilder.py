
import json
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import dlib


def __create_dlib_cluster(config,shape) :

    data = json.loads(config)
    threshod = data.get('threshold') if data.get('threshold') else 0.5
    shape = __get_value__(shape)
    labels = dlib.chinese_whispers_clustering(shape, threshod)
    return len(set(labels)), labels


def create_model(model_type,shaper,config=None):
    if model_type == 'DLIB Cluster':
        return __create_dlib_cluster(config,shaper)
    elif model_type =='PCA':
        return __createPCA_cluster__(shaper,config)
    elif model_type =='K-Means Clustering':
        return __createKMEAN_cluster__(shaper, config)


def __createKMEAN_cluster__(dataset, config) :
    data = json.loads(config)
    n_components = data.get('n_clusters') if data.get('n_clusters') else 3
    kmeans = KMeans(n_clusters=n_components)
    dataset = __get_value__(dataset)
    clusters = kmeans.fit(dataset)
    return clusters.labels_


def __createPCA_cluster__(dataset,config):
    data = json.loads(config)
    n_components = data.get('n_components') if data.get('n_components') else 3
    pca = PCA(n_components=n_components)
    dataset=__get_value__(dataset)
    pca.fit(dataset)
    return pca.transform(dataset)


def __get_value__(dataset) :
    if type(dataset) is tuple:
        dataset = dataset[0]
    return dataset
