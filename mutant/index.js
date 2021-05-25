const {mutante}= require("../MutanteHuman");
const { poolPromise } = require('../Connection/SqlConnection')  
const sql = require('mssql')  

module.exports.handler = async (event) => {
    const body = event.body == null ? event : JSON.parse(event.body);
    console.log(body);
    let resultADN=''
    let respuesta='';
    try{
      console.log("soy array",Array.isArray(body.dna));
     console.log("q traigo",body.dna);
      let lettersValid = /atcgATCG[,]"'/
      console.log("lettersValid",(lettersValid.test(body.dna.toString())));
      console.log("matriz.length",body.dna.length);
        if(Array.isArray(body.dna)
        //&&
        // (lettersValid.test(body.dna.toString())
        // ))
        )
        {
          resultADN=mutante(body.dna);
          console.log("resultado",resultADN);  
  
          const pool = await poolPromise  
          const result = await pool.request()  
          .input("dna", sql.VarChar(65535), body.dna)  
          .input("Result", sql.Bit, resultADN)  
          .execute("dbo.spInsertResultADN").then(function (recordSet) {  
          console.log("respuesta ",recordSet);
          })  
          console.log("resulttt",result);

             if(resultADN === false) {
              respuesta = {
               error: false,
               mensaje: 'Es humano'
              };

              return {
                statusCode: 403,
                headers: {
                  "X-Requested-With": "*",
                  "Access-Control-Allow-Headers":
                    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with,Access-Control-Allow-Origin",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "POST,GET,OPTIONS"
                },
                body: JSON.stringify(respuesta)
              };
             } else {
              respuesta = {
               error: false,
               mensaje: 'Es mutante'
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
             }  

        } else
        {
          respuesta={
            "error": true,
            "errorMessage":"The input dna is invalid, please check that the value is an array or if only has ATGC letters"

          };
          return {
            statusCode: 400,
            headers: {
              "X-Requested-With": "*",
              "Access-Control-Allow-Headers":
                "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with,Access-Control-Allow-Origin",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST,GET,OPTIONS"
            },
            body: JSON.stringify(respuesta)
          };
        }
       

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