// DB.js config for your database  
const sql = require('mssql') 

// configuration to connect to sql, the database is on rds on aws
const config = {  
user: "admin",  
password: "Huequitos.08",  
server: "statsdb.cfl8tbxohjth.us-east-2.rds.amazonaws.com",  
port:1433,
database: "adnmutant",
options: {
    trustServerCertificate: true
  }
}  
const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL')  
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, poolPromise  
}  