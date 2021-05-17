import pandas as pd
from bs4 import BeautifulSoup
import requests
import csv
import re
from pprint import pprint

action = "getissuer"
cik = input("Enter company cik: ")
base_url = f"https://www.sec.gov/cgi-bin/own-disp?action={action}&CIK={cik}"

content = requests.get(base_url).text

soup = BeautifulSoup(content, 'lxml')
print()
for item in soup.find_all('td', class_='small'):
    try:
        # Filters out desired table TODO this is a hacky way of doing this
        tag = item.table.attrs
        table = item.table

        # Extracts the data from the table
        dfs = pd.read_html(
            str(table), header=0)
    except:
        pass

dfs[0]['cik'] = cik

for df in dfs:
    print(df)

# header = table.find('tr')
# print(header)

dicts = df.to_dict()
# pprint(dicts)

# It's good
df.to_csv(f'company_owners_{cik}.csv', index=False)


print()
userin = int(input('Which owner will you want to see: '))
pprint(dicts['Filings'][userin])

action = 'getowner'
file_cik = dicts['Filings'][userin]
base_url = f"https://www.sec.gov/cgi-bin/own-disp?action={action}&CIK={file_cik}"

content = requests.get(base_url).text
soup = BeautifulSoup(content, 'lxml')

print()

table = soup.find('table', id='transaction-report')

# Extracts the data from the table
dfs = pd.read_html(str(table), header=0)
dfs[0]['filing_no'] = file_cik

for df in dfs:
    print(df)

df.to_csv(f'owner_transactions_{cik}_{file_cik}.csv', index=False)
