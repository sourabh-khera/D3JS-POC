from pyhive import hive
import pandas as pd
import numpy as np
import os

def createConnection():
     hostUrl = os.environ.get('HIVEHOSTURL');
     conn = hive.Connection(host=hostUrl or '52.48.118.224', auth="CUSTOM", username='hive', password="pvXxHTsdqrt8", port=10000, database='tapro_atg');
     return conn;

def getDataframe():
     conn = createConnection();
     df = pd.read_sql_query("select * from sales_data_leisure_view", conn);
     return df;

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
       'GrossRevenue': grossRevenue,
       'NetRevenue': netRevenue,
       'AverageGrossRevenue': averageGrossRevenue,
       'TotalTransactions': numberOfTransactions
     });

     # print(totalRevenues);

calculateSalesRevenues();
