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
  companies_raw;


CREATE TABLE user_owners (
  filing_id VARCHAR(64) NOT NULL REFERENCES owners_names,
  email VARCHAR(64) NOT NULL REFERENCES users
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
  security_name varchar(64),
  filing_id varchar(64)
);


-- This is the normailized transactions
CREATE TABLE transactions
  (
     acquistion_or_disposition,
     transaction_date,
     transaction_type,
     num_securities_transacted,
     number_securities_owned,
     company_cik,
     filing_id
  )AS
  (SELECT acquistion_or_disposition,
          transaction_date,
          transaction_type,
          num_securities_transacted,
          number_securities_owned,
          company_cik,
          filing_id
   FROM   transactions_raw);

CREATE TABLE transactions(
  acquistion_or_disposition VARCHAR(4),
  transaction_date DATE,
  transaction_type VARCHAR(32),
  num_securities_transacted FLOAT,
  num_securities_owned FLOAT,
  company_cik VARCHAR(32) REFERENCES companies,
  filing_id VARCHAR(64) REFERENCES owner_names
); 


COPY [Table Name](Optional Columns) 
FROM 
  '[Absolute Path to File]' DELIMITER '[Delimiter Character]' CSV HEADER;

-- select substr(title,1, position(':' in title)-1) title from owners_raw;



--  select trim(leading from substr(title, position(':' in title)+1)) title from owners_raw;


-- select owner_name, filings, trim(leading from substr(title, position(':' in title)+1)) title from owners_raw;

CREATE TABLE owners_raw (
  owner_name VARCHAR(64), 
  filings  VARCHAR(64),
  transaction_date DATE, 
  title VARCHAR(255),
  cik VARCHAR(32)
);

-- We use this table to split it into two table owners_titles and owners_names
CREATE owners_1 (owner_name, filings, title) AS
  (SELECT owner_name,
          filings,
          trim(LEADING
               FROM substr(title, position(':' IN title)+1)) title
   FROM owners_raw);




-- SELECT 
--     yourTable.ID, 
--     regexp_split_to_table(yourTable.fruits, E',') AS split_fruits
-- FROM yourTable

-- select owner_name, filings, regexp_split_to_table(title, E',') AS split from owners_1;

-- owner_titles
CREATE TABLE owner_titles
  (
     filings VARCHAR(64) REFERENCES owner_names,
     title   VARCHAR(255)
  ); 

CREATE TABLE owner_titles AS
SELECT filings,
       title
FROM
  (SELECT owner_name,
          filings,
          trim(LEADING
               FROM regexp_split_to_table(title, E',')) AS title
   FROM owners_1) AS foo;


-- owner_names
CREATE TABLE owner_names
  (
     filings    VARCHAR(64) PRIMARY KEY,
     owner_name VARCHAR(32)
  ); 


CREATE TABLE owner_names AS
SELECT DISTINCT filings,
                owner_name
FROM
  (SELECT owner_name,
          filings,
          trim(LEADING
               FROM regexp_split_to_table(title, E',')) AS title
   FROM owners_1) AS foo;


-- owner_corps
CREATE TABLE owner_corps
  (
     filings VARCHAR(64) REFERENCES owner_names,
     cik     VARCHAR(32) REFERENCES companies,
  ); 


CREATE TABLE owner_corps AS
SELECT DISTINCT filings,
                cik
FROM owners_raw;


