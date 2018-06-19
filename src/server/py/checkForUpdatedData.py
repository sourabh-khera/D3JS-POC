from pyhive import hive
import pandas as pd
import json
import os
import pickle
import redis


def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password="pvXxHTsdqrt8", port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection();
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);
     r = redis.StrictRedis(host='localhost', port=6379, db=0);
     if r.exists('totalRecords') == 1:
        redisData = pickle.loads(r.get('totalRecords'));
        result = pd.DataFrame.equals(df, redisData)
        if result == True:
           print('no need for updating the data');
        else:
           pickled_object = pickle.dumps(df);
           r.set('totalRecords', pickled_object);
           r.expire('totalRecords',1200)
           print('redis database updated');
     else:
         return;


getDataframe();
