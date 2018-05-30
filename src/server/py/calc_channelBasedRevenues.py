from pyhive import hive
import pandas as pd
import numpy as np
import os

def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password='pvXxHTsdqrt8', port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection();
     df = pd.read_sql_query('select * from sales_data_leisure_view', conn);
     return df;

def calculateChannelBasedRevenues():
     # fetch all records
     df = getDataframe();

     # Calculate gross revenue and average gross revenue from df
     airportGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['AIRPORT'];
     branchGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['BRANCH'];
     callcenterGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['CALLCENTER'];
     franchiseGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['FRANCHISE'];
     digitalGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['DIGITAL'];

     # Calculate average gross revenue from df
     airportAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['AIRPORT'];
     branchAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['BRANCH'];
     callcenterAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['CALLCENTER'];
     franchiseAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['FRANCHISE'];
     digitalAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['DIGITAL'];

     # Calculate net revenue from df
     df['dif_sum'] = df['sales_data_leisure_view.txn_amount'] - df['sales_data_leisure_view.vendor_amount'];
     airportNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['AIRPORT'];
     branchNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['BRANCH'];
     callcenterRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['CALLCENTER'];
     franchiseNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['FRANCHISE'];
     digitalNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['DIGITAL'];

     # Calculate total number of transactions
     numberOfAirportTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['AIRPORT'];
     numberOfBranchTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['BRANCH'];
     numberOfCallcenterTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['CALLCENTER'];
     numberOfFranchiseTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['FRANCHISE'];
     numberOfDigitalTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['DIGITAL'];

     channelBasedRevenues = dict({
       'Airport': {
         'GrossRevenue': airportGR,
         'AverageGrossRevenue': airportAverageGR,
         'Transactions': numberOfAirportTrans,
         'NetRevenue': airportNetRevenue
        },
       'Branch': {
         'GrossRevenue': branchGR,
         'AverageGrossRevenue': branchAverageGR,
         'Transactions': numberOfBranchTrans,
         'NetRevenue': branchNetRevenue
        },
       'CallCenter': {
         'GrossRevenue': callcenterGR,
         'AverageGrossRevenue': callcenterAverageGR,
         'Transactions': numberOfCallcenterTrans,
         'NetRevenue': callcenterRevenue
        },
       'Digital': {
          'GrossRevenue': digitalGR,
          'AverageGrossRevenue': digitalAverageGR,
          'Transactions': numberOfDigitalTrans,
          'NetRevenue': franchiseNetRevenue
         },
        'Franchise': {
          'GrossRevenue': franchiseGR,
          'AverageGrossRevenue': franchiseAverageGR,
          'Transactions': numberOfFranchiseTrans,
          'NetRevenue': digitalNetRevenue
         },
     });
     print(channelBasedRevenues);

calculateChannelBasedRevenues();
