use adnmutant
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE dbo.spGetMutantResult

	
AS
BEGIN


declare @mutant int,@human int

select @mutant=count(8) from dbo.ADN_MUTANT_HUMAN
where isMutant=1

select @human=count(8) from dbo.ADN_MUTANT_HUMAN
where isMutant=0

select @mutant AS Mutant,@human AS Human

END
GO
