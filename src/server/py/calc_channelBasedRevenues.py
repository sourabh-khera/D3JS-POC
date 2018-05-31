from pyhive import hive
import pandas as pd
import numpy as np
import json
import os

def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password='pvXxHTsdqrt8', port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection();
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);
     return df;

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
       'Airport': {
         'GrossRevenue': channelGrossRevenue['AIRPORT'],
         'AverageGrossRevenue': channelAverageGR['AIRPORT'],
         'Transactions': channelTotalTransactions['AIRPORT'],
         'NetRevenue': channelNetRevenue['AIRPORT'],
        },
       'Branch': {
         'GrossRevenue': channelGrossRevenue['BRANCH'],
         'AverageGrossRevenue': channelAverageGR['BRANCH'],
         'Transactions': channelTotalTransactions['BRANCH'],
         'NetRevenue': channelNetRevenue['BRANCH'],
        },
       'CallCenter': {
         'GrossRevenue': channelGrossRevenue['CALL CENTER'],
         'AverageGrossRevenue': channelAverageGR['CALL CENTER'],
         'Transactions': channelTotalTransactions['CALL CENTER'],
         'NetRevenue': channelNetRevenue['CALL CENTER'],
        },
       'Digital': {
          'GrossRevenue': channelGrossRevenue['DIGITAL'],
          'AverageGrossRevenue': channelAverageGR['DIGITAL'],
          'Transactions': channelTotalTransactions['DIGITAL'],
          'NetRevenue': channelNetRevenue['DIGITAL'],
         },
        'Franchise': {
          'GrossRevenue': channelGrossRevenue['FRANCHISE'],
          'AverageGrossRevenue': channelAverageGR['FRANCHISE'],
          'Transactions': channelTotalTransactions['FRANCHISE'],
          'NetRevenue': channelNetRevenue['FRANCHISE'],
         },
     });
     print(json.dumps(channelBasedRevenues));

calculateChannelBasedRevenues();
