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
     flightsGR = calculateGrossRevenue('FLIGHTS', df);
     hotelsGR = calculateGrossRevenue('HOTELS', df);
     othersGR = calculateGrossRevenue('OTHERS', df);

     # Calculate average gross revenue from df
     flightsAverageGR = calculateAverageGR('FLIGHTS', df);
     hotelsAverageGR = calculateAverageGR('HOTELS', df);
     othersAverageGR = calculateAverageGR('OTHERS', df);

     # Calculate net revenue from df
     flightsNetRevenue = calculateNetRevenue('FLIGHTS', df);
     hotelsNetRevenue = calculateNetRevenue('HOTELS', df);
     othersNetRevenue = calculateNetRevenue('OTHERS', df);

     # Calculate total number of transactions
     numberOfFlightsTrans = calculateTotalTransactions('FLIGHTS', df);
     numberOfHotelsTrans = calculateTotalTransactions('HOTELS', df);
     numberOfOthersTrans = calculateTotalTransactions('OTHERS', df);

     serviceBasedRevenues = dict({
       'FLights': {
         'GrossRevenue': flightsGR,
         'AverageGrossRevenue': flightsAverageGR,
         'Transactions': numberOfFlightsTrans,
         'NetRevenue': flightsNetRevenue
        },
       'Hotels': {
         'GrossRevenue': hotelsGR,
         'AverageGrossRevenue': hotelsAverageGR,
         'Transactions': numberOfHotelsTrans,
         'NetRevenue': hotelsNetRevenue
        },
       'Others': {
         'GrossRevenue': othersGR,
         'AverageGrossRevenue': othersAverageGR,
         'Transactions': numberOfOthersTrans,
         'NetRevenue': othersNetRevenue
        },
     });
     print(serviceBasedRevenues);

calculateServiceBasedRevenues();
