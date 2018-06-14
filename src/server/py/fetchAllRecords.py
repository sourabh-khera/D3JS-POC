from pyhive import hive
import pandas as pd
import json
import os
import redis



def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password="pvXxHTsdqrt8", port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection()
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);
     r = redis.Redis(host='localhost', port=6379, db=0);
     r.set('totalRecords', df);
     r.expire('totalRecords',300)
     print(r.get('totalRecords'));

getDataframe();
