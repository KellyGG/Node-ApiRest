use adnmutant
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.spInsertResultADN

	@dna varchar(max),
	@Result bit
	
AS
BEGIN


   INSERT INTO dbo.ADN_MUTANT_HUMAN (dna, isMutant)
   select @dna, @Result
   WHERE NOT EXISTS ( SELECT * FROM dbo.ADN_MUTANT_HUMAN 
                   WHERE dna = @dna);



END
GO
