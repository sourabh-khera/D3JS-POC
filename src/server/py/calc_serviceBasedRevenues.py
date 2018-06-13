from pyhive import hive
import pandas as pd
import numpy as np
import json
import os
import sys

j = sys.argv[1]
dateObj = json.loads(j);

def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password='pvXxHTsdqrt8', port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection()
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);

     if dateObj['dateRange'] == {}:
        return df
     else:
         df = df[(df['sales_data_leisure_view.transaction_date'] >= dateObj['dateRange']['fromDate']) & (df['sales_data_leisure_view.transaction_date'] <= dateObj['dateRange']['toDate'])]
         return df

def calculateAverageGR(x, df):
    return df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()[x];

def calculateGrossRevenue(x, df):
    return df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()[x];

def calculateNetRevenue(x, df):
     df['dif_sum'] = df['sales_data_leisure_view.txn_amount'] - df['sales_data_leisure_view.vendor_amount'];
     return df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()[x];

def calculateTotalTransactions(x, df):
    return df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()[x];

def calculateServiceBasedRevenues():
     # fetch all records
     df = getDataframe();

     # Calculate gross revenue and average gross revenue from df
     serviceGrossRevenue = {}
     services = df['sales_data_leisure_view.service'].unique();
     for i in services:
        serviceGrossRevenue[i] = calculateGrossRevenue(i, df);

     # Calculate average gross revenue from df
     serviceAverageGR = {}
     services = df['sales_data_leisure_view.service'].unique();
     for i in services:
        serviceAverageGR[i] = calculateAverageGR(i, df);

     # Calculate net revenue from df
     serviceNetRevenue = {}
     services = df['sales_data_leisure_view.service'].unique();
     for i in services:
        serviceNetRevenue[i] = calculateNetRevenue(i, df);

     # Calculate total number of transactions
     serviceTotalTransactions = {}
     services = df['sales_data_leisure_view.service'].unique();
     for i in services:
        serviceTotalTransactions[i] = calculateTotalTransactions(i, df);
     serviceBasedRevenues = dict({
       'FLIGHTS': {
          'GrossRevenue': serviceGrossRevenue['FLIGHTS'],
          'AverageGrossRevenue': serviceAverageGR['FLIGHTS'],
          'Transactions': serviceTotalTransactions['FLIGHTS'],
          'NetRevenue': serviceNetRevenue['FLIGHTS'],
        },
       'HOTELS': {
          'GrossRevenue': serviceGrossRevenue['HOTELS'],
          'AverageGrossRevenue': serviceAverageGR['HOTELS'],
          'Transactions': serviceTotalTransactions['HOTELS'],
          'NetRevenue': serviceNetRevenue['HOTELS'],
        },
       'OTHERS': {
          'GrossRevenue': serviceGrossRevenue['OTHERS'],
          'AverageGrossRevenue': serviceAverageGR['OTHERS'],
          'Transactions': serviceTotalTransactions['OTHERS'],
          'NetRevenue': serviceNetRevenue['OTHERS'],
        },
     });
     print(json.dumps(serviceBasedRevenues));

calculateServiceBasedRevenues();
