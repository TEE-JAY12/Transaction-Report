const express = require("express");
const Router = express.Router();
const paypal = require('paypal-rest-sdk');
const fetch = require('node-fetch');



paypal.configure({
    'mode': 'sandbox', // or 'live'
    'client_id': 'Ac3Xm6ThJfD3NY9uzNYoUCL299HpGmMNIFTKPtyNbYL7ixQB7HDX1xZy2_zfYzi99cevrsgzVHGhNu0n',
    'client_secret': 'EC25Jn72VRT7ssbkckMAVxIL95BhMBr4zIJJPx3z7FJjC_ZIVUGh7R2MyEvZhs15SIQKy7ZU7ouddtaA'
  });


Router.get('/paypal/:Transactionid',(req,res) =>{
    const transactionId = req.params.Transactionid;
    console.log(transactionId);

    paypal.transaction.get(transactionId, (error, transaction) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log(transaction);
        res.send(transaction);
      }
    });
    
    


    

//     fetch('https://api-m.sandbox.paypal.com/v1/reporting/transactions?transaction_id=${transactionId}', {
//         headers: {
//             'X-PAYPAL-SECURITY-CONTEXT': '{"actor":{"client_id":"Ac3Xm6ThJfD3NY9uzNYoUCL299HpGmMNIFTKPtyNbYL7ixQB7HDX1xZy2_zfYzi99cevrsgzVHGhNu0n","auth_claims":["EC25Jn72VRT7ssbkckMAVxIL95BhMBr4zIJJPx3z7FJjC_ZIVUGh7R2MyEvZhs15SIQKy7ZU7ouddtaA"],"auth_state":"LOGGEDIN","user_type":"API_CALLER"},"auth_token_type":"ACCESS_TOKEN","scopes":["https://uri.paypal.com/services/reporting/search/read"],"client_id":"Ac3Xm6ThJfD3NY9uzNYoUCL299HpGmMNIFTKPtyNbYL7ixQB7HDX1xZy2_zfYzi99cevrsgzVHGhNu0n"}',
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         console.log("Temi");
// });                     

    


});

// pay = MRGTUMQ2YV2640515804922J

module.exports  = Router;