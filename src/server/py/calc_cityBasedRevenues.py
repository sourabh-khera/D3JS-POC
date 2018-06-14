from pyhive import hive
import pandas as pd
import numpy as np
import json
import os
import sys
import redis
import pickle

j = sys.argv[1]
dateObj = json.loads(j);


def getDataframe():
      r = redis.StrictRedis(host='localhost', port=6379, db=0);
      df = pickle.loads(r.get('totalRecords'));

      if dateObj['dateRange'] == {}:
        return df
      else:
         df = df[(df['sales_data_leisure_view.transaction_date'] >= dateObj['dateRange']['fromDate']) & (df['sales_data_leisure_view.transaction_date'] <= dateObj['dateRange']['toDate'])]
         return df

def calculateGrossRevenue(x, df):
    return df.groupby('sales_data_leisure_view.city_official')['sales_data_leisure_view.txn_amount'].sum()[x];

def calculateCityBasedRevenues():
     # fetch all records
     df = getDataframe();
     cityObject = {}
     cities = df['sales_data_leisure_view.city_official'].unique();
     for i in cities:
         if i == None:
             cityObject[i] = -1
         else:
             cityObject[i] = calculateGrossRevenue(i, df);

     print(json.dumps(cityObject))


calculateCityBasedRevenues();
