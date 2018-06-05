
def concat(list_of_joiner_input,style):
    df = None
    first = list_of_joiner_input[0]
    for next in list_of_joiner_input[1:] :
        first['csv'] = pd.concat([first.get('csv'), next.get('csv')], axis=style)
    return first.get('csv')


def join(list_of_joiner_input):
    left = list_of_joiner_input[0]

    for right in list_of_joiner_input[1:]:
        left['csv'] = pd.merge(left.get('csv'),right.get('csv'),left_on=left.get('key'),right_on=right.get('key'),how='inner')
    return left['csv']


import pandas as pd

if __name__ == '__main__':
    df1 = pd.DataFrame({'a': [1, 2, 3], 'b': [2, 3, 4]})
    df2 = pd.DataFrame({'d': [1, 2, 0], 'c': [4, 7, 9]})
    df3 = pd.DataFrame({'a': [2, 3, 0], 'e': [4, 7, 11]})
    # dt = join([{"csv":df1,"key":'a',"columns":"1,2,3"}, {"csv":df2,"key":'d',"columns":"1,2,3"}, {"csv":df3,"key":'a',"columns":"1,2,3"}])
    dt1 = concat([{"csv": df1, "key": 'a', "columns": "1,2,3"}, {"csv": df2, "key": 'd', "columns": "1,2,3"},
          {"csv": df3, "key": 'a', "columns": "1,2,3"}],style=1)
    dt2 = concat([{"csv": df1, "key": 'a', "columns": "1,2,3"}, {"csv": df2, "key": 'd', "columns": "1,2,3"},
                  {"csv": df3, "key": 'a', "columns": "1,2,3"}], style=0)
    print(dt2)
    print(dt1)
