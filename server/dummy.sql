CREATE TABLE users (
  email VARCHAR(64) NOT NULL PRIMARY KEY, 
  password VARCHAR(64) NOT NULL, 
  last_name VARCHAR(64), 
  first_name VARCHAR(64)
);

CREATE TABLE companies_raw (
  cik VARCHAR(32), 
  ticker VARCHAR(32), 
  company_name VARCHAR(255)
);

CREATE TABLE companies (
  cik VARCHAR(32) NOT NULL, 
  ticker VARCHAR(32) NOT NULL PRIMARY KEY, 
  company_name VARCHAR(255) NOT NULL
);

INSERT INTO companies (ticker, cik, company_name) 
SELECT 
  DISTINCT ticker, 
  cik, 
  company_name 
FROM 
  companies_raw
;

CREATE TABLE owners_raw (
  owner_name VARCHAR(64), 
  filings INT, 
  transaction_date DATE, 
  title VARCHAR(255),
  cik VARCHAR(32)
);

CREATE TABLE owners (
  owner_name VARCHAR(64) NOT NULL, 
  filings INT NOT NULL, 
  ticker VARCHAR(64) NOT NULL REFERENCES companies, 
  transaction_date DATE, 
  title VARCHAR(64), 
  PRIMARY KEY (owner_name, ticker)
);

CREATE TABLE user_owners (
  email VARCHAR(64) REFERENCES users, 
  owner_name VARCHAR(64), 
  ticker VARCHAR(64), 
  FOREIGN KEY (owner_name, ticker) REFERENCES owners (owner_name, ticker)
);

CREATE TABLE user_companies (
  email VARCHAR(64) REFERENCES users, 
  ticker VARCHAR(64) REFERENCES companies
);

create table transactions_raw(
  acquistion_or_disposition VARCHAR(4), 
  transaction_date DATE, 
  deemed_execution_date date, 
  company_name VARCHAR(64), 
  form VARCHAR(4), 
  transaction_type VARCHAR(32), 
  direct_or_Indirect_ownership varchar(16), 
  num_securities_transacted float, 
  number_securities_owned float, 
  line_number int, 
  company_cik varchar(32), 
  security_name varchar(64)
);

COPY [Table Name](Optional Columns) 
FROM 
  '[Absolute Path to File]' DELIMITER '[Delimiter Character]' CSV HEADER;
