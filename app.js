'use strict';

var express = require('express');
var app = express();

var braintree = require('braintree');

var bodyParser = require('body-parser');

var payment = "";

var parseUrlEnconded = bodyParser.urlencoded({
  extended: false
});

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '327kdxtj7zf9ggw7',
  publicKey: 'xbq8j9zww2zc9mkj',
  privateKey: '960e240307b10a1b34bf6b07c14cea34'
});

app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});

app.post("/checkout", function (req, res) {
    var nonceFromTheClient = req.body.payment_method_nonce;
    // Use payment method nonce here
    console.log(nonceFromTheClient.transaction.amount)
    payment = nonceFromTheClient.transaction.payment_method
});

gateway.transaction.sale({
    amount: "10.00",
    paymentMethodNonce: payment,
    options: {
        submitForSettlement: true
    }
}, function (err, result) {
});






// app.use(express.static('public'));
//
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function (request, response) {
//
//   gateway.clientToken.generate({}, function (err, res) {
//     response.render('index', {
//       clientToken: res.clientToken
//     });
//   });
//
// });
//
// app.post('/process', parseUrlEnconded, function (request, response) {
//
//   var transaction = request.body;
//
//   gateway.transaction.sale({
//     amount: transaction.amount,
//     paymentMethodNonce: transaction.payment_method_nonce
//   }, function (err, result) {
//
//     if (err) throw err;
//
//     if (result.success) {
//
//       console.log(result);
//
//       response.sendFile('success.html', {
//         root: './public'
//       });
//     } else {
//       response.sendFile('error.html', {
//         root: './public'
//       });
//     }
//   });
//
// });
//
// app.listen(3000, function () {
//   console.log('Listening on port 3000');
// });

module.exports = app;
