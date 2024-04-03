// controllers/paymentController.js
const paypal = require('../config/paypalConfig');
const Order = require('../models/Order');
const orderController = require('./orderController');

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

// controllers/paymentController.js


exports.executePayment = (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  const executePaymentJson = {
    payer_id: payerId
  };

  paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      try {
        // Assuming req.body contains the order details
        const { user, products, totalAmount } = req.body;

        // Create the order
        const order = {
          user,
          products,
          totalAmount,
          status: 'pending' // or any initial status you prefer
        };

        // Call the createOrder function from the order controller
        await orderController.createOrder(order);

        res.redirect('/success');
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
      }
    }
  });
};
