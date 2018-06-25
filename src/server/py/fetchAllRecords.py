from pyhive import hive
import pandas as pd
import json
import os
import redis
import pickle


def checkForExistingKey():
    r = redis.StrictRedis(host='localhost', port=6379, db=0);
    exist = r.exists('totalRecords');
    if exist == 1:
       print('true');
    else:
        getDataframe();



def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host='1.0.1.38', auth="CUSTOM", username='hive', password="pvXxHTsdqrt8", port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection()
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);
     r = redis.StrictRedis(host='localhost', port=6379, db=0);
     pickled_object = pickle.dumps(df);
     r.set('totalRecords', pickled_object);
     print('true');

checkForExistingKey();
