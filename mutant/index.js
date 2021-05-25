const {mutante}= require("./MutanteHuman");
const {validations}= require("./utils/validations");
const { poolPromise } = require('./Connection/SqlConnection')  
const sql = require('mssql')  

module.exports.handler = async (event) => {
    const body = event.body == null ? event : JSON.parse(event.body);
    console.log(body);
    let resultADN=''
    let respuesta='';
    try{
  
        let lettersValid = /^[ATGCatgc,]+$/
        if(Array.isArray(body.dna)
        &&
        (lettersValid.test(body.dna.toString())
        )
        && (!validations(body.dna).includes(false))
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
                console.log("resul",result)
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
            "errorMessage":"The input dna is invalid, please check that the structure of array is correct or if only has ATGC letters"

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