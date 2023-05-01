//import fetch from "node-fetch";

const express = require("express");
const Router = express.Router();
const paypal = require('paypal-rest-sdk');
// const fetch = require('node-fetch');

const { Paypal } = require('../models');



const CLIENT_ID ='Ac3Xm6ThJfD3NY9uzNYoUCL299HpGmMNIFTKPtyNbYL7ixQB7HDX1xZy2_zfYzi99cevrsgzVHGhNu0n'
const APP_SECRET = 'EC25Jn72VRT7ssbkckMAVxIL95BhMBr4zIJJPx3z7FJjC_ZIVUGh7R2MyEvZhs15SIQKy7ZU7ouddtaA'

const base = "https://api-m.sandbox.paypal.com";

// paypal.configure({
//     'mode': 'sandbox', // or 'live'
//     'client_id': 'Ac3Xm6ThJfD3NY9uzNYoUCL299HpGmMNIFTKPtyNbYL7ixQB7HDX1xZy2_zfYzi99cevrsgzVHGhNu0n',
//     'client_secret': 'EC25Jn72VRT7ssbkckMAVxIL95BhMBr4zIJJPx3z7FJjC_ZIVUGh7R2MyEvZhs15SIQKy7ZU7ouddtaA'
//   });

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}

async function capturePayment(transactionId) {
  const accessToken = await generateAccessToken();
  //const url = `${base}/v1/reporting/transactions?transaction_id=${transactionId}`;
  const url = `${base}/v1/reporting/transactions?start_date=2023-04-01T00:00:00-0700&end_date=2023-04-30T23:59:59-0700&transaction_id=${transactionId}&fields=all&page_size=100&page=1`;
  
  const response = await fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  // console.log(data);
  data.transaction_details.forEach((transaction) => {
    //console.log(transaction.transaction_info.transaction_amount.value);
    console.log(transaction)
    Paypal.create({
      transactionId: transaction.transaction_info.transaction_id,
      transactionEventCode : transaction.transaction_info.transaction_event_code,
      amount : transaction.transaction_info.transaction_amount.value,
      currencyCode: transaction.transaction_info.transaction_amount.currency_code,
      transactionInitiationDate : transaction.transaction_info.transaction_initiation_date,
      payerInfoAccountId : transaction.payer_info.account_id
    }).catch((err) => {
      if (err){
        console.log(err);
      }
    });

  });
  return data;
}


Router.get('/paypal/:Transactionid',(req,res) =>{
    const transactionId = req.params.Transactionid;

    
    //capturePayment(transactionId);
    

    // try {
    //   const data =  capturePayment(transactionId);
    //   // Once you've collected all the data, send it to the client.
    //   // res.json(data.transaction_details);
    //   res.send(data);
    //   ///console.log(data);
      
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send("Error capturing payment");
    // }
    // var data =  capturePayment(transactionId)
    capturePayment(transactionId)
    .then((data) => {
      //console.log(data)
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error capturing payment");
    });
    //res.send("Checked data");

    //console.log(data)
                     
});


module.exports  = Router;