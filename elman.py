import numpy as np
from functools import partial

def sigmoid(x):
    ''' Sigmoid like function using tanh '''
    return np.tanh(x)


def dsigmoid(x):
    ''' Derivative of sigmoid above '''
    return 1.0 - x ** 2

def layersUtil(shape):
    yield shape[0] + 1 + shape[1]
    for index, value in enumerate(shape):
        if index > 0:
            yield value

def buildLayers(shape):
    return [np.ones(size) for size in layersUtil(shape)]

class Elman:
    ''' Elamn network '''

    def __init__(self, *args):
        ''' Initialization of the perceptron with given sizes.  '''

        self.shape = args
        n = len(args)

        self.layers = buildLayers(self.shape)

        # Build weights matrix
        self.weights = [np.zeros((cur.size, nxt.size))for cur, nxt in zip(self.layers, self.layers[1:])]

        # dw will hold last change in weights (for momentum)
        self.dw = [0, ] * len(self.weights)

        # Reset weights
        self.reset()

    def reset(self):
        ''' Reset weights '''

        for i in range(len(self.weights)):
            Z = np.random.random((self.layers[i].size, self.layers[i + 1].size))
            self.weights[i][...] = (2 * Z - 1) * 0.25

    def propagate_forward(self, data):
        ''' Propagate data from input layer to output layer. '''

        # Set input layer with data
        self.layers[0][:self.shape[0]] = data
        # and first hidden layer
        self.layers[0][self.shape[0]:-1] = self.layers[1]

        # Propagate from layer 0 to layer n-1 using sigmoid as activation function
        for i in range(1, len(self.shape)):
            # Propagate activity
            self.layers[i][...] = sigmoid(np.dot(self.layers[i - 1], self.weights[i - 1]))

        # Return output
        return self.layers[-1]

    def computeWeight(self,lrate, momentum, weight, layer, delta, dw):
        aLayer = np.atleast_2d(layer)
        aDelta = np.atleast_2d(delta)
        aDw = np.dot(aLayer.T, aDelta)
        aWeight = weight + lrate * aDw + momentum * dw
        return aDw, aWeight

    def computeDelta(self, delta, weight, layer):
        return np.dot(delta, weight.T) * dsigmoid(layer)

    def propagate_backward(self, target, lrate=0.1, momentum=0.1):
        ''' Back propagate error related to target using lrate. '''

        deltas = []
        # Compute error on output layer
        error = target - self.layers[-1]
        delta = error * dsigmoid(self.layers[-1])
        deltas.append(delta)

        # Compute error on hidden layers
        computeDeltaP = partial(self.computeDelta,delta)
        for i in range(len(self.shape) - 2, 0, -1):
            deltas.insert(0, computeDeltaP(self.weights[i] ,self.layers[i]))


        computeWeightP = partial(self.computeWeight, lrate, momentum)
        # Update weights
        nDw, nWeight = [computeWeightP(weight, layer, delta, dw)
                        for weight, layer, delta, dw in zip(self.weights, self.layers, deltas, self.dw)]


        for i in range(len(self.weights)):
            layer = np.atleast_2d(self.layers[i])
            delta = np.atleast_2d(deltas[i])
            dw = np.dot(layer.T, delta)
            self.weights[i] += lrate * dw + momentum * self.dw[i]
            self.dw[i] = dw

        # Return error
        return (error ** 2).sum()


# -----------------------------------------------------------------------------
if __name__ == '__main__':
    import matplotlib
    import matplotlib.pyplot as plt

    # Example 1: learning a simple time serie
    # -------------------------------------------------------------------------
    network = Elman(4, 8, 4)
    samples = np.zeros(6, dtype=[('input', float, 4), ('output', float, 4)])
    samples[0] = (1, 0, 0, 0), (0, 1, 0, 0)
    samples[1] = (0, 1, 0, 0), (0, 0, 1, 0)
    samples[2] = (0, 0, 1, 0), (0, 0, 0, 1)
    samples[3] = (0, 0, 0, 1), (0, 0, 1, 0)
    samples[4] = (0, 0, 1, 0), (0, 1, 0, 0)
    samples[5] = (0, 1, 0, 0), (1, 0, 0, 0)
    for i in range(5000):
        n = i % samples.size
        network.propagate_forward(samples['input'][n])
        network.propagate_backward(samples['output'][n])
    for i in range(samples.size):
        o = network.propagate_forward(samples['input'][i])
        print 'Sample %d: %s -> %s' % (i, samples['input'][i], samples['output'][i])
        print '               Network output: %s' % (o == o.max()).astype(float)
        print
