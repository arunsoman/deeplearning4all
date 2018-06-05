
def strip(columns, df):  # columns: list of columns numbers to be stripped
    try:
        columns = columns.split(',')
        expanded_columns_list = list(map(int, expand_column_list(columns)))
    except:
        stripped_df = df.drop(columns, axis=1)
        return stripped_df
    return  df.drop(df.columns[expanded_columns_list], axis=1)

def expand_column_list(col_list):
    expanded_list = []
    index = 0
    for element in col_list:
        try:
            [start, end] = element.split(':')
            for i in range(int(start), int(end) + 1):
                expanded_list.insert(index, i)
                index = index + 1
        except:
            expanded_list.insert(index, int(element))
            index = index + 1
    return expanded_list




import pandas as pd

if __name__ == '__main__':
    df1 = pd.DataFrame({'a': [1, 2, 3], 'b': [2, 3, 4], 'c': [4, 5, 6], 'd':[5, 6, 7]})
    dt = strip('0:2,3',df=df1)
    print(dt)
