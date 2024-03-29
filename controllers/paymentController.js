// controllers/paymentController.js
const paypal = require('../config/paypalConfig');

exports.createPayment = (req, res) => {
  const createPaymentJson = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    },
    transactions: [{
      amount: {
        total: '10.00', // Replace with actual amount
        currency: 'USD' // Replace with actual currency
      },
      description: 'Example payment'
    }]
  };

  paypal.payment.create(createPaymentJson, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
          break;
        }
      }
    }
  });
};

exports.executePayment = (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  const executePaymentJson = {
    payer_id: payerId
  };

  paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.redirect('/success');
    }
  });
};
