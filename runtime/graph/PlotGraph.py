import matplotlib.pyplot as plt


def compare_result(predict,actual,stcok_symbol):
    plt.figure(figsize=(21, 7))
    plt.plot(actual, label='Actual Price', color='blue')
    plt.plot(predict.ravel(), label='Predicted Price', color='red')
    plt.title(stcok_symbol + ' - Actual Price vs Predicted Price')
    plt.legend(loc='upper left')
    plt.show()