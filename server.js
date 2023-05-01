const express = require("express");
const bodyParser = require("body-parser");

const Transactionreport = require("./route/paypal");

const db = require('./models')

var app = express();

app.use(bodyParser.json());

app.use("/api",Transactionreport);

db.sequelize.sync().then((req)=>{
  app.listen(3001, () => {
    console.log('Server started on port 3001');
  });
});
