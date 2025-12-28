const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');
const EmailService = require('../services/emailService');

exports.handlePayment = async (req, res) => {
  try {
    const { pf_payment_id, payment_status, item_name, amount_gross, custom_str1 } = req.body;

    // Verify payment signature
    const passphrase = process.env.PAYFAST_PASSPHRASE;
    const data = Object.keys(req.body).sort().reduce((acc, key) => {
      if (key !== 'signature') acc += key + '=' + encodeURIComponent(req.body[key]) + '&';
      return acc;
    }, '');
    const signature = crypto.createHash('md5').update(data + 'passphrase=' + passphrase).digest('hex');

    if (signature === req.body.signature && payment_status === 'COMPLETE') {
      // Extract order ID from item_name (format: "Order {id}")
      const orderId = item_name.split(' ')[1];

      // Update order status to paid
      await Order.updateStatus(orderId, 'paid');

      // Get order details for email
      const order = await Order.getById(orderId);
      const user = await User.getById(order.user_id);

      // Send payment confirmation email
      try {
        await EmailService.sendPaymentConfirmation(order, user.email, user.name);
      } catch (emailError) {
        console.error('Failed to send payment confirmation email:', emailError);
      }

      console.log(`Payment confirmed for order ${orderId}`);
      res.status(200).send('Payment successful');
    } else {
      console.log('Payment verification failed');
      res.status(400).send('Payment failed');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).send('Internal server error');
  }
};