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

def calculateAverageGR(x, df):
    return df.groupby('sales_data_leisure_view.channel')['sales_data_leisure_view.txn_amount'].mean()[x];

def calculateGrossRevenue(x, df):
    return df.groupby('sales_data_leisure_view.channel')['sales_data_leisure_view.txn_amount'].sum()[x];

def calculateNetRevenue(x, df):
     df['dif_sum'] = df['sales_data_leisure_view.txn_amount'] - df['sales_data_leisure_view.vendor_amount'];
     return df.groupby('sales_data_leisure_view.channel')['dif_sum'].sum()[x];

def calculateTotalTransactions(x, df):
    return df.groupby('sales_data_leisure_view.channel')['sales_data_leisure_view.transaction_date'].count()[x];

def calculateChannelBasedRevenues():
     # fetch all records
     df = getDataframe();

     # Calculate gross revenue from df
     channelGrossRevenue = {}
     channels = df['sales_data_leisure_view.channel'].unique();
     for i in channels:
        channelGrossRevenue[i] = calculateGrossRevenue(i, df);
     # Calculate average gross revenue from df
     channelAverageGR = {}
     channels = df['sales_data_leisure_view.channel'].unique();
     for i in channels:
        channelAverageGR[i] = calculateAverageGR(i, df);

     # Calculate net revenue from df
     channelNetRevenue = {}
     channels = df['sales_data_leisure_view.channel'].unique();
     for i in channels:
        channelNetRevenue[i] = calculateNetRevenue(i, df);

     # Calculate total number of transactions
     channelTotalTransactions = {}
     channels = df['sales_data_leisure_view.channel'].unique();
     for i in channels:
        channelTotalTransactions[i] = calculateTotalTransactions(i, df);

     channelBasedRevenues = dict({
       'AIRPORT': {
         'GrossRevenue': channelGrossRevenue['AIRPORT'],
         'AverageGrossRevenue': channelAverageGR['AIRPORT'],
         'Transactions': channelTotalTransactions['AIRPORT'],
         'NetRevenue': channelNetRevenue['AIRPORT'],
        },
       'BRANCH': {
         'GrossRevenue': channelGrossRevenue['BRANCH'],
         'AverageGrossRevenue': channelAverageGR['BRANCH'],
         'Transactions': channelTotalTransactions['BRANCH'],
         'NetRevenue': channelNetRevenue['BRANCH'],
        },
       'CALL CENTER': {
         'GrossRevenue': channelGrossRevenue['CALL CENTER'],
         'AverageGrossRevenue': channelAverageGR['CALL CENTER'],
         'Transactions': channelTotalTransactions['CALL CENTER'],
         'NetRevenue': channelNetRevenue['CALL CENTER'],
        },
       'DIGITAL': {
          'GrossRevenue': channelGrossRevenue['DIGITAL'],
          'AverageGrossRevenue': channelAverageGR['DIGITAL'],
          'Transactions': channelTotalTransactions['DIGITAL'],
          'NetRevenue': channelNetRevenue['DIGITAL'],
         },
        'FRANCHISE': {
          'GrossRevenue': channelGrossRevenue['FRANCHISE'],
          'AverageGrossRevenue': channelAverageGR['FRANCHISE'],
          'Transactions': channelTotalTransactions['FRANCHISE'],
          'NetRevenue': channelNetRevenue['FRANCHISE'],
         },
     });
     print(json.dumps(channelBasedRevenues));

calculateChannelBasedRevenues();
