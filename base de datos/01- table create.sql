--create database rdsadmin

use adnmutant
CREATE TABLE dbo.ADN_MUTANT_HUMAN (
    id_adn int identity(1,1),
    dna varchar(max),
	isMutant bit
);

select * from dbo.ADN_MUTANT_HUMAN

exec spInsertResultADN '["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]',1

