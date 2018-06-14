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
     df = pickle.loads(r.get('totalRecords'))
     return df;

     if dateObj['dateRange'] == {}:
        return df
     else:
         df = df[(df['sales_data_leisure_view.transaction_date'] >= dateObj['dateRange']['fromDate']) & (df['sales_data_leisure_view.transaction_date'] <= dateObj['dateRange']['toDate'])]
         return df

def calculateSalesRevenues():
     # fetch all records
     df = getDataframe();

     # Calculate gross revenue and average gross revenue from df
     grossRevenue = df['sales_data_leisure_view.txn_amount'].sum();
     averageGrossRevenue = df['sales_data_leisure_view.txn_amount'].mean();
     # Calculate net revenue from df
     netRevenue = np.sum(df['sales_data_leisure_view.txn_amount']-df['sales_data_leisure_view.vendor_amount'])
     # Calculate total number of transactions
     numberOfTransactions = df.shape[0];

     totalRevenues = dict({
       'Gross Revenue': grossRevenue,
       'Net Revenue': netRevenue,
       'Average Gross Revenue': averageGrossRevenue,
       'Total Transactions': numberOfTransactions
     });

     print(json.dumps(totalRevenues));

calculateSalesRevenues();
