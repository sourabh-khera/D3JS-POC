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

def calculateServiceBasedRevenues():
     # fetch all records
     df = getDataframe();

     # Calculate gross revenue and average gross revenue from df
     flightsGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['FLIGHTS'];
     hotelsGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['HOTELS'];
     othersGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].sum()['OTHERS'];


     # Calculate average gross revenue from df
     flightsAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['FLIGHTS'];
     hotelsAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['HOTELS'];
     othersAverageGR = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.txn_amount'].mean()['OTHERS'];

     # Calculate net revenue from df
     df['dif_sum'] = df['sales_data_leisure_view.txn_amount'] - df['sales_data_leisure_view.vendor_amount'];
     flightsNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['FLIGHTS'];
     hotelsNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['HOTELS'];
     othersNetRevenue = df.groupby('sales_data_leisure_view.service')['dif_sum'].sum()['OTHERS'];

     # Calculate total number of transactions
     numberOfFlightsTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['FLIGHTS'];
     numberOfHotelsTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['HOTELS'];
     numberOfOthersTrans = df.groupby('sales_data_leisure_view.service')['sales_data_leisure_view.transaction_date'].count()['OTHERS'];

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
