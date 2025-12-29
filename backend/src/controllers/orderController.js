const Order = require('../models/Order');
const User = require('../models/User');
const EmailService = require('../services/emailService');

exports.createOrder = async (req, res) => {
  try {
    const { name, email, address, items } = req.body;
    let user = await User.getByEmail(email);
    if (!user) {
      user = await User.create({ name, email });
    }
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({ user_id: user.id, total, status: 'pending' });
    await Order.addItems(order.id, items);

    // Send order confirmation email
    try {
      await EmailService.sendOrderConfirmation(order, email, name, items);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    // Generate PayFast payment URL
    const paymentUrl = generatePayFastUrl(order, total);
    res.json({ order, paymentUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generatePayFastUrl(order, total) {
  // PayFast integration code
  const merchantId = process.env.PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
  const passphrase = process.env.PAYFAST_PASSPHRASE;
  // Construct URL
  return `https://www.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${total}&item_name=Order ${order.id}&return_url=https://backdoor-cleats.onrender.com/success&cancel_url=https://backdoor-cleats.onrender.com/cart`;
}