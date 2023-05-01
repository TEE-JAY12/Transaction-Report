const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "JESUTOBI",
    database : "transactionreport",
    multipleStatements : false
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected")
        
    }
    else{
        {
            console.log("Connection Failed");
            console.log(err)
        
        }
    }
});

module.exports = mysqlConnection;