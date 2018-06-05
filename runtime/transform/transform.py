import custom_functions as cf


def get_function(function):
    if function.startswith('lambda'):
        return function
    else:
        return 'cf.'+function


def transform_df(df, transformers):
    begin = 'df.transform({'
    code = []
    for transformer in transformers:
        code.append('\''+str(transformer.get('column'))+'\': '+str(get_function(transformer.get('function'))))
    code = str(','.join(code))
    end = '})'
    code = ''.join([begin, code, end])
    dt = eval(code)
    return dt
