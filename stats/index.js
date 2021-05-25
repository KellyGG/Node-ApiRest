const { poolPromise } = require('./Connection/SqlConnection')  

module.exports.handler = async (event) => {

    console.log(event);    
    let respuesta='';
    try{
        let response='';
        const pool = await poolPromise  
        const result = await pool.request()   
        .execute("dbo.spGetMutantResult").then(function (recordSet) {  
        console.log("respuesta ",recordSet);
        response=recordSet.recordset[0];
        })            
            respuesta = {
              "count_mutant_dna": response.Mutant,
              "count_human_dna": response.Human,
              "ratio": parseFloat(response.Human/response.Mutant)
            };
           return {
            statusCode: 200,
            headers: {
              "X-Requested-With": "*",
              "Access-Control-Allow-Headers":
                "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with,Access-Control-Allow-Origin",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS"
            },
            body: JSON.stringify(respuesta)
          };


        } catch (error) {  
            console.log("error",error)
            respuesta={
              "error": true,
              "errorMessage":error
  
            };
            return {
                statusCode: "error 001",
                headers: {
                  "X-Requested-With": "*",
                  "Access-Control-Allow-Headers":
                    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with,Access-Control-Allow-Origin",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
                },
                body: JSON.stringify(respuesta),
              };
        } 

};