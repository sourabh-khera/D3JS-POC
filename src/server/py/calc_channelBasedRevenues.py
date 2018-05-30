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
     airportGR = calculateGrossRevenue('AIRPORT', df);
     branchGR = calculateGrossRevenue('BRANCH', df);
     callcenterGR = calculateGrossRevenue('CALL CENTER', df);
     franchiseGR = calculateGrossRevenue('FRANCHISE', df);
     digitalGR = calculateGrossRevenue('DIGITAL', df);

     # Calculate average gross revenue from df
     airportAverageGR = calculateAverageGR('AIRPORT', df);
     branchAverageGR = calculateAverageGR('BRANCH', df);
     callcenterAverageGR = calculateAverageGR('CALL CENTER', df);
     franchiseAverageGR = calculateAverageGR('FRANCHISE', df);
     digitalAverageGR = calculateAverageGR('DIGITAL', df);

     # Calculate net revenue from df
     airportNetRevenue = calculateNetRevenue('AIRPORT', df);
     branchNetRevenue = calculateNetRevenue('BRANCH', df);
     callcenterRevenue = calculateNetRevenue('CALL CENTER', df);
     franchiseNetRevenue = calculateNetRevenue('FRANCHISE', df);
     digitalNetRevenue = calculateNetRevenue('DIGITAL', df);

     # Calculate total number of transactions
     numberOfAirportTrans = calculateTotalTransactions('AIRPORT', df);
     numberOfBranchTrans = calculateTotalTransactions('BRANCH', df);
     numberOfCallcenterTrans = calculateTotalTransactions('CALL CENTER', df);
     numberOfFranchiseTrans = calculateTotalTransactions('FRANCHISE', df);
     numberOfDigitalTrans = calculateTotalTransactions('DIGITAL', df);

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
